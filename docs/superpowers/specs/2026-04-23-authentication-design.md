# Authentication — Design

**Date:** 2026-04-23
**Scope:** Add authentication so the app cannot be used without signing in. Single role (authenticated). No sign-up, no password reset, no roles/permissions.

## Goals & non-goals

**Goals**
- Require a valid sign-in to use any part of the app.
- Use the standard ASP.NET Core auth pattern (cookie authentication).
- Drive the frontend's sign-in gate from real session state, not a hardcoded user.
- Seed an initial user from configuration so the app is usable on a fresh database.
- Defend mutating API requests against CSRF.

**Non-goals**
- Roles, permissions, multi-tenancy.
- Self-service sign-up, email verification, password reset flows.
- External identity providers (Google, Microsoft, etc.).
- Rate limiting / account lockout (can be added later if abuse appears).

## Architecture overview

Cookie authentication with the SPA logging in via an API endpoint. The .NET app serves the SPA shell (`Pages/Default.cshtml` → `Pages/Layout/AppLayout.cshtml`); on each page render, the layout reads the authenticated principal and serializes a small user object into `window.initData.user`. The CxJS store seeds from that object, and the existing route guard at `client/app/routes/index.tsx:12` (`<SignIn visible={expr('!{user}')} />`) shows the sign-in screen whenever it is falsy.

```
Browser → GET /                → AppLayout.cshtml
                                   ├─ cookie valid: initData.user = { email, firstName, lastName, initials, pictureUrl }
                                   └─ no/invalid cookie: initData.user = false
        → SPA bundle loads     → app/index.tsx seeds store.user from window.initData.user
        → routes/index.tsx     → falsy user → SignIn page; truthy user → app
SignIn  → POST /api/auth/login → SignInAsync → cookie set → window.location.reload()
Logout  → POST /api/auth/logout → SignOutAsync → cookie cleared → reload
```

## Backend

### Auth scheme

- `AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(...)` in `Program.cs`.
- Cookie options:
  - `HttpOnly = true`, `SameSite = Lax`, `Secure = true` (HTTPS only).
  - `ExpireTimeSpan = 30 days`, `SlidingExpiration = true`.
  - `IsPersistent` is set per-login from the "Remember me" checkbox (`AuthenticationProperties.IsPersistent`). Unchecked yields a session cookie that dies on browser close.
- Cookie events override the default redirect-to-login behavior so API callers get a status code, not an HTML page:
  - `OnRedirectToLogin`: if the request path starts with `/api/`, set `StatusCode = 401` and return; otherwise fall back to default behavior.
  - `OnRedirectToAccessDenied`: same pattern with `403`.

### Authorization

- `AddAuthorization(o => o.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build())` makes every endpoint require auth by default.
- `[AllowAnonymous]` is applied to:
  - `POST /api/auth/login`
  - The Razor `Default` page (so unauthenticated users can load the SPA shell and see the sign-in screen rather than a 401 on `/`).
- `Program.cs` pipeline order is updated to include `app.UseAuthentication()` before `app.UseAuthorization()`. (Today only `UseAuthorization` is registered, which is why authorization currently does nothing.)

### CSRF / antiforgery

- `AddAntiforgery(o => o.HeaderName = "RequestVerificationToken")` and `app.UseAntiforgery()` in the pipeline.
- Apply `[ValidateAntiForgeryToken]` to mutating API actions (POST/PUT/DELETE/PATCH on Customers, CustomerActions, Services, and `POST /api/auth/logout`). `POST /api/auth/login` is exempt — the user has no session yet to forge against.
- `AppLayout.cshtml:38` already renders `@Html.AntiForgeryToken()`. The SPA reads the token from the DOM and attaches it to mutating requests as the `RequestVerificationToken` header.

### `User` entity

`server/HairDesign.App/Entities/User.cs`:

```csharp
public class User {
    public Guid Id { get; set; }
    public required string Email { get; set; }       // unique, login identifier, stored lower-cased
    public required string PasswordHash { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? PictureUrl { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

`Initials` is derived (`FirstName[0] + LastName[0]`) when building the response object — not stored.

### Database

- `ApplicationDbContext` gains `DbSet<User> Users`.
- New `Configuration/UserConfiguration.cs` configures a unique index on `Email`.
- New EF Core migration `AddUsersTable`.
- Email is normalized via `email.Trim().ToLowerInvariant()` on insert and on lookup. No DB-level case-insensitive collation needed.

### Password hashing

- Use `Microsoft.AspNetCore.Identity.PasswordHasher<User>` from the `Microsoft.AspNetCore.Identity` NuGet package, registered as a singleton.
- We use only the hasher utility — not the full Identity stack, no `AspNetUsers`/`AspNetRoles` tables.
- On verification, if the hasher returns `PasswordVerificationResult.SuccessRehashNeeded`, re-hash and persist. Cheap upgrade path when the hasher's parameters change.

### `FirstUser` configuration & seeding

`appsettings.json` (shape; real password lives in `appsettings.Development.json` or `dotnet user-secrets`):

```json
"FirstUser": {
  "Email": "owner@example.com",
  "Password": "change-me",
  "FirstName": "Owner",
  "LastName": "Name",
  "PictureUrl": null
}
```

Bound via `services.Configure<FirstUserOptions>(builder.Configuration.GetSection("FirstUser"))`.

Seeding (a new `Utilities/UserSeeder.cs`, called from `Program.cs` immediately after `MigrationsUtil.MigrateDatabase`):

1. Open a scope, resolve `ApplicationDbContext`, `IOptions<FirstUserOptions>`, `IPasswordHasher<User>`.
2. If `db.Users.Any()`, return — idempotent.
3. Build a `User` with `CreatedAt = DateTime.UtcNow`, hash the configured password, insert, save.
4. Log a warning if `FirstUser` config is missing or has empty fields.

### Login / logout

New folder `Features/Auth/`:

```
Features/Auth/
├── Commands/
│   └── LoginCommand.cs        # validates credentials, returns User or null
├── Models/
│   ├── LoginRequest.cs        # { Email, Password, RememberMe }
│   └── UserResponse.cs        # { Email, FirstName, LastName, Initials, PictureUrl }
```

`LoginCommand.Execute(email, password)`:
1. Normalize `email` (`Trim().ToLowerInvariant()`).
2. Look up user by email. If not found, return `null`.
3. Verify password via `PasswordHasher`. If failure, return `null`. (Same `null` for "no user" and "wrong password" — no enumeration.)
4. If `SuccessRehashNeeded`, re-hash and save.
5. Return the `User`.

New `Controllers/AuthController.cs`:

```csharp
[Route("api/[controller]")]
public class AuthController : ControllerBase {

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(
        [FromBody] LoginRequest req,
        [FromServices] LoginCommand cmd) {

        var user = await cmd.Execute(req.Email, req.Password);
        if (user == null) return Unauthorized();

        var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Surname, user.LastName),
        };
        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity),
            new AuthenticationProperties { IsPersistent = req.RememberMe });

        return NoContent();   // 204 — frontend reloads to pick up initData.user
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout() {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return NoContent();
    }
}
```

### `UserDataService.GetUserDataAsync`

Replace the `NotImplementedException` stub at `Features/Services/UserDataService.cs:9` with a pure claims-based implementation — no DB hit per page render:

```csharp
public class UserDataService {
    public static Task<object?> GetUserDataAsync(ClaimsPrincipal user) {
        if (user.Identity?.IsAuthenticated != true) return Task.FromResult<object?>(null);

        var firstName = user.FindFirstValue(ClaimTypes.GivenName) ?? "";
        var lastName  = user.FindFirstValue(ClaimTypes.Surname)   ?? "";
        var email     = user.FindFirstValue(ClaimTypes.Email)     ?? "";

        return Task.FromResult<object?>(new {
            email,
            firstName,
            lastName,
            initials = $"{(firstName.Length > 0 ? firstName[0] : ' ')}{(lastName.Length > 0 ? lastName[0] : ' ')}".Trim(),
            pictureUrl = (string?)null,
        });
    }
}
```

`pictureUrl` stays `null` for now — it is not in claims. If we later need it everywhere, either add a claim at sign-in or switch this to a DB lookup keyed on `NameIdentifier`.

`AppLayout.cshtml:18-22` already calls this when `User.Identity.IsAuthenticated`. With an unauthenticated principal it leaves `userDataStr = "false"`, which is the signal the SPA uses to show the sign-in screen.

## Frontend

### Store seeding (`client/app/index.tsx`)

Replace the hardcoded user with a read of `window.initData.user`:

```ts
declare global {
   interface Window {
      store: Store;
      initData: {
         user: {
            email: string;
            firstName: string;
            lastName: string;
            initials: string;
            pictureUrl: string | null;
         } | false;
      };
   }
}

const store = new Store({
   data: {
      user: window.initData?.user || null,   // false from cshtml → null in store
   },
});
```

`routes/index.tsx:12` already shows the sign-in page when `!{user}` and the user widget already reads from `user.*` — no changes needed there.

### Sign-in form (`client/app/routes/pages/sign-in/`)

- Relabel the first `TextField` from "Username" to "Email", bind to `email`.
- `Controller.ts` `onSubmit` (replaces the demo block at `Controller.ts:6-32` that fakes a login):

```ts
async onSubmit(e, { store }) {
   e.preventDefault();
   const { invalid, email, password, rememberMe } = store.getData();
   if (invalid) { store.set('visited', true); return; }

   const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe: !!rememberMe }),
   });
   if (res.status === 401) { showErrorToast('Invalid email or password'); return; }
   if (!res.ok) { showErrorToast('Login failed'); return; }
   window.location.reload();   // re-renders AppLayout.cshtml with initData.user populated
}
```

The "Remember me" checkbox is already in the form and gets forwarded as-is. Note the existing Controller already destructures `email` even though the form binds to `username` — the field rename above closes that gap.

### Logout

In the existing `/signout` route under `app/routes/user/`:

```ts
await fetch('/api/auth/logout', {
   method: 'POST',
   credentials: 'include',
   headers: { 'RequestVerificationToken': getAntiforgeryToken() },
});
window.location.href = '/';
```

### `client/app/api/util/methods.ts` updates

All requests funnel through `doFetch` → `resolveFetchOptions`, so changes go in one place.

- `resolveFetchOptions` adds `credentials: 'include'` to the returned `RequestInit`. Cookie auth requires it.
- A small helper `getAntiforgeryToken()` reads `<input name="__RequestVerificationToken">` from the DOM (cached after first read). For non-`GET` methods, `resolveFetchOptions` attaches it as the `RequestVerificationToken` header.
- 401 handling: in `doFetch`, before calling `checkOk`, if `response.status === 401`, clear `window.store.user` and call `window.location.reload()`, then return (no further processing). Gracefully kicks expired-cookie users back to sign-in. Replaces the now-irrelevant commented-out bearer-token block at lines 62–63.

## Error handling

| Situation                                | Backend response                | Frontend behavior                          |
|------------------------------------------|---------------------------------|--------------------------------------------|
| Wrong email or password                  | `401 Unauthorized`              | Toast "Invalid email or password"; stay on sign-in. |
| Login request malformed                  | `400 Bad Request`               | Toast "Login failed".                      |
| Cookie missing/expired on API call       | `401 Unauthorized` (no redirect)| Clear `store.user`, reload page.           |
| Antiforgery token missing/invalid        | `400 Bad Request`               | Toast generic error; reload to re-fetch token. |
| Seeding fails (`FirstUser` misconfigured)| App still starts, warning logged | N/A                                       |

## Testing strategy

Manual verification once implemented (the implementation plan will pin these as concrete steps):

- Fresh DB: app starts, seeder inserts the `FirstUser`, login with those credentials succeeds.
- Re-running `dotnet run` does not duplicate the seeded user.
- Wrong password yields a 401 and a toast; URL stays on sign-in.
- Successful login: cookie set, page reloads, app loads, the user widget shows the configured first/last name, initials, email.
- `POST /api/customers` (or any mutating call) without the antiforgery header returns 400.
- Same call with the header succeeds.
- Direct `GET /api/customers` without a session cookie returns 401 (not an HTML redirect).
- `POST /api/auth/logout` clears the cookie; subsequent reload shows the sign-in screen.
- "Remember me" checked: closing and reopening the browser keeps the session. Unchecked: closing the browser logs out.

## Files touched

**Backend (new)**
- `Entities/User.cs`
- `Configuration/UserConfiguration.cs`
- `Configuration/FirstUserOptions.cs`
- `Features/Auth/Commands/LoginCommand.cs`
- `Features/Auth/Models/LoginRequest.cs`
- `Features/Auth/Models/UserResponse.cs`
- `Controllers/AuthController.cs`
- `Utilities/UserSeeder.cs`
- `Infrastructure/Migrations/<timestamp>_AddUsersTable.cs` (generated)

**Backend (modified)**
- `Program.cs` — register cookie auth, antiforgery, `LoginCommand`, `IPasswordHasher<User>`, `FirstUserOptions`, `UserSeeder`; add `UseAuthentication`/`UseAntiforgery`; add fallback authorization policy.
- `Configuration/ServiceCollectionExtensions.cs` — pick up new registrations if grouped here.
- `Infrastructure/ApplicationDbContext.cs` — add `DbSet<User>`.
- `Features/Services/UserDataService.cs` — implement claims-based version.
- `Pages/Default.cshtml` / `.cs` — `[AllowAnonymous]`.
- `Controllers/CustomersController.cs`, `CustomerActionsController.cs`, `ServicesController.cs` — `[ValidateAntiForgeryToken]` on mutating actions.
- `appsettings.json` — `FirstUser` section (placeholder values).

**Frontend (modified)**
- `client/app/index.tsx` — seed `user` from `window.initData.user`.
- `client/app/routes/pages/sign-in/index.tsx` — relabel field, bind to `email`.
- `client/app/routes/pages/sign-in/Controller.ts` — real login flow (replaces the demo block).
- `client/app/routes/user/index.tsx` (or wherever the existing `/signout` handler lives) — wire logout to `POST /api/auth/logout`.
- `client/app/api/util/methods.ts` — `credentials: 'include'`, antiforgery header on mutating verbs, 401 handler.

**No changes**
- `client/app/routes/index.tsx` — existing `!{user}` guard already does the right thing.
- `client/app/util/checkSignedIn.ts` — already reads `user` from store, still valid.

using HairDesign.App.Configuration;
using HairDesign.App.Entities;
using HairDesign.App.Features.Auth.Commands;
using HairDesign.App.Features.CustomerActions.Commands;
using HairDesign.App.Features.CustomerActions.Queries;
using HairDesign.App.Features.Customers.Commands;
using HairDesign.App.Features.Customers.Queries;
using HairDesign.App.Features.services.commands;
using HairDesign.App.Features.services.queries;
using HairDesign.App.Features.Users.Commands;
using HairDesign.App.Features.Users.Queries;
using HairDesign.App.Utilities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration);

builder.Services.Configure<FirstUserOptions>(builder.Configuration.GetSection(FirstUserOptions.SectionName));
builder.Services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromDays(30);
        options.SlidingExpiration = true;
        options.Events.OnRedirectToLogin = ctx =>
        {
            if (ctx.Request.Path.StartsWithSegments("/api"))
            {
                ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            }
            ctx.Response.Redirect(ctx.RedirectUri);
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = ctx =>
        {
            if (ctx.Request.Path.StartsWithSegments("/api"))
            {
                ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
                return Task.CompletedTask;
            }
            ctx.Response.Redirect(ctx.RedirectUri);
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "RequestVerificationToken";
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
});
builder.Services.AddOpenApi();

builder.Services.AddRazorPages();
builder.Services.AddScoped<GetAllCustomersQuery>();
builder.Services.AddScoped<GetCustomerByIdQuery>();
builder.Services.AddScoped<CreateCustomerCommand>();
builder.Services.AddScoped<UpdateCustomerCommand>();
builder.Services.AddScoped<DeleteCustomerCommand>();

builder.Services.AddScoped<GetAllCustomerActionsQuery>();
builder.Services.AddScoped<GetCustomerActionByIdQuery>();
builder.Services.AddScoped<CreateCustomerActionCommand>();
builder.Services.AddScoped<UpdateCustomerActionCommand>();
builder.Services.AddScoped<DeleteCustomerActionCommand>();

builder.Services.AddScoped<GetAllServicesQuery>();
builder.Services.AddScoped<GetServiceByIdQuery>();
builder.Services.AddScoped<CreateServiceCommand>();
builder.Services.AddScoped<UpdateServiceCommand>();
builder.Services.AddScoped<DeleteServiceCommand>();

builder.Services.AddScoped<LoginCommand>();

builder.Services.AddScoped<GetAllUsersQuery>();
builder.Services.AddScoped<GetUserByIdQuery>();
builder.Services.AddScoped<CreateUserCommand>();
builder.Services.AddScoped<UpdateUserCommand>();
builder.Services.AddScoped<DeleteUserCommand>();
builder.Services.AddScoped<ResetPasswordCommand>();

var app = builder.Build();

MigrationsUtil.MigrateDatabase(app.Services);
UserSeeder.SeedFirstUser(app.Services);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.MapRazorPages();
app.MapControllers();

app.Run();

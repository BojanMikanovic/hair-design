using System.Security.Claims;
using HairDesign.App.Features.Auth.Models;

namespace HairDesign.App.Features.Services;

public class UserDataService
{
    public static Task<UserResponse?> GetUserDataAsync(ClaimsPrincipal user)
    {
        if (user.Identity?.IsAuthenticated != true) return Task.FromResult<UserResponse?>(null);

        var firstName = user.FindFirstValue(ClaimTypes.GivenName) ?? "";
        var lastName = user.FindFirstValue(ClaimTypes.Surname) ?? "";
        var email = user.FindFirstValue(ClaimTypes.Email) ?? "";

        var initials = $"{(firstName.Length > 0 ? firstName[0].ToString() : "")}{(lastName.Length > 0 ? lastName[0].ToString() : "")}";

        return Task.FromResult<UserResponse?>(new UserResponse
        {
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            Initials = initials,
            PictureUrl = null,
        });
    }
}

using Microsoft.AspNetCore.Identity;

namespace Codebusters.Service.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<IdentityUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }
    
    public async Task<AuthResult> RegisterAsync(string email, string username, string password, string phoneNumber, string role)
    {
        var user = new IdentityUser { UserName = username, Email = email, PhoneNumber = phoneNumber };
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            return FailedRegistration(user.Id, result, email, username);
        }

        await _userManager.AddToRoleAsync(user, role);
        return new AuthResult(user.Id, true, email, username, "");
    }

    private static AuthResult FailedRegistration(string id, IdentityResult result, string email, string username)
    {
        var authenticationResult = new AuthResult(id, false, email, username, "");

        foreach (var identityError in result.Errors)
        {
            authenticationResult.ErrorMessages.Add(identityError.Code, identityError.Description);
        }

        return authenticationResult;
    }

    public Task<AuthResult> LoginAsync(string username, string password)
    {
        throw new NotImplementedException();
    }
}

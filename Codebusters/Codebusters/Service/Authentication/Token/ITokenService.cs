using Microsoft.AspNetCore.Identity;

namespace Codebusters.Service.Authentication.Token;

public interface ITokenService
{
    string CreateToken(IdentityUser user, string? role);
}

using Microsoft.AspNetCore.Identity;

namespace Codebusters.Service.Authentication;

public interface ITokenService
{
    string CreateToken(IdentityUser user, string? role);
}

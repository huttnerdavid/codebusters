using System.Net.Mail;
using Codebusters.Model;

namespace Codebusters.Service.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string password, string phoneNumber, string role);
    
    Task<AuthResult> LoginAsync(string username, string password);
}
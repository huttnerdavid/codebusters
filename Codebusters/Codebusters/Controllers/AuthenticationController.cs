using Codebusters.Contracts;
using Codebusters.Data;
using Codebusters.Model;
using Codebusters.Service.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Codebusters.Controllers;

[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthService _authenticationService;
    private readonly UserDataContext? _dataContext;

    public AuthenticationController(IAuthService authenticationService, UserDataContext dataContext)
    {
        _authenticationService = authenticationService;
        _dataContext = dataContext;
    }
    
    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var result = await _authenticationService.RegisterAsync(request.Email, request.Username, request.Password, request.PhoneNumber, "User");

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            var newUser = new User(request.FirstName, request.LastName, request.Gender, request.Address, request.UserType, request.RegistrationType, result.Id);
            _dataContext.Users!.Add(newUser);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new RegistrationResponse(result.Email, result.UserName));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    private void AddErrors(AuthResult result)
    {
        foreach (var resultErrorMessage in result.ErrorMessages)
        {
            ModelState.AddModelError(resultErrorMessage.Key, resultErrorMessage.Value);
        }
    }
}
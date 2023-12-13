using Codebusters.Contracts;
using Codebusters.Data;
using Codebusters.Model;
using Codebusters.Service.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codebusters.Controllers;

[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthService _authenticationService;
    private readonly UsersContext? _usersContext;
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(IAuthService authenticationService, UsersContext usersContext, ILogger<AuthenticationController> logger)
    {
        _authenticationService = authenticationService;
        _usersContext = usersContext;
        _logger = logger;
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
            
            var ceo = await _usersContext.UsersDb.FirstOrDefaultAsync(c =>
                c.CompanyNameByDatabase == request.CompanyNameByDatabase && c.UserType.ToLower() == "ceo");
            
            if (request.UserType.ToLower() == "ceo" && ceo != null && request.UserType.ToLower() != "not added yet")
                return BadRequest(ceo);

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            var newUser = new User(request.FirstName,
                                    request.LastName,
                                      request.Gender,
                                     request.ZipCode,
                                        request.City,
                                      request.Street,
                                  request.DoorNumber,
                                    request.UserType,
                       request.CompanyNameByDatabase,
                            request.RegistrationType,
                                           result.Id);
            
            _usersContext!.UsersDb!.Add(newUser);
            await _usersContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new RegistrationResponse(result.Email, result.UserName));
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _authenticationService.LoginAsync(request.Email, request.Password);
        
        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        }
        
        var roleId = _usersContext!.UserRoles.First(r => r.UserId == result.Id).RoleId;
        var role = _usersContext.Roles.First(r => r.Id == roleId).Name;
        
        Response.Cookies.Append("Authentication", result.Token);
        return Ok(new AuthResponse(result.Email, result.UserName, result.Token, role!));
    }
    
    private void AddErrors(AuthResult result)
    {
        foreach (var resultErrorMessage in result.ErrorMessages)
        {
            ModelState.AddModelError(resultErrorMessage.Key, resultErrorMessage.Value);
        }
    }
}

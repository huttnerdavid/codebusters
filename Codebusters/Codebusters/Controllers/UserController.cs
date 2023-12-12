using Codebusters.Data;
using Codebusters.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Codebusters.Controllers;

[ApiController]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly UsersContext _userContext;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _config;

    public UserController(UsersContext userContext,  UserManager<IdentityUser> userManager, IConfiguration config, ILogger<UserController> logger)
    {
        _userContext = userContext;
        _userManager = userManager;
        _config = config;
        _logger = logger;
    }

    [HttpGet("/getUsers"), Authorize(Roles = "Admin")]
    public ActionResult<IEnumerable<Tuple<User, IdentityUser>>> GetAll()
    {
        try
        {
            var returningList = new List<Tuple<User, IdentityUser>>();

            var users = _userContext.UsersDb;
            if (users == null || !users.Any())
            {
                _logger.LogInformation("There is no user in the database.");
                return Ok(users);
            }

            var identityUsers = _userContext.Users.ToList();

            foreach (var user in users)
            {
                var identityUser = identityUsers.FirstOrDefault(identityUser => user.IdentityUserId == identityUser.Id);
                if (identityUser != null)
                {
                    var tuple = new Tuple<User, IdentityUser>(user, identityUser);
                    returningList.Add(tuple);
                }
            }
            
            return Ok(returningList);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return NotFound();
        }
    }
    
    [HttpDelete("deleteAccount")]
    [Authorize(Roles = "User, Leader")]
    public async Task<ActionResult<string>> DeleteAccount(string email)
    {
        if (_config["AEmail"].ToLower() == email.ToLower())
        {
            return Unauthorized();
        }
        
        try
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return BadRequest("Something went wrong");
            }
            
            var result = await _userManager.DeleteAsync(user);

            return result.Succeeded ? Ok(user.Id) : BadRequest(result.Errors);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return BadRequest(e.Message);
        }
    }
}

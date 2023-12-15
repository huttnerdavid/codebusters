using Codebusters.Data;
using Codebusters.Model;
using Codebusters.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Codebusters.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AdminController : ControllerBase
{
    private readonly UsersContext? _usersContext;
    private readonly ILogger<AuthenticationController> _logger;
    private readonly UserManager<IdentityUser> _userManager;

    public AdminController(UsersContext usersContext, UserManager<IdentityUser> userManager, ILogger<AuthenticationController> logger)
    {
        _userManager = userManager;
        _usersContext = usersContext;
        _logger = logger;
    }

    [HttpGet, Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<User>>> GetPendingCeo()
    {
        try
        {
            var returningList = new List<Tuple<User, IdentityUser>>();

            var users = _usersContext?.UsersDb!.Where(u => u.UserType == UserType.CEO.ToString()).ToList();
            if (users == null || !users.Any())
            {
                _logger.LogInformation("There is no user in the database.");
                return Ok(users);
            }

            var identityUsers = _usersContext!.Users.ToList();

            foreach (var user in users)
            {
                var identityUser = identityUsers.FirstOrDefault(identityUser => user.IdentityUserId == identityUser.Id);
                if (identityUser == null)
                    continue;
                
                var roles = await _userManager.GetRolesAsync(identityUser);
                if (!roles.Contains("User") || roles.Contains("Leader"))
                    continue;

                var tuple = new Tuple<User, IdentityUser>(user, identityUser);
                returningList.Add(tuple);
            }
            
            return Ok(returningList);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return BadRequest(e.Message);
        }
    }

    [HttpPatch, Authorize(Roles = "Admin")]
    public async Task<ActionResult<User>> ApproveLeadership(string email)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(nameof(ModelState));
            }
            
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            await _userManager.RemoveFromRoleAsync(user, "User");
            var result = await _userManager.AddToRoleAsync(user, "Leader");
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return BadRequest(e.Message);
        }
    }

    [HttpDelete, Authorize(Roles = "Admin")]
    public async Task<ActionResult<string>> DeleteUser(string email)
    {
        _logger.LogInformation("/deleteUser/{email}", email);
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            var dbUser = _usersContext?.UsersDb!.FirstOrDefault(e => e.IdentityUserId == identityUser!.Id);
            _usersContext?.UsersDb!.Remove(dbUser!);

            if (identityUser == null)
            {
                return NotFound("User not found");
            }
            
            var result = await _userManager.DeleteAsync(identityUser);
            await _usersContext!.SaveChangesAsync();
            
            return result.Succeeded ? Ok(identityUser.Id) : BadRequest(result.Errors);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return BadRequest(e.Message);
        }
    }
}

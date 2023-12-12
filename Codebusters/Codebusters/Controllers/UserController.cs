using Codebusters.Data;
using Codebusters.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Codebusters.Controllers;

public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly UsersContext _userContext;

    public UserController(UsersContext userContext, ILogger<UserController> logger)
    {
        _userContext = userContext;
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
}

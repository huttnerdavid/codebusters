using System.Collections;
using Codebusters.Data;
using Codebusters.Model;
using Codebusters.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Codebusters.Controllers;

public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly UserDataContext _userRepository;
    private readonly UsersContext _userContext;

    public UserController(UserDataContext userRepository, ILogger<UserController> logger, UsersContext userContext)
    {
        _userRepository = userRepository;
        _logger = logger;
        _userContext = userContext;
    }

    [HttpGet("/getUsers")]
    public async Task<ActionResult<IEnumerable<Tuple<User, IdentityUser>>>> GetAll()
    {
        try
        {
            var returningList = new List<Tuple<User, IdentityUser>>();

            var users = _userRepository.Users;
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

            Console.WriteLine(returningList);
            return Ok(returningList);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound();
        }
    }
}
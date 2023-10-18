using Codebusters.Model;
using Codebusters.Service;
using Microsoft.AspNetCore.Mvc;

namespace Codebusters.Controllers;

public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository, ILogger<UserController> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    [HttpGet("/getUsers")]
    public ActionResult<User> Get()
    {
        try
        {
            User user = _userRepository.Get();
            return Ok(user);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound();
        }
        
    }
}
using Codebusters.Contracts.Registers;
using Codebusters.Data;
using Codebusters.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codebusters.Controllers;

[ApiController]
public class CompanyController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly UsersContext _usersContext;

    public CompanyController(UsersContext usersContext, ILogger<UserController> logger)
    {
        _usersContext = usersContext;
        _logger = logger;
    }

    [HttpGet("/getCompanies")]
    public ActionResult<IEnumerable<Company>> GetAll()
    {
        try
        {
            var companies = _usersContext.Companies;
            
            if (companies == null || !companies.Any())
            {
                _logger.LogInformation("There is no company in the database.");
                return Ok(companies);
            }
            
            return Ok(companies);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return NotFound();
        }
    }
    
    [HttpGet("/getOwnCompanies/{email}"), Authorize(Roles = "Leader")]
    public ActionResult<IEnumerable<Company>> GetOwn(string email)
    {
        try
        {
            var identityUserId = _usersContext.Users.First(u => u.Email == email).Id;
            var companyName = _usersContext.UsersDb!.First(u => u.IdentityUserId == identityUserId).CompanyNameByDatabase;
            var companies = _usersContext.Companies!.Where(cn => cn.CompanyName == companyName).ToList();

            if (!companies.Any())
            {
                _logger.LogInformation("There is no company in the database.");
            }
            
            return Ok(companies);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return NotFound();
        }
    }
    
    [HttpPost("/companyRegister"), Authorize(Roles = "Admin, Leader")]
    public async Task<ActionResult<CompanyRegistrationResponse>> Register(CompanyRegistrationRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCompany = new Company(request.CompanyName, request.ZipCode, request.City, request.Street, request.DoorNumber, request.PickedCompanyType, _usersContext);
            
            _usersContext.Companies!.Add(newCompany);
            await _usersContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new CompanyRegistrationResponse(request.CompanyName));
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }
    
    [HttpGet("/getConstructs"), Authorize(Roles = "Admin")]
    public ActionResult<IEnumerable<Company>> GetAllConstructs()
    {
        try
        {
            var constructs = _usersContext.Constructs;
            
            if (constructs != null && !constructs.Any())
            {
                _logger.LogInformation("There is no construct(s) in the database.");
                return Ok(constructs);
            }
            
            return Ok(constructs);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return NotFound();
        }
    }
    
    [HttpGet("/getOwnConstructs/{email}"), Authorize(Roles = "Admin, Leader")]
    public async Task<ActionResult<IEnumerable<Company>>> GetOwnConstructs(string email)
    {
        try
        {
            var reqUser = await _usersContext.Users.FirstAsync(u => u.Email == email);
            var dbUser = await _usersContext.UsersDb!.FirstAsync(u => u.IdentityUserId == reqUser.Id);
            var constructs = _usersContext.Constructs!.Where(cn => cn.CompanyName == dbUser.CompanyNameByDatabase);
            
            if (!constructs.Any())
            {
                _logger.LogInformation("There is no construct(s) in the database.");
                return Ok(constructs);
            }
            
            return Ok(constructs);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return NotFound();
        }
    }
    
    [HttpPost("/constructRegister"), Authorize(Roles = "Admin, Leader")]
    public async Task<ActionResult<ConstructRegistrationResponse>> RegisterConstruct(ConstructRegistrationRequest request)
    {
        Console.WriteLine(request);
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newConstruct = new Construct(request.ConstructName, request.CompanyName, request.Status, request.WorkerCount);
            _usersContext.Constructs!.Add(newConstruct);
            await _usersContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new ConstructRegistrationResponse(request.ConstructName));
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }
}

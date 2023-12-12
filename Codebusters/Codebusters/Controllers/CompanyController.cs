using Codebusters.Contracts;
using Codebusters.Data;
using Codebusters.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    
    [HttpGet("/getOwnCompanies"), Authorize(Roles = "Leader")]
    public ActionResult<IEnumerable<Company>> GetOwn(string companyName)
    {
        try
        {
            var companies = _usersContext?.Companies!.Where(cn => cn.CompanyName == companyName);
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
    
    [HttpPost("CompanyRegister"), Authorize(Roles = "Admin, Leader")]
    public async Task<ActionResult<CompanyRegistrationResponse>> Register(CompanyRegistrationRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCompany = new Company(request.CompanyName, request.ZipCode, request.City, request.Street, request.DoorNumber, request.PickedCompanyType, _usersContext);
            
            _usersContext!.Companies!.Add(newCompany);
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
    
    [HttpGet("/getOwnConstructs"), Authorize(Roles = "Admin, Leader")]
    public ActionResult<IEnumerable<Company>> GetOwnConstructs(string companyName)
    {
        try
        {
            var constructs = _usersContext?.Constructs!.Where(cn => cn.CompanyName == companyName);
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

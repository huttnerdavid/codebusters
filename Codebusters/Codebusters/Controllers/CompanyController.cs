using Codebusters.Contracts;
using Codebusters.Data;
using Codebusters.Model;
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
    
    [HttpPost("CompanyRegister")]
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
}
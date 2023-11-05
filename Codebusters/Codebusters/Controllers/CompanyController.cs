using Codebusters.Contracts;
using Codebusters.Data;
using Codebusters.Model;
using Microsoft.AspNetCore.Mvc;

namespace Codebusters.Controllers;

[ApiController]
public class CompanyController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly CompanyDataContext _companyRepository;
    private readonly UserDataContext _userDataContext;

    public CompanyController(CompanyDataContext companyRepository, ILogger<UserController> logger, UserDataContext userDataContext)
    {
        _companyRepository = companyRepository;
        _logger = logger;
        _userDataContext = userDataContext;
    }

    [HttpGet("/getCompanies")]
    public ActionResult<IEnumerable<Company>> GetAll()
    {
        try
        {
            var companies = _companyRepository.Companies;
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

            var newCompany = new Company(request.CompanyName, request.ZipCode, request.City, request.Street, request.DoorNumber, request.PickedCompanyType, _userDataContext);
            _companyRepository!.Companies!.Add(newCompany);
            await _companyRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new CompanyRegistrationResponse(request.CompanyName));
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }
}
using Codebusters.Model;
using Microsoft.AspNetCore.Identity;

namespace Codebusters.Service.Authentication.AuthExtension;

public class CompanyManager
{
    private readonly UserManager<Company> _companyUserManager;
    
    public CompanyManager(UserManager<Company> companyUserManager)
    {
        _companyUserManager = companyUserManager;
    }

    // Implement methods for managing companies, e.g., CreateAsync, UpdateAsync, etc.
    public async Task<IdentityResult> CreateAsync(Company company)
    {
        return await _companyUserManager.CreateAsync(company);
    }
}
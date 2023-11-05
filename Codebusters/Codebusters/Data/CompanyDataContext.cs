using Codebusters.Model;
using Microsoft.EntityFrameworkCore;

namespace Codebusters.Data;

public class CompanyDataContext : DbContext
{
    public DbSet<Company>? Companies { get; set; }
    
    public CompanyDataContext(DbContextOptions<CompanyDataContext> options) : base(options)
    {
    }

    public CompanyDataContext()
    {
        
    }
}
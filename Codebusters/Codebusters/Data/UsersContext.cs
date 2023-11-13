using Codebusters.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Codebusters.Data;

public class UsersContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<User>? UsersDb { get; set; }
    public DbSet<Company>? Companies { get; set; }
    public DbSet<Construct>? Constructs { get; set; }

    public UsersContext (DbContextOptions<UsersContext> options)
        : base(options)
    {
    }
    
    public UsersContext ()
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
using Codebusters.Model;
using Microsoft.EntityFrameworkCore;

namespace Codebusters.Data;

public class UserDataContext : DbContext
{
    public DbSet<User>? Users { get; set; }
    
    public UserDataContext(DbContextOptions<UserDataContext> options) : base(options)
    {
    }

    public UserDataContext()
    {
        
    }
}
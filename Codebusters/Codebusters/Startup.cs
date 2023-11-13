using System.Text;
using Codebusters.Data;
using Codebusters.Service;
using Codebusters.Service.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Codebusters;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });

            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });
        
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<ICompanyRepository, CompanyRepository>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITokenService, TokenService>();
        
        var connection = _configuration["ConnectionString"];
        
        services.AddDbContext<UsersContext>(options => options.UseSqlServer(connection));
        
        var issuer = _configuration["IssueAudience"];
        var issueSign = _configuration["IssueSign"];
        
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                if (issueSign != null)
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = issuer,
                        ValidAudience = issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(issueSign)
                        ),
                    };
            });
        
        services
            .AddIdentityCore<IdentityUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.User.RequireUniqueEmail = true;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<UsersContext>();
    }
    
    public async void Configure(IApplicationBuilder app, IWebHostEnvironment env, UsersContext usersContext)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.UseHttpsRedirection();
        app.UseRouting();

        app.Use(async (context, next) =>
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000");
            context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");

            if (context.Request.Method == "OPTIONS")
            {
                context.Response.StatusCode = 200;
            }
            else
            {
                await next();
            }
        });
        
        app.UseAuthentication();
        app.UseAuthorization();

        if (env.IsEnvironment("Test"))
        {
            await usersContext.Database.EnsureCreatedAsync();
        }

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
        
        await AddRolesAndAdmin(app);
    }

    async Task AddRolesAndAdmin(IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    
        var roleList = new List<string> { "Admin", "User", "Insider", "Outsider" };
    
        foreach (var role in roleList)
        {
            await CreateRole(roleManager, role);
        }

        await CreateAdminIfNotExists(userManager);
    }

    async Task CreateRole(RoleManager<IdentityRole> roleManager, string role)
    {
        await roleManager.CreateAsync(new IdentityRole(role));
    }

    async Task CreateAdminIfNotExists(UserManager<IdentityUser> userManager)
    {
        var adminInDb = await userManager.FindByEmailAsync("admin@gmail.com");
        if (adminInDb == null)
        {
            var admin = new IdentityUser { UserName = "Admin", Email = "admin@hotmail.com" };
            var adminCreated = await userManager.CreateAsync(admin, "AdminStrongPassword");

            if (adminCreated.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
    }
}

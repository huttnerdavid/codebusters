using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CodebustersIntegrationTests.IntegrationTests;

[Collection("firstSequence")]
public class AuthenticationControllerTests : IClassFixture<CustomWebApplicationFactory<Codebusters.Program>>
{
    private readonly CustomWebApplicationFactory<Codebusters.Program> _factory;

    public AuthenticationControllerTests(
        CustomWebApplicationFactory<Codebusters.Program> factory)
    {
        _factory = factory;
    }
    
    [Theory]
    [InlineData("/login")]
    public async Task Post_Login_IsSuccessful(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var loginContent = new Dictionary<string, string>
        {
            {"Email", "admin@hotmail.com"},
            {"Password", "AdminStrongPassword"}
        };
        var loginData = JsonContent.Create(loginContent);
        
        var loginEvent = await client.PostAsync(url, loginData);

        loginEvent.EnsureSuccessStatusCode();
        Assert.True(loginEvent.IsSuccessStatusCode);
    }
    
    [Theory]
    [InlineData("/login")]
    public async Task Post_Login_IsUnsuccessful_WrongPassword(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var loginContent = new Dictionary<string, string>
        {
            {"Email", "admin@hotmail.com"},
            {"Password", "wrongpassword"}
        };
        var loginData = JsonContent.Create(loginContent);
        
        var loginEvent = await client.PostAsync(url, loginData);

        Assert.True(loginEvent.StatusCode == HttpStatusCode.BadRequest);
    }
    
    [Theory]
    [InlineData("/login")]
    public async Task Post_Login_IsUnsuccessful(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var loginContent = new Dictionary<string, string>
        {
            {"Email", "1234@hotmail.com"},
            {"Password", "12341234123412341234"}
        };
        
        var loginData = JsonContent.Create(loginContent);
        
        var loginEvent = await client.PostAsync(url, loginData);

        Assert.True(!loginEvent.IsSuccessStatusCode);
    }
    
    [Theory]
    [InlineData("/register")]
    public async Task Post_Register_IsSuccessful(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var regContent = new Dictionary<string, string>
        {
            {"Email", "4321@hotmail.com"},
            {"Username", "asdf"},
            {"Password", "asdfasdf"},
            {"PhoneNumber", "12341234"},
            {"FirstName", "asdf"},
            {"LastName", "asdf"},
            {"Gender", "krumpli"},
            {"ZipCode", "1234"},
            {"City", "asdf"},
            {"Street", "asdf"},
            {"DoorNumber", "1234"},
            {"UserType", "user"},
            {"CompanyNameByDatabase", "asdf"},
            {"RegistrationType", "CompanyEmployee"}
        };
        
        var regData = JsonContent.Create(regContent);
        
        var response = await client.PostAsync(url, regData);

        Assert.True(response.StatusCode == HttpStatusCode.Created);
    }
    
    [Theory]
    [InlineData("/register")]
    public async Task Post_Register_IsUnsuccessful_ShortPassword(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var regContent = new Dictionary<string, string>
        {
            {"Email", "43221@hotmail.com"},
            {"Username", "asdf"},
            {"Password", "asdf"},
            {"PhoneNumber", "12341234"},
            {"FirstName", "asdf"},
            {"LastName", "asdf"},
            {"Gender", "krumpli"},
            {"ZipCode", "1234"},
            {"City", "asdf"},
            {"Street", "asdf"},
            {"DoorNumber", "1234"},
            {"UserType", "user"},
            {"CompanyNameByDatabase", "asdf"},
            {"RegistrationType", "CompanyEmployee"}
        };
        
        var regData = JsonContent.Create(regContent);
        
        var response = await client.PostAsync(url, regData);
        Assert.True(response.StatusCode == HttpStatusCode.BadRequest);
    }
    
    [Theory]
    [InlineData("/register")]
    public async Task Post_Register_IsUnsuccessful_TakenEmail(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var regContent = new Dictionary<string, string>
        {
            {"Email", "admin@hotmail.com"},
            {"Username", "asdf"},
            {"Password", "asdfasd"},
            {"PhoneNumber", "12341234"},
            {"FirstName", "asdf"},
            {"LastName", "asdf"},
            {"Gender", "krumpli"},
            {"ZipCode", "1234"},
            {"City", "asdf"},
            {"Street", "asdf"},
            {"DoorNumber", "1234"},
            {"UserType", "user"},
            {"CompanyNameByDatabase", "asdf"},
            {"RegistrationType", "CompanyEmployee"}
        };
        
        var regData = JsonContent.Create(regContent);
        
        var response = await client.PostAsync(url, regData);
        Assert.True(response.StatusCode == HttpStatusCode.BadRequest);
    }
}

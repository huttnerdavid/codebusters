using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit.Abstractions;

namespace CodebustersIntegrationTests.IntegrationTests;

public class IntegrationTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly HttpClient _client;

    public IntegrationTests(
        CustomWebApplicationFactory<Program> factory, ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }
    
    // UsersController
    
    [Theory]
    [InlineData("/getUsers")]
    public async Task Get_GetUsersEndpoint_NoAuth_ReturnsError(string url)
    {
        var response = await _client.GetAsync(url);
        
        Assert.True(response.StatusCode is HttpStatusCode.Forbidden or HttpStatusCode.Unauthorized);
    }
    
    // AuthenticationController
    
    [Theory]
    [InlineData("/Login")]
    public async Task Post_Login_IsSuccessful(string url)
    {
        var loginContent = new Dictionary<string, string>
        {
            {"Email", "admin@hotmail.com"},
            {"Password", "AdminStrongPassword"}
        };
        var loginData = JsonContent.Create(loginContent);
        
        var loginEvent = await _client.PostAsync(url, loginData);

        loginEvent.EnsureSuccessStatusCode();
        Assert.True(loginEvent.IsSuccessStatusCode);
    }
    
    [Theory]
    [InlineData("/Login")]
    public async Task Post_Login_IsUnsuccessful_WrongPassword(string url)
    {
        var loginContent = new Dictionary<string, string>
        {
            {"Email", "admin@hotmail.com"},
            {"Password", "wrongpassword"}
        };
        var loginData = JsonContent.Create(loginContent);
        
        var loginEvent = await _client.PostAsync(url, loginData);

        Assert.True(loginEvent.StatusCode == HttpStatusCode.BadRequest);
    }
    
    [Theory]
    [InlineData("/Login")]
    public async Task Post_Login_IsUnsuccessful(string url)
    {
        var loginContent = new Dictionary<string, string>
        {
            {"Email", "1234@hotmail.com"},
            {"Password", "12341234123412341234"}
        };
        
        var loginData = JsonContent.Create(loginContent);
        
        var loginEvent = await _client.PostAsync(url, loginData);

        Assert.True(!loginEvent.IsSuccessStatusCode);
    }
    
    [Theory]
    [InlineData("/Register")]
    public async Task Post_Register_IsSuccessful(string url)
    {
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
        
        var response = await _client.PostAsync(url, regData);

        Assert.True(response.StatusCode == HttpStatusCode.Created);
    }
    
    [Theory]
    [InlineData("/Register")]
    public async Task Post_Register_IsUnsuccessful_ShortPassword(string url)
    {
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
        
        var response = await _client.PostAsync(url, regData);
        _testOutputHelper.WriteLine(response.StatusCode.ToString());
        Assert.True(response.StatusCode == HttpStatusCode.BadRequest);
    }
    
    [Theory]
    [InlineData("/Register")]
    public async Task Post_Register_IsUnsuccessful_TakenEmail(string url)
    {
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
        
        var response = await _client.PostAsync(url, regData);
        _testOutputHelper.WriteLine(response.StatusCode.ToString());
        Assert.True(response.StatusCode == HttpStatusCode.BadRequest);
    }
}
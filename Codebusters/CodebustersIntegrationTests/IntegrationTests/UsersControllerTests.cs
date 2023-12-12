using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CodebustersIntegrationTests.IntegrationTests;

[Collection("firstSequence")]
public class UsersControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public UsersControllerTests(
        CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;

    }
    
    [Theory]
    [InlineData("/getUsers")]
    public async Task Get_GetUsersEndpoint_NoAuth_ReturnsError(string url)
    {
        var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var response = await client.GetAsync(url);
        
        Assert.True(response.StatusCode is HttpStatusCode.Forbidden or HttpStatusCode.Unauthorized);
    }
}
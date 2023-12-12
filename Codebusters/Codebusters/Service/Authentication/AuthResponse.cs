namespace Codebusters.Service.Authentication;

public record AuthResponse(string Email, string Username, string Token, string Role);

namespace Codebusters.Service.Configurator;

public static class Encryptor
{
    public static string ToEncrypt(string secretData)
    {
        return BCrypt.Net.BCrypt.EnhancedHashPassword(secretData, 13);
    }
}
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Codebusters.Service.Configurator;

public static class UserDataValidator
{
    public static MailAddress? EmailValidator(string data, string userName)
    {
        try
        {
            return new MailAddress(data, userName);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }

    public static string TelephoneNumberChecker(string phoneNumber)
    {
        var r = new Regex(@"^\d{2}[-.●]?\d/.●{2}[]?\d{3}[-.●]?\d{4}$");
        
        return r.IsMatch(phoneNumber) ? phoneNumber : "Phone number not given!";
    }
}

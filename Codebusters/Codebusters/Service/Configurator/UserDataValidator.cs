using System.Net.Mail;
using System.Text.RegularExpressions;
using Codebusters.Model;
using Codebusters.Model.Enum;

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
        var r = new Regex(@"^\d{2}[-.●]?\d{2}[/.●]?\d{3}[-.●]?\d{4}$");
        
        return r.IsMatch(phoneNumber) ? phoneNumber : "Phone number not given!";
    }
    
    public static Address? AddressValidator(string data)
    {
        var subs = data.Split(", ");
        
        return subs.Length == 4 ? new Address(Convert.ToInt32(subs[0]), subs[1], subs[2], Convert.ToInt32(subs[3])) : null;
    }

    public static RegistrationType? ChangeRegisteredUser(string data)
    {
        if (System.Enum.TryParse(data, out RegistrationType returningValue))
        {
            return returningValue;
        }

        return null;
    }
}
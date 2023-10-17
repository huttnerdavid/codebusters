using System.Net.Mail;
using Codebusters.Model.Enum;

namespace Codebusters.Model;

public class User
{
    public Guid Id { get; }
    public string UserName { get; private set; }
    public string Password { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public GenderType Gender { get; }
    public Address? Address { get; private set; }
    public string PhoneNumber { get; private set; }
    public MailAddress? Email { get; private set; }
    public DateTime RegistrationDate { get; }
    public UserType UserType { get; }
    public RegistrationType RegistrationType { get; private set; }

    public User(string userName, string password, string firstName, string lastName, GenderType gender, string address, string phoneNumber, string email, UserType userType, RegistrationType registrationType)
    {
        Id = Guid.NewGuid();
        UserName = userName;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        Gender = gender;
        Address = UserDataValidator.AddressValidator(address);
        PhoneNumber = UserDataValidator.TelephoneNumberChecker(phoneNumber);
        Email = UserDataValidator.EmailValidator(email, UserName);
        RegistrationDate = DateTime.Today;
        UserType = userType;
        RegistrationType = registrationType;
    }
    
    public void ChangeData(string data, UserDataType dataType)
    {
        switch (dataType)
        {
            case UserDataType.Un : UserName = data;
                break;
            
            case UserDataType.Pw : Password = data;
                break;
            
            case UserDataType.Fn : FirstName = data;
                break;
            
            case UserDataType.Ln : LastName = data;
                break;
            
            case UserDataType.Add : Address = UserDataValidator.AddressValidator(data);
                break;
            
            case UserDataType.Pn : PhoneNumber = data;
                break;
            
            case UserDataType.Email : Email = new MailAddress(data, UserName);
                break;
            
            case UserDataType.RegType : RegistrationType = (RegistrationType)UserDataValidator.ChangeRegisteredUser(data)!;
                break;
            
            default : throw new ArgumentOutOfRangeException(nameof(dataType), dataType, null);
        }
    }
}
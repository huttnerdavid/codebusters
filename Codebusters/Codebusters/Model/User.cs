using System.ComponentModel.DataAnnotations;
using Codebusters.Service.Configurator;

namespace Codebusters.Model;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Gender { get; }
    public Address? Address { get; private set; }
    public string RegistrationDate { get; }
    public string UserType { get; }
    public string RegistrationType { get; private set; }
    public string IdentityUserId { get; private set; } 

    public User(string firstName, string lastName, string gender, string address, string userType, string registrationType, string identityUserId)
    {
        FirstName = firstName;
        LastName = lastName;
        Gender = gender;
        Address = UserDataValidator.AddressValidator(address);
        RegistrationDate = DateTime.Now.ToString("yyyy-MM-dd");
        UserType = userType;
        RegistrationType = registrationType;
        IdentityUserId = identityUserId;
    }

    public User()
    {
        
    }
    
    /*public void ChangeData(string data, UserDataType dataType)
    {
        switch (dataType)
        {
            case UserDataType.Un : IdentityUserProperty.UserName = data;
                break;
            
            case UserDataType.Pw : IdentityUserProperty.PasswordHash = Encryptor.ToEncrypt(data);
                break;
            
            case UserDataType.Fn : FirstName = data;
                break;
            
            case UserDataType.Ln : LastName = data;
                break;
            
            case UserDataType.Add : Address = UserDataValidator.AddressValidator(data);
                break;
            
            case UserDataType.Pn : PhoneNumber = data;
                break;
            
            case UserDataType.Email : IdentityUserProperty.Email = data;
                break;
            
            case UserDataType.RegType : RegistrationType = data;
                break;
            
            default : throw new ArgumentOutOfRangeException(nameof(dataType), dataType, null);
        }
    }*/
}
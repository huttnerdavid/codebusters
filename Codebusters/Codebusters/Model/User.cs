using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Codebusters.Model;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Gender { get; init; }
    public int ZipCode { get; private set; }
    public string City { get; private set; }
    public string Street { get; private set; }
    public int DoorNumber { get; private set; }
    public string RegistrationDate { get; init; }
    public string UserType { get; init; }
    public string CompanyNameByDatabase { get; set; }
    public string RegistrationType { get; private set; }
    /*[ForeignKey()]*/
    public string IdentityUserId { get; init; }

    public User(string firstName,
                string lastName,
                string gender,
                int zipCode,
                string city,
                string street,
                int doorNumber,
                string userType, 
                string companyNameByDatabase,
                string registrationType,
                string identityUserId)
    {
        FirstName = firstName;
        LastName = lastName;
        Gender = gender;
        ZipCode = zipCode;
        City = city;
        Street = street;
        DoorNumber = doorNumber;
        RegistrationDate = DateTime.Now.ToString("yyyy-MM-dd");
        UserType = userType;
        CompanyNameByDatabase = companyNameByDatabase;
        RegistrationType = registrationType;
        IdentityUserId = identityUserId;
    }

    public User()
    {
        
    }
}

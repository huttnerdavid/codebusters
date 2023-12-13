using System.ComponentModel.DataAnnotations;

namespace Codebusters.Model;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public string Gender { get; init; } = null!;
    public int ZipCode { get; private set; }
    public string City { get; private set; } = null!;
    public string Street { get; private set; } = null!;
    public int DoorNumber { get; private set; }
    public string RegistrationDate { get; init; } = null!;
    public string UserType { get; init; } = null!;
    public string CompanyNameByDatabase { get; set; } = null!;
    public string RegistrationType { get; private set; } = null!;
    public string IdentityUserId { get; init; } = null!;

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

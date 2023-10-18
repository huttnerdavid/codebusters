using System.Net.Mail;
using Codebusters.Model;
using Codebusters.Model.Enum;

namespace TestCodebustersProject;

public class Tests
{
    [Test]
    public void UserWithValidValuesAndNull()
    {
        const string userName = "JohnVick";
        const string password = "Constantine69";
        const string firstName = "Victor";
        const string lastName = "Postgradual";
        var genderType = GenderType.Male.ToString();
        const string address = "6969, Night City, Sesamme, 69";
        const string mobile = "06-90/696-6969";
        const string email = "vickjmustang@awesomeness.hu";
        var userType = UserType.CEO.ToString();
        var registrationType = RegistrationType.CompanyEmployee.ToString();

        var user = new User(userName,
                            password,
                            firstName,
                            lastName,
                            genderType,
                            address,
                            mobile,
                            email,
                            userType,
                            registrationType
                            );

        var email2 = "Vicky";
        var user2 = "Vicktorinox";
        var emailNullResult = UserDataValidator.EmailValidator(email2, user2);
        
        Assert.Multiple(() =>
        {
            Assert.That(user.UserName, Is.EqualTo(userName));
            Assert.That(user.Password, Is.EqualTo(password));
            Assert.That(user.FirstName, Is.EqualTo(firstName));
            Assert.That(user.LastName, Is.EqualTo(lastName));
            Assert.That(user.Gender.ToString(), Is.EqualTo(genderType));
            Assert.That(user.Address?.City, Is.EqualTo(UserDataValidator.AddressValidator(address)?.City));
            Assert.That(user.Address?.Street, Is.EqualTo(UserDataValidator.AddressValidator(address)?.Street));
            Assert.That(user.Address?.ZipCode, Is.EqualTo(UserDataValidator.AddressValidator(address)?.ZipCode));
            Assert.That(user.Address?.DoorNumber, Is.EqualTo(UserDataValidator.AddressValidator(address)?.DoorNumber));
            Assert.That(user.PhoneNumber, Is.EqualTo(UserDataValidator.TelephoneNumberChecker(mobile)));
            Assert.That(user.Email, Is.EqualTo(UserDataValidator.EmailValidator(email, userName)));
            Assert.That(user.Email, Is.Not.Null);
            Assert.That(user.Email?.Address, Is.EqualTo(UserDataValidator.EmailValidator(email, userName)?.Address));
            Assert.That(user.Email?.User, Is.EqualTo(UserDataValidator.EmailValidator(email, userName)?.User));
            Assert.That(user.Email?.DisplayName, Is.EqualTo(userName));
            Assert.That(emailNullResult, Is.Null);
            Assert.That(user.UserType.ToString(), Is.EqualTo(userType));
            Assert.That(user.RegistrationType.ToString(), Is.EqualTo(registrationType));
        });
    }
}
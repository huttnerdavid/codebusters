using Codebusters.Model;
using Codebusters.Model.Enum;

namespace Codebusters.Service;

public class UserRepository : IUserRepository
{
    const string userName = "JohnVick";
    const string password = "Constantine69";
    const string firstName = "Victor";
    const string lastName = "Postgradual";
    /*const GenderType genderType = GenderType.Male;*/
    private static string genderType = GenderType.Male.ToString();
    const string address = "6969, Night City, Sesamme, 69";
    const string mobile = "06-90/696-6969";
    const string email = "vickjmustang@awesomeness.hu";
    static string userType = UserType.CEO.ToString();
    static string registrationType = RegistrationType.CompanyEmployee.ToString();

    readonly User _user = new User(userName,
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
    
    
    public User Get()
    {
        return _user;
    }
}
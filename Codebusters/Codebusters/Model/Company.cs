using System.ComponentModel.DataAnnotations;
using Codebusters.Data;

namespace Codebusters.Model;

public class Company
{
    [Key]
    public Guid Id { get; set; }
    public string CompanyName { get; set; }
    public int ZipCode { get; private set; }
    public string City { get; private set; }
    public string Street { get; private set; }
    public int DoorNumber { get; private set; }
    public string RegistrationDate { get; init; }
    public string PickedCompanyType { get; init; }
    public int WarehouseSize { get; private set; }
    public int CompanyUserCount { get; set; }

    private readonly UsersContext _usersContext;
    public Company(string companyName, int zipCode, string city, string street, int doorNumber, string pickedCompanyType, UsersContext usersContext)
    {
        CompanyName = companyName;
        ZipCode = zipCode;
        City = city;
        Street = street;
        DoorNumber = doorNumber;
        RegistrationDate = DateTime.Now.ToString("yyyy-MM-dd");
        PickedCompanyType = pickedCompanyType;
        _usersContext = usersContext;
        WarehouseSize = MeasureWarehouseSize(pickedCompanyType);
        CompanyUserCount = UserCounterForCompany(companyName);
    }

    public Company()
    {
    }

    private int UserCounterForCompany(string companyName)
    {
        return (int)_usersContext?.UsersDb?.Count(u => u.CompanyNameByDatabase == companyName)!;
    }

    private int MeasureWarehouseSize(string companyType)
    {
        switch (companyType)
        {
            case "Large":
                return 150;
            case "Medium":
                return 75;
            case "Small":
                return 35;
            default:
                return 0;
        }
    }
}

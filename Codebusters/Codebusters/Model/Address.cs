using System.ComponentModel.DataAnnotations;

namespace Codebusters.Model;

public class Address
{
    [Key]
    public Guid Id { get; set; }
    public int ZipCode { get; private set; }
    public string City { get; private set; }
    public string Street { get; private set; }
    public int DoorNumber { get; private set; }

    public Address(int zipCode, string city, string street, int doorNumber)
    {
        ZipCode = zipCode;
        City = city;
        Street = street;
        DoorNumber = doorNumber;
    }
}
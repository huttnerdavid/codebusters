namespace Codebusters.Model;

public class Address
{
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
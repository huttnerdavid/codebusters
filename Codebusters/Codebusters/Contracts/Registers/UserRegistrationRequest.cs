using System.ComponentModel.DataAnnotations;

namespace Codebusters.Contracts.Registers;

public record UserRegistrationRequest(
    [Required]string Username,
    [Required]string Password,
    [Required]string Email,
    [Required]string PhoneNumber,
    [Required]string FirstName,
    [Required]string LastName,
    [Required]string Gender,
    [Required]int ZipCode,
    [Required]string City,
    [Required]string Street,
    [Required]int DoorNumber,
    [Required]string UserType,
    [Required]string CompanyNameByDatabase,
    [Required]string RegistrationType
    );

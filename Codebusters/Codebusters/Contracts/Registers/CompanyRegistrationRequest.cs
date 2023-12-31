using System.ComponentModel.DataAnnotations;

namespace Codebusters.Contracts.Registers;

public record CompanyRegistrationRequest(
    [Required]string CompanyName,
    [Required]int ZipCode,
    [Required]string City,
    [Required]string Street,
    [Required]int DoorNumber,
    [Required]string PickedCompanyType
);

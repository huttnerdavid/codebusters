using System.ComponentModel.DataAnnotations;

namespace Codebusters.Contracts;

public record RegistrationRequest(
    [Required]string Username,
    [Required]string Password,
    [Required]string Email,
    [Required]string PhoneNumber,
    [Required]string FirstName,
    [Required]string LastName,
    [Required]string Gender,
    [Required]string Address,
    [Required]string UserType,
    [Required]string RegistrationType
    );

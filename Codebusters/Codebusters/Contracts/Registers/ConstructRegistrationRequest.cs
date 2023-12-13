using System.ComponentModel.DataAnnotations;

namespace Codebusters.Contracts.Registers;

public record ConstructRegistrationRequest
(
    [Required]string ConstructName,
    [Required]string CompanyName,
    [Required]string Status,
    [Required]int WorkerCount
);

using System.ComponentModel.DataAnnotations;

namespace Codebusters.Contracts.Services;

public record ChangePasswordRequest([Required] string Email, [Required] string CurrentPassword, [Required][MinLength(6)]string NewPassword);

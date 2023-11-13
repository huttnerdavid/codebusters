using System.ComponentModel.DataAnnotations;

namespace Codebusters.Model;

public class Construct
{
    [Key]
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? CompanyName { get; set; }
    public string? Status { get; set; }
    public int WorkerCount { get; set; }

    public Construct(string? name, string? companyName, string status, int workerCount)
    {
        Name = name;
        CompanyName = companyName;
        Status = status;
        WorkerCount = workerCount;
    }
}
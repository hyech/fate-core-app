using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.Entities;

[Table("Aspects")]
public class Aspect
{
    [Key]
    [Column("id")]
    public float Id { get; set; }

    [Column("text")]
    public string? Text { get; set; }

    [Column("position")]
    public float[]? Position { get; set; }
}
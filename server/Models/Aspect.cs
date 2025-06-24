using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Aspect
    {
        [Key]
        public float Id { get; set; }
        
        [Column(TypeName = "nvarchar(1000)")]
        public string Text { get; set; }
    }
}
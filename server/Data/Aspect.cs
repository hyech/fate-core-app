using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Data
{
    public class Aspect
    {
        public float Id { get; set; }
        
        public string Text { get; set; }
    }
}
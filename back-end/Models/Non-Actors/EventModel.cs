using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INF_01127.Models.Actors
{
    [Table("Events")]
    public class EventModel
    {
        [Key]
        [Column("EventIdentification")]
        [Display(Name = "EventIdentification")]
        public int EventIdentification { get; set; }

        [Column("KitchenIdentification")]
        [Required(ErrorMessage = "Identificação de cozinha é necessária.")]
        [Display(Name = "KitchenIdentification")]
        public int KitchenIdentification { get; set; }

        [Column("Location")]
        [Required(ErrorMessage = "Local é necessário.")]
        [Display(Name = "Location")]
        public string Location { get; set; }

        [Column("Public")]
        [Required(ErrorMessage = "Público é necessário.")]
        [Display(Name = "Public")]
        public int Public { get; set; }

        [Column("Data")]
        [Required(ErrorMessage = "Data é necessário.")]
        [Display(Name = "Data")]
        public DateTime Date { get; set; }
    }
}
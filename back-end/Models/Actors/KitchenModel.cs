using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INF_01127.Models.Actors
{
    [Table("Kitchens")]
    public class KitchenModel
    {
        [Key]
        [Column("Identification")]
        [Display(Name = "Identification")]
        public int Identification { get; set; }

        [Column("Name")]
        [Required(ErrorMessage = "Nome é necessário.")]
        [MaxLength(20, ErrorMessage = "Nome pode ter no máximo vinte caracteres.")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column("Password")]
        [Required(ErrorMessage = "Senha é necessária.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$", ErrorMessage = "Senha precisa ter no mínimo oito caracteres, no máximo dez caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial.")]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Column("EmailAddress")]
        [Required(ErrorMessage = "Endereço de email é necessário.")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Endereço de email precisa ser válido.")]
        [Display(Name = "EmailAddress")]
        public string EmailAddress { get; set; }

        [Column("Validated")]
        [Display(Name = "Validated")]
        public bool Validated { get; set; } = false;

        [Column("Location")]
        [Required(ErrorMessage = "Endereço é necessário.")]
        [MaxLength(100, ErrorMessage = "Endereço pode ter no máximo cem caracteres.")]
        [Display(Name = "Location")]
        public string Location { get; set; }

        [Column("Description")]
        [Required(ErrorMessage = "Descrição é necessária.")]
        [Display(Name = "Description")]
        public string Description { get; set; }
    }
}
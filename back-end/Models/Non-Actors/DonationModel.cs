using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace INF_01127.Models.Actors
{
    [Table("Donations")]
    public class DonationModel
    {
        [Key]
        [Column("Identification")]
        [Display(Name = "Identification")]
        public int DonationIdentification { get; set; }

        [AllowNull]
        [Column("DonorIdentification")]
        [Display(Name = "DonorIdentification")]
        public int? DonorIdentification { get; set; } = null;

        [Column("KitchenIdentification")]
        [Required(ErrorMessage = "Identitificação de cozinha é necessária.")]
        [Display(Name = "KitchenIdentification")]
        public int KitchenIdentification { get; set; }

        [Column("Name")]
        [Required(ErrorMessage = "Nome é necessário.")]
        [MaxLength(20, ErrorMessage = "Nome pode ter no máximo vinte caracteres.")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column("Quantity")]
        [Required(ErrorMessage = "Quantidade é necessária.")]
        [Range(1, 100, ErrorMessage = "Quantidade precisa ser entre um e cem, ambos inclusos.")]
        public int Quantity { get; set; }

        [Column("Unit")]
        [Required(ErrorMessage = "Unidade é necessária")]
        [RegularExpression(@"\b(Quilos|Litros|Gramas|Bandejas)\b", ErrorMessage = "Aepnas quilos, litros, gramas e bandejas são aceitos.")]
        [MaxLength(8, ErrorMessage = "Unidade pode ter no máximo dez caracteres.")]
        [Display(Name = "Unit")]
        public string Unit { get; set; }

        [Column("Price")]
        [Required(ErrorMessage = "Preço é necessário")]
        [Display(Name = "Price")]
        public decimal Price { get; set; }
    }
}
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INF_01127.Models.Actors
{
    [Table("Donors")]
    [Index(nameof(ITR), IsUnique = true)]
    [Index(nameof(PhoneNumber), IsUnique = true)]
    [Index(nameof(EmailAddress), IsUnique = true)]

    public class DonorModel
    {
        [Key]
        [Column("Identification")]
        [Display(Name = "Identification")]
        public int Identification { get; set; }

        [Column("ITR")]
        [Required(ErrorMessage = "CPF é necessário.")]
        [RegularExpression(@"^[0-9]{11}$", ErrorMessage = "CPF precisa ser válido.")]
        [Display(Name = "ITR")]
        public string ITR { get; set; }

        [Column("PhoneNumber")]
        [Required(ErrorMessage = "Número de telefone é necessário.")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Número de telefone precisa ser válido.")]
        [Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

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
    }
}
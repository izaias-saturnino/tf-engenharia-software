using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace INF_01127.Models.Requests
{
    public class SignInModel
    {
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
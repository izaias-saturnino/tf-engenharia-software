using System.ComponentModel.DataAnnotations;

namespace INF_01127.Models.Use_Cases
{
    public class ChangeAccountInformationModel
    {
        [Required(ErrorMessage = "Identificação é necessária.")]
        [Display(Name = "Identification")]
        public int Identification { get; set; }

        [Required(ErrorMessage = "Senha é necessária.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$", ErrorMessage = "Senha precisa ter no mínimo oito caracteres, no máximo dez caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial.")]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Troca é necessária.")]
        [Display(Name = "Change")]
        public string Change { get; set; }
    }
}
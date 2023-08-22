using System.ComponentModel.DataAnnotations;

namespace INF_01127.Models.Use_Cases
{
    public class SearchForKitchensModel
    {
        [Required(ErrorMessage = "Chave é necessária.")]
        [Display(Name = "Key")]
        public string Key { get; set; }

        [Required(ErrorMessage = "Valor é necessário.")]
        [Display(Name = "Value")]
        public string Value { get; set; }
    }
}
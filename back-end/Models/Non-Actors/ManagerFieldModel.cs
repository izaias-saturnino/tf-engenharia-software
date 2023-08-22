using System.ComponentModel.DataAnnotations;

namespace INF_01127.Models.Use_Cases
{
    public class ManagerFieldModel
    {
        [Required(ErrorMessage = "Identificação de gerente é necessária.")]
        [Display(Name = "ManagerIdentification")]
        public int ManagerIdentification { get; set; }

        [Required(ErrorMessage = "Identificação de usuário é necessária.")]
        [Display(Name = "UserIdentification")]
        public int UserIdentification { get; set; }

        [Display(Name = "UserType")]
        public bool UserType { get; set; } = true;
    }
}
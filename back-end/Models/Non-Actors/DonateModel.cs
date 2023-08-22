using System.ComponentModel.DataAnnotations;

namespace INF_01127.Models.Actors
{
    public class DonateModel
    {
        [Required(ErrorMessage = "Identificação a doação é necessária.")]
        [Display(Name = "Identification")]
        public int DonationIdentification { get; set; }

        [Required(ErrorMessage = "Identificação do doador é necessária.")]
        [Display(Name = "DonorIdentification")]
        public int DonorIdentification { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace TestTaskVersta.DTOs.Requests;

public record CreateOrderRequest(
    [Required(ErrorMessage = "Sender's city is required")]
    string SenderCity,
    [Required(ErrorMessage = "Sender's address is required")]
    string SenderAddress,
    [Required(ErrorMessage = "Recipient's city is required")]
    string RecipientCity,
    [Required(ErrorMessage = "Recipient's address is required")]
    string RecipientAddress,
    [Range(0.001, double.MaxValue, ErrorMessage = "Weight must be greater than 0")]
    double CargoWeight,
    [Required(ErrorMessage = "Date of cargo pickup is required")]
    
    DateOnly CargoDatePickup
);

namespace TestTaskVersta.DTOs.Responses;

public record OrderResponse
(
    Guid Id,
    string SenderCity,
    string SenderAddress,
    string RecipientCity,
    string RecipientAddress,
    double CargoWeight,
    DateOnly CargoDatePickup
);
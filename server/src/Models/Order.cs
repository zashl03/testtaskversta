namespace TestTaskVersta.Models;

public class Order
{
    public Guid Id { get; set;}
    public string SenderCity { get; private set; } = string.Empty;
    public string SenderAddress { get; private set; } = string.Empty;
    public string RecipientCity { get; private set; } = string.Empty;
    public string RecipientAddress { get; private set; } = string.Empty;
    public double CargoWeight { get; private set; }
    public DateOnly CargoDatePickup { get; private set; }

    private Order ()
    {}
    public Order(string senderCity, string senderAddress, string recipientCity, string recipientAddress, double cargoWeight, DateOnly cargoDatePickup)
    {
        if(string.IsNullOrWhiteSpace(senderCity))
            throw new ArgumentException("Sender's city is required", nameof(senderCity));
        if(string.IsNullOrWhiteSpace(senderAddress))
            throw new ArgumentException("Sender's address is required", nameof(senderAddress));
        if(string.IsNullOrWhiteSpace(recipientCity))
            throw new ArgumentException("Recipient's city is required", nameof(recipientCity));
        if(string.IsNullOrWhiteSpace(recipientAddress))
            throw new ArgumentException("Recipient's address is required", nameof(recipientAddress));
        if(cargoWeight <= 0)
            throw new ArgumentException("Cargo's weight must be greater than 0", nameof(cargoWeight));
        if(cargoDatePickup < DateOnly.FromDateTime(DateTime.UtcNow))
            throw new ArgumentException("Date of cargo pickup cant be in past", nameof(cargoDatePickup));
        
        SenderCity = senderCity;
        SenderAddress = senderAddress;
        RecipientCity = recipientCity;
        RecipientAddress = recipientAddress;
        CargoWeight = cargoWeight;
        CargoDatePickup = cargoDatePickup;
    }
}

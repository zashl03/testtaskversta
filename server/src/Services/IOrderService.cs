using TestTaskVersta.DTOs.Requests;
using TestTaskVersta.DTOs.Responses;

namespace TestTaskVersta.Services;

public interface IOrdersService
{
    Task<Guid> CreateOrderAsync(CreateOrderRequest request);
    Task<OrderResponse?> GetOrderByIdAsync(Guid id);
    Task<List<OrderResponse>> GetOrdersAsync();
}

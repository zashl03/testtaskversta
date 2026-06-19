using Microsoft.EntityFrameworkCore;
using TestTaskVersta.Data;
using TestTaskVersta.DTOs.Requests;
using TestTaskVersta.DTOs.Responses;
using TestTaskVersta.Models;

namespace TestTaskVersta.Services;

public class OrdersService : IOrdersService
{
    private readonly AppDbContext _context;

    public OrdersService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateOrderAsync(CreateOrderRequest request)
    {
        var order = new Order(
            request.SenderCity,
            request.SenderAddress,
            request.RecipientCity,
            request.RecipientAddress,
            request.CargoWeight,
            request.CargoDatePickup);
        
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        return order.Id;
    }

    public async Task<OrderResponse?> GetOrderByIdAsync(Guid id)
    {
        var order = await _context.Orders
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id);
        
        if(order == null)
            return null;

        var response = new OrderResponse(
            order.Id,
            order.SenderCity,
            order.SenderAddress,
            order.RecipientCity,
            order.RecipientAddress,
            order.CargoWeight,
            order.CargoDatePickup);
         
        return response;
    }

    public async Task<List<OrderResponse>> GetOrdersAsync()
    {
        var orders = await _context.Orders.AsNoTracking().ToListAsync();

        var responseList = orders.Select(o => new OrderResponse(o.Id,
            o.SenderCity,
            o.SenderAddress,
            o.RecipientCity,
            o.RecipientAddress,
            o.CargoWeight,
            o.CargoDatePickup))
            .ToList();
         
        return responseList;
    }
}

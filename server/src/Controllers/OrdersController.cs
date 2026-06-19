using Microsoft.AspNetCore.Mvc;
using TestTaskVersta.DTOs.Requests;
using TestTaskVersta.Services;

namespace TestTaskVersta.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrdersService _service;
    public OrdersController(IOrdersService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _service.GetOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var order = await _service.GetOrderByIdAsync(id);
        if(order == null)
        {
            return NotFound(id);
        }
        return CreatedAtAction(nameof(GetById), new { id = order.Id });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        try
        {
            var orderId = await _service.CreateOrderAsync(request);
            return Ok(orderId);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}

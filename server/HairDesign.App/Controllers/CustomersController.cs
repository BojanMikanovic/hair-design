using HairDesign.App.Features.Customers.Commands;
using HairDesign.App.Features.Customers.Models;
using HairDesign.App.Features.Customers.Queries;
using Microsoft.AspNetCore.Mvc;

namespace HairDesign.App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromServices] GetAllCustomersQuery query)
        {
            return Ok(await query.Execute());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, [FromServices] GetCustomerByIdQuery query)
        {
            var result = await query.Execute(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] CustomerUpdateDTO dto,
            [FromServices] CreateCustomerCommand command)
        {
            return Ok(await command.Execute(dto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            Guid id,
            [FromBody] CustomerUpdateDTO dto,
            [FromServices] UpdateCustomerCommand command)
        {
            var result = await command.Execute(id, dto);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            Guid id,
            [FromServices] DeleteCustomerCommand command)
        {
            var success = await command.Execute(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
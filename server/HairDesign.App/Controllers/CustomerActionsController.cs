using HairDesign.App.Modules.CustomerActions.Commands;
using HairDesign.App.Modules.CustomerActions.Models;
using HairDesign.App.Modules.CustomerActions.Queries;
using Microsoft.AspNetCore.Mvc;

namespace HairDesign.App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerActionsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromServices] GetAllCustomerActionsQuery query)
        {
            return Ok(await query.Execute());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, [FromServices] GetCustomerActionByIdQuery query)
        {
            var result = await query.Execute(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] CustomerActionUpdateDTO dto,
            [FromServices] CreateCustomerActionCommand command)
        {
            return Ok(await command.Execute(dto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            Guid id,
            [FromBody] CustomerActionUpdateDTO dto,
            [FromServices] UpdateCustomerActionCommand command)
        {
            var result = await command.Execute(id, dto);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            Guid id,
            [FromServices] DeleteCustomerActionCommand command)
        {
            var success = await command.Execute(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
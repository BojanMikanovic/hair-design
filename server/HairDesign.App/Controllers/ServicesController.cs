using HairDesign.App.Features.services.commands;
using HairDesign.App.Features.services.models;
using HairDesign.App.Features.services.queries;
using Microsoft.AspNetCore.Mvc;

namespace HairDesign.App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromServices] GetAllServicesQuery query)
        {
            return Ok(await query.Execute());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, [FromServices] GetServiceByIdQuery query)
        {
            var result = await query.Execute(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] ServiceUpdateDTO dto,
            [FromServices] CreateServiceCommand command)
        {
            return Ok(await command.Execute(dto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            Guid id,
            [FromBody] ServiceUpdateDTO dto,
            [FromServices] UpdateServiceCommand command)
        {
            var result = await command.Execute(id, dto);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            Guid id,
            [FromServices] DeleteServiceCommand command)
        {
            var success = await command.Execute(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
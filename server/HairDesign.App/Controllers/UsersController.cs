using System.Security.Claims;
using HairDesign.App.Features.Users.Commands;
using HairDesign.App.Features.Users.Models;
using HairDesign.App.Features.Users.Queries;
using Microsoft.AspNetCore.Mvc;

namespace HairDesign.App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromServices] GetAllUsersQuery query)
        {
            return Ok(await query.Execute());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, [FromServices] GetUserByIdQuery query)
        {
            var result = await query.Execute(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] UserCreateDTO dto,
            [FromServices] CreateUserCommand command)
        {
            var (result, error) = await command.Execute(dto);
            if (error != null) return Conflict(new { error });
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            Guid id,
            [FromBody] UserUpdateDTO dto,
            [FromServices] UpdateUserCommand command)
        {
            var (result, error, notFound) = await command.Execute(id, dto);
            if (notFound) return NotFound();
            if (error != null) return Conflict(new { error });
            return Ok(result);
        }

        [HttpPost("{id}/reset-password")]
        public async Task<IActionResult> ResetPassword(
            Guid id,
            [FromBody] PasswordResetDTO dto,
            [FromServices] ResetPasswordCommand command)
        {
            var success = await command.Execute(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            Guid id,
            [FromServices] DeleteUserCommand command)
        {
            var currentUserId = GetCurrentUserId();
            if (currentUserId == null) return Unauthorized();

            var (success, error, notFound) = await command.Execute(id, currentUserId.Value);
            if (notFound) return NotFound();
            if (!success) return Conflict(new { error });
            return NoContent();
        }

        private Guid? GetCurrentUserId()
        {
            var raw = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.TryParse(raw, out var id) ? id : null;
        }
    }
}

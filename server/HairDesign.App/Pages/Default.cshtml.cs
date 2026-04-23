using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HairDesign.App.Pages;

[AllowAnonymous]
public class Default : PageModel
{
    public void OnGet()
    {

    }
}

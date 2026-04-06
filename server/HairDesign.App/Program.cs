using HairDesign.App.Configuration;
using HairDesign.App.Modules.CustomerActions.Commands;
using HairDesign.App.Modules.CustomerActions.Queries;
using HairDesign.App.Modules.Customers.Commands;
using HairDesign.App.Modules.Customers.Queries;
using HairDesign.App.Utilities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddScoped<GetAllCustomersQuery>();
builder.Services.AddScoped<GetCustomerByIdQuery>();
builder.Services.AddScoped<CreateCustomerCommand>();
builder.Services.AddScoped<UpdateCustomerCommand>();
builder.Services.AddScoped<DeleteCustomerCommand>();

builder.Services.AddScoped<GetAllCustomerActionsQuery>();
builder.Services.AddScoped<GetCustomerActionByIdQuery>();
builder.Services.AddScoped<CreateCustomerActionCommand>();
builder.Services.AddScoped<UpdateCustomerActionCommand>();
builder.Services.AddScoped<DeleteCustomerActionCommand>();

var app = builder.Build();

MigrationsUtil.MigrateDatabase(app.Services);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
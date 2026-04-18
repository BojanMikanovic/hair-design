using HairDesign.App.Configuration;
using HairDesign.App.Features.CustomerActions.Commands;
using HairDesign.App.Features.CustomerActions.Queries;
using HairDesign.App.Features.Customers.Commands;
using HairDesign.App.Features.Customers.Queries;
using HairDesign.App.Features.services.commands;
using HairDesign.App.Features.services.queries;
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

builder.Services.AddScoped<GetAllServicesQuery>();
builder.Services.AddScoped<GetServiceByIdQuery>();
builder.Services.AddScoped<CreateServiceCommand>();
builder.Services.AddScoped<UpdateServiceCommand>();
builder.Services.AddScoped<DeleteServiceCommand>();

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
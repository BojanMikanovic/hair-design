using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HairDesign.App.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddServicesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "title",
                table: "CustomerAction");

            migrationBuilder.AddColumn<Guid>(
                name: "service_id",
                table: "CustomerAction",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_service", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_customer_action_service_id",
                table: "CustomerAction",
                column: "service_id");

            migrationBuilder.AddForeignKey(
                name: "fk_customer_action_services_service_id",
                table: "CustomerAction",
                column: "service_id",
                principalTable: "Service",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_customer_action_services_service_id",
                table: "CustomerAction");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropIndex(
                name: "ix_customer_action_service_id",
                table: "CustomerAction");

            migrationBuilder.DropColumn(
                name: "service_id",
                table: "CustomerAction");

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "CustomerAction",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}

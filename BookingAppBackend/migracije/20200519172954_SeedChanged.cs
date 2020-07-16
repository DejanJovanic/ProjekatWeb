using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class SeedChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "4388c6c4-0037-4f4c-97e8-e386a226dd69", "User0", "75322bb2-0a40-4650-bcc9-760866b85e86" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "ec103ff0-43d9-4e50-9a6e-b92a11c067cd", "User1", "63d0241b-f04f-4ec9-a3e7-68b63883d93d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "1fdc8c5c-9bd9-4163-ae6f-4fa8f32fb22e", "User2", "68386eca-4af9-4f1d-b482-286c2aa277c6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "2348a12f-7dcb-4a8c-aee3-cc2bad7e39b8", "AirlineAdmin0", "38a35796-56f3-4b3b-bff1-ef7f71b90727" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "e39bfc84-adf9-43e5-9009-527816fb2ebb", "AirlineAdmin1", "acd96e40-7f19-45e2-832a-5dc08933013c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "cc05905e-91a4-43ef-bb45-79496dbdec5d", "AirlineAdmin2", "51a5cd76-5c48-4278-a06c-13e17735633e" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "531266c0-fe7c-4916-827c-6d2fdb5c524b", null, "f78efbaf-844f-40c0-8d3a-b9afe79d5066" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "bf99aefa-4dd2-403a-9bd3-7571805400ff", null, "b8f57b69-2894-4059-b990-607627ded351" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "88078345-076c-4f76-92cc-bd66164d619d", null, "8310ed80-d2a1-452b-8835-b6317c82954c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "482cd4ea-cea8-4a3b-a52b-239d59f69649", null, "cec11f58-8052-4a52-96e7-51d40105f4ca" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "c9e673c6-23e5-4d6a-a5d2-527e1053508c", null, "f336a0e7-c1e5-444c-b8fe-7700bf6c03ec" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "SecurityStamp" },
                values: new object[] { "a40d4ec7-6d7f-4655-9325-9fed9536d7a1", null, "ceac9ad7-3a2d-4119-97fa-69c229d1d12d" });
        }
    }
}

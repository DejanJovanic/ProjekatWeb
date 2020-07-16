using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class AddedPassport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Passport",
                table: "RegisteredUsers",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c6584e36-265a-486e-9334-db7dbfb55c90", "b96ce7ae-13f3-4a06-ac78-d9291baef3c3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e7557252-bdde-494b-a26f-8b3977410dd9", "48633122-e1cc-4a5e-9af7-b54feb5b311e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a6f3ebce-0031-4505-9a1c-82eb3839c3cb", "7ec12530-6d83-451f-a57b-19ec4a0bf400" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "d73e121a-e1b4-4f98-808f-d8d93cf60afc", "cb59351f-3d68-460a-a698-91c4b096b9cd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "540aaafe-ee83-48f5-93b5-4b21dc06615d", "c800fd1c-cd57-494b-bea8-2bf95050d2b7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "7d5bb465-6d7e-44f7-90ca-02e7a614a138", "cbcfbc38-b7c6-4fcd-9c37-ec44eb5b6a89" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passport",
                table: "RegisteredUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "310a487c-8803-4312-ac0b-c80068e0ab70", "138561a9-370c-4acf-af9e-8909e9122185" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4c5ac62e-89f2-4499-b520-22ec3188f4d3", "7d3670fb-a0f6-4f89-8e8e-594571f5d7f1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "cfd8a29c-5249-4274-a030-13a10709c2c8", "ef8fe431-cf73-48c4-9b4a-d82843a27220" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "14053f51-ca23-46eb-a49d-e0fca040f1a6", "e1684eb5-1bad-4c30-b4db-f58ff59e35aa" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a3767cc8-b946-4cb5-88e1-81b026860bfe", "9d070f5a-3237-4096-9b8b-b78744d9a8d6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "1ee4bde7-8de7-4dd8-a412-130b042e1171", "bcd7e6ca-2719-4d77-84b9-b924d67065f1" });
        }
    }
}

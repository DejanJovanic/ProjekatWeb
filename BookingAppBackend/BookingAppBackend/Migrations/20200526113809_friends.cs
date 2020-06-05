using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class friends : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ParentId",
                table: "RegisteredUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username1",
                table: "RegisteredUsers",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_RegisteredUsers_ParentId",
                table: "RegisteredUsers",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_RegisteredUsers_Username1",
                table: "RegisteredUsers",
                column: "Username1");

            migrationBuilder.AddForeignKey(
                name: "FK_RegisteredUsers_RegisteredUsers_ParentId",
                table: "RegisteredUsers",
                column: "ParentId",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RegisteredUsers_RegisteredUsers_Username1",
                table: "RegisteredUsers",
                column: "Username1",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegisteredUsers_RegisteredUsers_ParentId",
                table: "RegisteredUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_RegisteredUsers_RegisteredUsers_Username1",
                table: "RegisteredUsers");

            migrationBuilder.DropIndex(
                name: "IX_RegisteredUsers_ParentId",
                table: "RegisteredUsers");

            migrationBuilder.DropIndex(
                name: "IX_RegisteredUsers_Username1",
                table: "RegisteredUsers");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "RegisteredUsers");

            migrationBuilder.DropColumn(
                name: "Username1",
                table: "RegisteredUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "826b87ef-feff-452c-b8b3-d6451000b50f", "b4113e43-56af-4d21-b2c2-5c95863fe5c3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "3112ebe0-e470-4445-8992-fab22884cfec", "13dcc246-6db1-4050-9d2e-321b09f3bafe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "21ff06f3-2740-410c-a715-b514ce95582b", "9b1a42e6-0977-44b4-b4b9-f6b1253eeafe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f12547a1-3554-4322-8585-3088bd61a4bd", "79311b20-ab60-4241-8b0a-6e33c121a151" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "2fdfba2e-1e8a-4ff1-811b-77ed4eea4e45", "a7ab1d77-c877-47b9-88bf-012523fa7ce3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ffd09b7c-f4a5-4128-8dd6-f66f83e3f709", "6a0636e7-aae9-4896-8d90-3c8123e0b577" });
        }
    }
}

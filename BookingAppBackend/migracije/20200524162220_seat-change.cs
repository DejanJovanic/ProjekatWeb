 using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class seatchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DisabledSeat_Airplane_DisabledBusinessId",
                table: "DisabledSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_DisabledSeat_Airplane_DisabledEconomyId",
                table: "DisabledSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_DisabledSeat_Airplane_DisabledFirstId",
                table: "DisabledSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_RemovedSeat_Airplane_RemovedBusinessId",
                table: "RemovedSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_RemovedSeat_Airplane_RemovedEconomyId",
                table: "RemovedSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_RemovedSeat_Airplane_RemovedFirstId",
                table: "RemovedSeat");

            migrationBuilder.DropIndex(
                name: "IX_RemovedSeat_RemovedBusinessId",
                table: "RemovedSeat");

            migrationBuilder.DropIndex(
                name: "IX_RemovedSeat_RemovedEconomyId",
                table: "RemovedSeat");

            migrationBuilder.DropIndex(
                name: "IX_RemovedSeat_RemovedFirstId",
                table: "RemovedSeat");

            migrationBuilder.DropIndex(
                name: "IX_DisabledSeat_DisabledBusinessId",
                table: "DisabledSeat");

            migrationBuilder.DropIndex(
                name: "IX_DisabledSeat_DisabledEconomyId",
                table: "DisabledSeat");

            migrationBuilder.DropIndex(
                name: "IX_DisabledSeat_DisabledFirstId",
                table: "DisabledSeat");

            migrationBuilder.DropColumn(
                name: "RemovedBusinessId",
                table: "RemovedSeat");

            migrationBuilder.DropColumn(
                name: "RemovedEconomyId",
                table: "RemovedSeat");

            migrationBuilder.DropColumn(
                name: "RemovedFirstId",
                table: "RemovedSeat");

            migrationBuilder.DropColumn(
                name: "DisabledBusinessId",
                table: "DisabledSeat");

            migrationBuilder.DropColumn(
                name: "DisabledEconomyId",
                table: "DisabledSeat");

            migrationBuilder.DropColumn(
                name: "DisabledFirstId",
                table: "DisabledSeat");

            migrationBuilder.DropColumn(
                name: "BusinessCols",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "BusinessRows",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "EconomyCols",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "EconomyRows",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "FirstCols",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "FirstRows",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Airplane");

            migrationBuilder.AddColumn<int>(
                name: "AirplaneId",
                table: "RemovedSeat",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AirplaneId",
                table: "DisabledSeat",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Columns",
                table: "Airplane",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rows",
                table: "Airplane",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "86cc1c17-ec55-44bd-8163-19e038d75c04", "1de5909a-1a4e-464e-be7c-00711a54839c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "62c5bb2f-86db-4ae0-8129-c323b01c3e58", "ce1ff81a-db30-485b-bea7-dcc90d576ef4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "62d89de7-64ef-4fee-9193-5c0dd319cd34", "ef2bfc12-cca3-4c88-844a-361edf24d8a5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "040ba1c0-bb53-4f21-92c9-339bf6dc53a2", "a4cc89bc-6e91-41b7-be2a-e5414872509e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "d819affe-254e-46c5-92ea-7b8cb384d40f", "420e909e-0a02-4651-85ca-174b7c2c29eb" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "579c7a75-7913-47fa-acff-1da61c6ca052", "ae05b9be-8ce5-4a72-89fc-19d8b5719b48" });

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_AirplaneId",
                table: "RemovedSeat",
                column: "AirplaneId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_AirplaneId",
                table: "DisabledSeat",
                column: "AirplaneId");

            migrationBuilder.AddForeignKey(
                name: "FK_DisabledSeat_Airplane_AirplaneId",
                table: "DisabledSeat",
                column: "AirplaneId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RemovedSeat_Airplane_AirplaneId",
                table: "RemovedSeat",
                column: "AirplaneId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DisabledSeat_Airplane_AirplaneId",
                table: "DisabledSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_RemovedSeat_Airplane_AirplaneId",
                table: "RemovedSeat");

            migrationBuilder.DropIndex(
                name: "IX_RemovedSeat_AirplaneId",
                table: "RemovedSeat");

            migrationBuilder.DropIndex(
                name: "IX_DisabledSeat_AirplaneId",
                table: "DisabledSeat");

            migrationBuilder.DropColumn(
                name: "AirplaneId",
                table: "RemovedSeat");

            migrationBuilder.DropColumn(
                name: "AirplaneId",
                table: "DisabledSeat");

            migrationBuilder.DropColumn(
                name: "Columns",
                table: "Airplane");

            migrationBuilder.DropColumn(
                name: "Rows",
                table: "Airplane");

            migrationBuilder.AddColumn<int>(
                name: "RemovedBusinessId",
                table: "RemovedSeat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RemovedEconomyId",
                table: "RemovedSeat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RemovedFirstId",
                table: "RemovedSeat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DisabledBusinessId",
                table: "DisabledSeat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DisabledEconomyId",
                table: "DisabledSeat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DisabledFirstId",
                table: "DisabledSeat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BusinessCols",
                table: "Airplane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BusinessRows",
                table: "Airplane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EconomyCols",
                table: "Airplane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EconomyRows",
                table: "Airplane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstCols",
                table: "Airplane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstRows",
                table: "Airplane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Airplane",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e9a1807c-0687-46ac-8c44-600abcc1b82f", "4d6b6890-b5a7-4aa5-85ee-f034493465f5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "9915c453-7c3d-4a14-92c9-0255dc2d888f", "792a2e5e-d68a-43fd-8068-4971d58c9011" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "259be683-474a-48c4-8761-291fdb2eda17", "9e864973-1910-47d3-9a18-27663f0f6a82" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "80fb951a-7aed-4620-a524-19a2283ea394", "a698bd94-2fcd-4d16-983b-6837880ad4e9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4b839c7c-3fe6-4fe5-93b8-e22b53710466", "05b034c0-3cf2-4d81-906f-3f0ed3ece11e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "96db0bf2-1080-453c-aab0-268f7dc4f218", "628f5f5e-d250-46b6-8c26-00b74f7b091c" });

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_RemovedBusinessId",
                table: "RemovedSeat",
                column: "RemovedBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_RemovedEconomyId",
                table: "RemovedSeat",
                column: "RemovedEconomyId");

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_RemovedFirstId",
                table: "RemovedSeat",
                column: "RemovedFirstId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_DisabledBusinessId",
                table: "DisabledSeat",
                column: "DisabledBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_DisabledEconomyId",
                table: "DisabledSeat",
                column: "DisabledEconomyId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_DisabledFirstId",
                table: "DisabledSeat",
                column: "DisabledFirstId");

            migrationBuilder.AddForeignKey(
                name: "FK_DisabledSeat_Airplane_DisabledBusinessId",
                table: "DisabledSeat",
                column: "DisabledBusinessId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DisabledSeat_Airplane_DisabledEconomyId",
                table: "DisabledSeat",
                column: "DisabledEconomyId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DisabledSeat_Airplane_DisabledFirstId",
                table: "DisabledSeat",
                column: "DisabledFirstId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RemovedSeat_Airplane_RemovedBusinessId",
                table: "RemovedSeat",
                column: "RemovedBusinessId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RemovedSeat_Airplane_RemovedEconomyId",
                table: "RemovedSeat",
                column: "RemovedEconomyId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RemovedSeat_Airplane_RemovedFirstId",
                table: "RemovedSeat",
                column: "RemovedFirstId",
                principalTable: "Airplane",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedExtrasAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaidExtras_FastFlight_FastFlightId",
                table: "PaidExtras");

            migrationBuilder.DropForeignKey(
                name: "FK_PaidExtras_Tickets_TicketId",
                table: "PaidExtras");

            migrationBuilder.DropIndex(
                name: "IX_PaidExtras_FastFlightId",
                table: "PaidExtras");

            migrationBuilder.DropIndex(
                name: "IX_PaidExtras_TicketId",
                table: "PaidExtras");

            migrationBuilder.DropColumn(
                name: "FastFlightId",
                table: "PaidExtras");

            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "PaidExtras");

            migrationBuilder.CreateTable(
                name: "FastFlightPaidExtras",
                columns: table => new
                {
                    FastFlightId = table.Column<int>(nullable: false),
                    PaidExtraId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FastFlightPaidExtras", x => new { x.FastFlightId, x.PaidExtraId });
                    table.ForeignKey(
                        name: "FK_FastFlightPaidExtras_FastFlight_FastFlightId",
                        column: x => x.FastFlightId,
                        principalTable: "FastFlight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FastFlightPaidExtras_PaidExtras_PaidExtraId",
                        column: x => x.PaidExtraId,
                        principalTable: "PaidExtras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TicketPaidExtras",
                columns: table => new
                {
                    TicketId = table.Column<int>(nullable: false),
                    PaidExtraId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketPaidExtras", x => new { x.TicketId, x.PaidExtraId });
                    table.ForeignKey(
                        name: "FK_TicketPaidExtras_PaidExtras_PaidExtraId",
                        column: x => x.PaidExtraId,
                        principalTable: "PaidExtras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketPaidExtras_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FastFlightPaidExtras_PaidExtraId",
                table: "FastFlightPaidExtras",
                column: "PaidExtraId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketPaidExtras_PaidExtraId",
                table: "TicketPaidExtras",
                column: "PaidExtraId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FastFlightPaidExtras");

            migrationBuilder.DropTable(
                name: "TicketPaidExtras");

            migrationBuilder.AddColumn<int>(
                name: "FastFlightId",
                table: "PaidExtras",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TicketId",
                table: "PaidExtras",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PaidExtras_FastFlightId",
                table: "PaidExtras",
                column: "FastFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_PaidExtras_TicketId",
                table: "PaidExtras",
                column: "TicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaidExtras_FastFlight_FastFlightId",
                table: "PaidExtras",
                column: "FastFlightId",
                principalTable: "FastFlight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaidExtras_Tickets_TicketId",
                table: "PaidExtras",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

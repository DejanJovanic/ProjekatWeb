using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class friendRequestsCascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PendingRequest_RegisteredUsers_Username",
                table: "PendingRequest");

            migrationBuilder.DropIndex(
                name: "IX_PendingRequest_Username",
                table: "PendingRequest");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "PendingRequest");

            migrationBuilder.AddColumn<string>(
                name: "SendingUserUsername",
                table: "PendingRequest",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PendingRequest_SendingUserUsername",
                table: "PendingRequest",
                column: "SendingUserUsername");

            migrationBuilder.AddForeignKey(
                name: "FK_PendingRequest_RegisteredUsers_SendingUserUsername",
                table: "PendingRequest",
                column: "SendingUserUsername",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PendingRequest_RegisteredUsers_SendingUserUsername",
                table: "PendingRequest");

            migrationBuilder.DropIndex(
                name: "IX_PendingRequest_SendingUserUsername",
                table: "PendingRequest");

            migrationBuilder.DropColumn(
                name: "SendingUserUsername",
                table: "PendingRequest");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "PendingRequest",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PendingRequest_Username",
                table: "PendingRequest",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_PendingRequest_RegisteredUsers_Username",
                table: "PendingRequest",
                column: "Username",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

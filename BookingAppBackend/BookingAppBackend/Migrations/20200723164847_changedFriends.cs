using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedFriends : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "Friend",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FriendUsername = table.Column<string>(nullable: true),
                    FriendName = table.Column<string>(nullable: true),
                    FriendLastName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friend", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Friend_RegisteredUsers_Username",
                        column: x => x.Username,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PendingRequest",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestSenderUsername = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PendingRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PendingRequest_RegisteredUsers_Username",
                        column: x => x.Username,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friend_Username",
                table: "Friend",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_PendingRequest_Username",
                table: "PendingRequest",
                column: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friend");

            migrationBuilder.DropTable(
                name: "PendingRequest");

            migrationBuilder.AddColumn<string>(
                name: "ParentId",
                table: "RegisteredUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username1",
                table: "RegisteredUsers",
                type: "nvarchar(450)",
                nullable: true);

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
    }
}

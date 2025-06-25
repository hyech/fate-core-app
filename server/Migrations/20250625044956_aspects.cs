using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class aspects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Aspects",
                newName: "text");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Aspects",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "text",
                table: "Aspects",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<float[]>(
                name: "position",
                table: "Aspects",
                type: "real[]",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "position",
                table: "Aspects");

            migrationBuilder.RenameColumn(
                name: "text",
                table: "Aspects",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Aspects",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "Aspects",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangementEnAnglais : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "Users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "MotDePasse",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ModePrive",
                table: "Users",
                newName: "PrivateMode");

            migrationBuilder.RenameColumn(
                name: "Ville",
                table: "Cafes",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "StatutFav",
                table: "Cafes",
                newName: "FavStatus");

            migrationBuilder.RenameColumn(
                name: "Pays",
                table: "Cafes",
                newName: "CreationDate");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "Cafes",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "DateCreation",
                table: "Cafes",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "Commentaire",
                table: "Cafes",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "Adresse",
                table: "Cafes",
                newName: "Adress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PrivateMode",
                table: "Users",
                newName: "ModePrive");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "Nom");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "MotDePasse");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cafes",
                newName: "Ville");

            migrationBuilder.RenameColumn(
                name: "FavStatus",
                table: "Cafes",
                newName: "StatutFav");

            migrationBuilder.RenameColumn(
                name: "CreationDate",
                table: "Cafes",
                newName: "Pays");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "Cafes",
                newName: "Nom");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Cafes",
                newName: "Commentaire");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Cafes",
                newName: "DateCreation");

            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "Cafes",
                newName: "Adresse");
        }
    }
}

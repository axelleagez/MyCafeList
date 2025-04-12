//création du builder de l'app web et ajout du support des contrôleurs API
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

//configuration CORS pour accepter les requetes du front
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

//génération du swagger et ajout du DataContext
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>();

//création de l'application
var app = builder.Build();

//activation du CORS
app.UseCors("AllowAll");

//initialisation de la bdd
//SeedData.Init();

//activation du swagger si on est en environnement de développement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

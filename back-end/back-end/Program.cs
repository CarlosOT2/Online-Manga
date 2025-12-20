
using back_end.Data;
using back_end.Shared.Cache;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //# Services
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //? DB
            builder.Services.AddDbContext<AppDbContext>(options =>
               options.UseNpgsql(
                   builder.Configuration.GetConnectionString("Default"),
                   o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
               )
            );

            //? Dependency Injection
            builder.Services.AddScoped<Database.DbAccess.Interfaces.ITitle, Database.DbAccess.Title>();
            builder.Services.AddScoped<Database.DbAccess.Interfaces.IStatic, Database.DbAccess.Static>();
            builder.Services.Configure<CacheSettings>( builder.Configuration.GetSection("CacheSettings"));

            builder.Services.AddSingleton<CacheHandler>();
            builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect("redis:6379"));


            //? Cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("front-end",
                    builder => builder
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            //# App
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("front-end");
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}

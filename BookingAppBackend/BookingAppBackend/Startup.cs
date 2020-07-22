using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Repository;
using BookingAppBackend.Model;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.Airline;
using BookingAppBackend.Service.AirlineAdmin;
using BookingAppBackend.Service.AirlineReservation;
using BookingAppBackend.Service.Airplane;
using BookingAppBackend.Service.AuthentificationAndAuthorization;
using BookingAppBackend.Service.Flight;
using BookingAppBackend.Service.FriendRequests;
using BookingAppBackend.Service.Friends;
using BookingAppBackend.Service.GeneralUser;
using BookingAppBackend.Service.Seat;
using BookingAppBackend.Service.User;
using BookingAppBackend.Utils.EMailSender;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace BookingAppBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));
            services.AddControllers();
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContext<BookingAppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("BookingServiceConnection")));

            services.AddDefaultIdentity<AuthentificationUser>().AddRoles<AuthorizationRole>()
                .AddEntityFrameworkStores<BookingAppDbContext>();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
            }
           );

            services.AddCors();

            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());

           
            services.AddAuthentication(x =>
            {
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddAuthorization(config =>
            {
                config.AddPolicy(Policies.AirlineAdmin, Policies.AirlineAdminPolicy());
                config.AddPolicy(Policies.User, Policies.UserPolicy());
            });

            //DI services
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IFriendRequestService, FriendRequestService>();
            services.AddScoped<IGeneralUserService, GeneralUserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAirlineAdminRepository, AirlineAdminRepository>();
            services.AddScoped<IAirlineReservationRepository, AirlineReservationRepository>();
            services.AddScoped<IAirlineRepository, AirlineRepository>();
            services.AddScoped<IAirplaneRepository, AirplaneRepository>();
            services.AddScoped<IFlightRepository, FlightRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAirlineService, AirlineService>();
            services.AddScoped<IAirplaneService, AirplaneService>();
            services.AddScoped<IAirlineAdminService, AirlineAdminService>();   
            services.AddScoped<IFlightService, FlightService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFriendsService, FriendsService>();
            services.AddScoped<ISeatService, SeatService>();
            services.AddScoped<IAirlineReservationService, AirlineReservationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,IServiceProvider provider)
        {
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
          
            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => {
                builder.WithOrigins("http://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
            });

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            ///app.UseMvc();
            //var provider = app.ApplicationServices.GetService<IServiceProvider>();
            CreateRoles(provider);
        }

        public void CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<AuthorizationRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<AuthentificationUser>>();
            Task<IdentityResult> roleResult;
            string email = "admin@admin.com";
            string[] roles = { "Admin", "AirlineAdmin", "User" };
            //Check that there is an Administrator role and create if not

            foreach(var a in roles)
            {
                Task<bool> hasAdminRole = roleManager.RoleExistsAsync(a);
                hasAdminRole.Wait();

                if (!hasAdminRole.Result)
                {
                    roleResult = roleManager.CreateAsync(new AuthorizationRole(a));
                    roleResult.Wait();
                }
            }
           

            //Check if the admin user exists and create it if not
            //Add to the Administrator role

            Task<AuthentificationUser> testUser = userManager.FindByEmailAsync(email);
            testUser.Wait();

            if (testUser.Result == null)
            {
                var admin = new AuthentificationUser();
                admin.Email = email;
                admin.UserName = "Admin";

                Task<IdentityResult> newUser = userManager.CreateAsync(admin, "Admin@123");
                newUser.Wait();

                if (newUser.Result.Succeeded)
                {
                    Task<IdentityResult> newUserRole = userManager.AddToRoleAsync(admin, "Admin");
                    newUserRole.Wait();
                }
            }
        }
    }
}

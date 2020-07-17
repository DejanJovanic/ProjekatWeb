using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Policy;
using System.Threading.Tasks;
using MailKit.Net.Smtp;

namespace BookingAppBackend.Service.User
{
    public class UserService : IUserService
    {
        private IUserRepository repo;
        private IUnitOfWork unitOfWork;
        private UserManager<AuthentificationUser> manager;

        public UserService(IUserRepository repo, IUnitOfWork unitOfWork, UserManager<AuthentificationUser> manager)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
            this.manager = manager;
        }

        public async Task<IEnumerable<BookingAppBackend.Model.Users.User>> Search(UserSearchParams param)
        {
            return await repo.Search(param);
        }

        public async Task<UserResponse> Add(UserAddEdit data,IUrlHelper urlHelper)
        {
            var temp1 = new AuthentificationUser();
            var temp2 = new BookingAppBackend.Model.Users.User();
            temp1.UserName = data.Username;
            temp2.Username = data.Username;
            temp2.Name = data.Name;
            temp2.LastName = data.LastName;
            temp1.Email = data.Email;
            temp2.IsEnabled = false;
            if (!string.IsNullOrWhiteSpace(data.City))
                temp2.City = data.City;
            if (!string.IsNullOrWhiteSpace(data.PhoneNumber))
                temp2.PhoneNumber = data.PhoneNumber;
            if(await manager.FindByNameAsync(data.Username) == null)
            {
                var isOk = await manager.CreateAsync(temp1, data.Password);
                if (isOk.Succeeded)
                {
                    isOk = await manager.SetEmailAsync(temp1, data.Email);
                    if (isOk.Succeeded)
                    {
                        var roleOk = await manager.AddToRoleAsync(temp1, "User");
                        if (roleOk.Succeeded)
                        {
                            ////Deo za slanje konfirmacionog mail-a korisniku
                            string token = await manager.GenerateEmailConfirmationTokenAsync(temp1);

                            //string link = urlHelper.Action("ConfirmEmail", "VerifyAccount", new { username = data.Username, token = token },
                            //    protocol: urlHelper.ActionContext.HttpContext.Request.Scheme);

                            //MimeMessage message = new MimeMessage();

                            //MailboxAddress to = new MailboxAddress("User", data.Email);
                            //MailboxAddress from = new MailboxAddress("BookingAppTeam", "deki.jovanic@gmail.com");
                            //message.Subject = "Account Verification";
                            //message.From.Add(from);
                            //message.To.Add(to);
                            //var body = new BodyBuilder();
                            //body.HtmlBody = $@"<p>To verify your account, please follow the link: {link} </p>";
                            //body.TextBody = $"To verify your account, please follow the link: {link} ";
                            //message.Body = body.ToMessageBody();

                            //using (var client = new MailKit.Net.Smtp.SmtpClient())
                            //{
                            //    client.Connect("smtp.gmail.com", 465);
                            //    client.Authenticate("bookingappweb2@gmail.com", "bookingapp123");
                            //    client.Send(message);
                            //    client.Disconnect(true);
                            //}
                            await manager.ConfirmEmailAsync(temp1, token);
                            try
                            {
                                var a = await repo.InsertUser(temp2);
                                if (a.Success)
                                    await unitOfWork.CompleteAsync();

                                return a;

                            }
                            catch
                            {
                                return new UserResponse("Something went wrong.");
                            }
                        }
                        else
                        {
                            return new UserResponse(roleOk.Errors.First().Description);
                        }
                      
                    }
                    else
                    {
                        return new UserResponse(isOk.Errors.First().Description);
                    }

                }
                else
                {
                    return new UserResponse(isOk.Errors.First().Description);
                }
            }
            else
            {
                return new UserResponse("User with given username already exists.");
            }
        }

        public async Task<UserResponse> EnableUser(string username)
        {
            var temp = await repo.EnableUser(username);
            if (temp.Success)
                await unitOfWork.CompleteAsync();

            return temp;
        }
      
    }
}

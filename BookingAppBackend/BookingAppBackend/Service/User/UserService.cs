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
using BookingAppBackend.Utils.EMailSender;

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

        public async Task<UserResponse> Edit(UserEdit details, string username)
        {
            var temp = await repo.EditUser(details, username);
            if (temp.Success)
                await unitOfWork.CompleteAsync();

            return temp;
        }

        public async Task<UserResponse> Add(UserAdd data,IUrlHelper urlHelper)
        {
            var temp1 = new AuthentificationUser();
            temp1.IsPasswordOk = true;
            var temp2 = new BookingAppBackend.Model.Users.User();
            temp1.UserName = data.Username;
            temp2.Username = data.Username;
            temp2.Name = data.Name;
            temp2.LastName = data.LastName;
            temp1.Email = data.Email;
            temp2.IsEnabled = false;
            temp1.IsPasswordOk = true;
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

                            //var sender = new EmailSender();
                            //sender.SendConfirmEMail(data.Email, token, data.Username);
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

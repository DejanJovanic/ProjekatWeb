using BookingAppBackend.Model;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace BookingAppBackend.Utils.EMailSender
{
    public class EmailSender
    {

        public EmailSender()
        {
          
        }
        public void SendResetPasswordMail(string email,string token, string username)
        {
            string link = "http://localhost:4000/PasswordReset/" + token + "/" + username;

            MimeMessage message = new MimeMessage();

            MailboxAddress to = new MailboxAddress("User", email);
            MailboxAddress from = new MailboxAddress("BookingAppTeam", "bookingappweb2@gmail.com");
            message.Subject = "Account Verification";
            message.From.Add(from);
            message.To.Add(to);
            var body = new BodyBuilder();
            body.HtmlBody = $@"<p>To change your account's password, please follow the link: {link} </p>";
            body.TextBody = $"To change your account's password, please follow the link: {link} ";
            message.Body = body.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect("smtp.gmail.com", 465);
                client.Authenticate("bookingappweb2@gmail.com", "bookingapp123");
                client.Send(message);
                client.Disconnect(true);
            }

        }

        public void SendConfirmEMail(string email,string token, string username)
        {
            string link = "http://localhost:4000/EMailVerification/" + token + "/" + username;

            MimeMessage message = new MimeMessage();

            MailboxAddress to = new MailboxAddress("User", email);
            MailboxAddress from = new MailboxAddress("BookingAppTeam", "bookingappweb2@gmail.com");
            message.Subject = "Account Verification";
            message.From.Add(from);
            message.To.Add(to);
            var body = new BodyBuilder();
            body.HtmlBody = $@"<p>To verify your account, please follow the link: {link} </p>";
            body.TextBody = $"To verify your account, please follow the link: {link} ";
            message.Body = body.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect("smtp.gmail.com", 465);
                client.Authenticate("bookingappweb2@gmail.com", "bookingapp123");
                client.Send(message);
                client.Disconnect(true);
            }

        }

    }
}

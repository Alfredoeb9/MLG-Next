import nodemailer from "nodemailer";
import { createEmailTemplate } from "../../services/templateService";
import { Options } from "nodemailer/lib/mailer";

const SMTPConfig = {
    service: "gmail",
    EMAIL: "alfredoeb96@gmail.com",
    PASSWORD: process.env.EMAIL_PWD, // Here Password is master key from smtp
    PORT: 587,
    FROM_EMAIL: "alfredoeb96@gmail.com",
};
  
  const transporter = nodemailer.createTransport({
    secure: false,
    service: SMTPConfig.service,
    auth: {
      user: SMTPConfig.EMAIL,
      pass: SMTPConfig.PASSWORD,
    },
});

const sendEmail = async (mailOptions: Options) => {
    transporter.verify(async (error) => {
      if (error) throw Error("Something went wrong");
    });
    const emailResponse = await transporter.sendMail(mailOptions);
    if (!emailResponse.messageId) return { error: "Sent Went Wrong" };
    return { result: "Email sent successfully" };
};

export async function sentVerifyUserEmail (toEmail: any, fullName: string, url: string) {
    const content = `We're excited to have you get started. Please verify you email by clicking on the link below.`;
    const title = "Welcome!";
    const button = "Verify Email";
    const subTxt = "";
    const mainLink = url;

    const html = await createEmailTemplate("forgotPassword.html", {
      fullName,
      content,
      title,
      button,
      subTxt,
      mainLink,
    });

    const mailOptions = {
      from: SMTPConfig.FROM_EMAIL,
      to: toEmail,
      text: "This is a test string",
      subject: "Verify your email for Major League Gaming!",
      html: html
    };

    // try {
    //   await transporter.sendMail({
    //     ...mailOptions,
    //     subject: "verify-email",
    //     text: "This is a test string",
    //     html: "<h1>Test Title</h1><p>Some body text</p>"
    //   })
    // }

    const sendEmailResponse = await sendEmail(mailOptions);
    if (!sendEmailResponse) throw Error("Email Not Sent");

    return sendEmailResponse;
}
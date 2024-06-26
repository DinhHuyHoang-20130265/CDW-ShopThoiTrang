package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import jakarta.mail.internet.MimeMessage;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger Log = Logger.getLogger(EmailService.class.getName());
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendResetPasswordEmail(String to, String otp, String subject) {
        try {
            String body = "Your OTP is: " + otp;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            Log.info("Sending OTP to email: " + to);
            javaMailSender.send(message);
        } catch (MailException e) {
            Log.error("Error in sendResetPasswordEmail: ", e);
            throw new RuntimeException(e);
        }
    }

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            javaMailSender.send(message);
            Log.info("Email sent to: " + to);
        } catch (MailException e) {
            Log.error("Error in sendEmail: ", e);
            throw new RuntimeException(e);
        }
    }

    public void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            javaMailSender.send(message);
            Log.info("HTML Email sent to: " + to);
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            Log.error("Error in sendHtmlEmail: ", e);
            throw new RuntimeException(e);
        }
    }
}
package ar.org.pescar.security.service;

import ar.org.pescar.security.event.UserRegistrationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailVerificationListener implements ApplicationListener<UserRegistrationEvent> {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${ui.link}")
    private String link;
    private final JavaMailSender mailSender;
    private final VerificationService verificationService;

    @Autowired
    public EmailVerificationListener(JavaMailSender mailSender, VerificationService verificationService) {
        this.mailSender = mailSender;
        this.verificationService = verificationService;
    }

    @Override
    @Async
    public void onApplicationEvent(UserRegistrationEvent event) {
        String username = event.getUser().getUsername();
        LOGGER.info(String.format("Sending email confirmation for username: %s", username));
        String verificationId = verificationService.createVerification(username, "Register");
        String email = event.getUser().getEmail();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Pescar confirmación de registro");
        message.setText(String.format("Código de activación: %s/activate/%s", link, verificationId));
        message.setTo(email);
        mailSender.send(message);
    }

}

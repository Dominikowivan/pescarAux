package ar.org.pescar.security.service;

import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.event.UserForgotPasswordEvent;
import ar.org.pescar.security.repositories.UserDAO;
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
public class EmailForgotPasswordListener implements ApplicationListener<UserForgotPasswordEvent> {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${ui.link}")
    private String link;
    private final JavaMailSender mailSender;
    private final VerificationService verificationService;
    private final UserDAO userRepository;

    @Autowired
    public EmailForgotPasswordListener(JavaMailSender mailSender, VerificationService verificationService, UserDAO userRepository) {
        this.mailSender = mailSender;
        this.verificationService = verificationService;
        this.userRepository = userRepository;
    }

    @Override
    @Async
    public void onApplicationEvent(UserForgotPasswordEvent event){
        String email = event.getEmail();
        User user = userRepository.findByEmail(email.toLowerCase());
        if (user == null){
            LOGGER.error(String.format("There is no user with the email '%s'",email));
        }else {
            String username = user.getUsername();
            if (user.getEnabled().equals(false)){
                LOGGER.error(String.format("The email passed is register under a user which has not finished its registration process (%s).",username));
            }else {
                LOGGER.info(String.format("Sending forget password email confirmation for username: %s", username));
                String verificationId = verificationService.createVerification(username, "ForgotPassword");
                SimpleMailMessage message = new SimpleMailMessage();
                message.setSubject("Pescar confirmación // Cambio de contraseña");
                message.setText(
                        String.format("Usuario: %s%nLink para cambio de contraseña: %s/change/password/%s/%s%n%nEn caso de no necesitar el cambio de contraseña favor de ignorar este email.",
                                username, link, username, verificationId));
                message.setTo(email);
                mailSender.send(message);
            }
        }
    }

}

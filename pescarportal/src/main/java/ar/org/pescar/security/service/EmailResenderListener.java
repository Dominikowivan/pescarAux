package ar.org.pescar.security.service;

import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.event.userRegistrationResenderEvent;
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
public class EmailResenderListener implements ApplicationListener<userRegistrationResenderEvent> {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${ui.link}")
    private String link;
    private final JavaMailSender mailSender;
    private final VerificationService verificationService;
    private final UserDAO userRepository;

    @Autowired
    public EmailResenderListener(JavaMailSender mailSender, VerificationService verificationService, UserDAO userRepository) {
        this.mailSender = mailSender;
        this.verificationService = verificationService;
        this.userRepository = userRepository;
    }

    @Override
    @Async
    public void onApplicationEvent(userRegistrationResenderEvent event) {
        String username = event.getUsername();
        LOGGER.info(String.format("Re-sending email confirmation for username: %s", username));

        try {
            //replace the actual verification code
            String verificationId = verificationService.changeVerificationId(username, "Register");
            //Get user's data
            User user = userRepository.findByUsername(username);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("Pescar confirmación de registro");
            message.setText(String.format("Código de activación: %s/activate/%s", link, verificationId));
            message.setTo(user.getEmail());
            mailSender.send(message);
        }catch (RuntimeException e){
            LOGGER.info(e.getMessage());
        }
    }
}
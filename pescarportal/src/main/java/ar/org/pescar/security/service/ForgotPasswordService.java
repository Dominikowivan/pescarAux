package ar.org.pescar.security.service;

import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.repositories.UserDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private final VerificationService verificationService;
    private final UserDAO repository;
    private final RegistrationService registrationService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ForgotPasswordService(VerificationService verificationService, UserDAO repository, RegistrationService registrationService, PasswordEncoder passwordEncoder) {
        this.verificationService = verificationService;
        this.repository = repository;
        this.registrationService = registrationService;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean checkCode(String code, String username) {
        return verificationService.existsByCodeAndUsername(code,username,"ForgotPassword");
    }

    public void changePassword(String password, String username) throws PasswordNotCompliant, UsernameNotFoundException {
        User user = repository.findByUsername(username);
        if (user != null){
            if (registrationService.checkPasswordComplexity(password)) {
                user.setPassword(passwordEncoder.encode(password));
                repository.save(user);
            }else{
                throw new PasswordNotCompliant("The password does not comply with the minimum requirements");
            }
        }else{
            throw new UsernameNotFoundException(String.format("The username %s couldn't be found.",username));
        }
    }
}

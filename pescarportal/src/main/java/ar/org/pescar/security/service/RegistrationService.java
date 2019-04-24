package ar.org.pescar.security.service;

import ar.org.pescar.security.data.RegisterUser;
import ar.org.pescar.security.entity.Authority;
import ar.org.pescar.security.entity.AuthorityName;
import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.repositories.UserDAO;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import org.passay.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class RegistrationService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${minimum_complexity_rules}")
    private Integer MINIMUM_COMPLEXITY_RESULTS;
    @Value("${minimum_uppercase}")
    private Integer MINIMUM_UPPERCASE;
    @Value("${minimum_lowercase}")
    private Integer MINIMUM_LOWERCASE;
    @Value("${minimum_length}")
    private Integer MINIMUM_LENGTH;
    @Value("${maximum_length}")
    private Integer MAXIMUM_LENGTH;

    private final PasswordEncoder passwordEncoder;
    private final UserDAO userDAO;
    private final Clock clock = DefaultClock.INSTANCE;

    @Autowired
    public RegistrationService(PasswordEncoder passwordEncoder, UserDAO userDAO) {
        this.passwordEncoder = passwordEncoder;
        this.userDAO = userDAO;
    }

    public User registerUser(RegisterUser registerUser) throws PasswordNotCompliant {
        //Encode the passed password
        if (checkPasswordComplexity(registerUser.getPassword())) {
            registerUser.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        }else{
            throw new PasswordNotCompliant("The password does not comply with the minimum requirements");
        }

        User user = new User(registerUser);
        user.setEnabled(false);
        user.setLastPasswordResetDate(clock.now());

        //TODO Create Service to check the requested authority
        Authority authorityAdmin = new Authority();
        authorityAdmin.setId(2L);
        authorityAdmin.setName(AuthorityName.ROLE_ADMIN);
        Authority authorityUser = new Authority();
        authorityUser.setId(1L);
        authorityUser.setName(AuthorityName.ROLE_USER);
        user.setAuthorities(Arrays.asList(authorityAdmin,authorityUser));
        User save = userDAO.save(user);

        return save;
    }

    public boolean checkPasswordComplexity(String password) {
        List<Rule> passwordRules = new ArrayList<>();
        passwordRules.add(new LengthRule(MINIMUM_LENGTH, MAXIMUM_LENGTH));
        CharacterCharacteristicsRule passwordChars = new CharacterCharacteristicsRule(MINIMUM_COMPLEXITY_RESULTS,
                new CharacterRule(EnglishCharacterData.UpperCase,MINIMUM_UPPERCASE),
                new CharacterRule(EnglishCharacterData.LowerCase,MINIMUM_LOWERCASE));
        passwordRules.add(passwordChars);
        PasswordValidator passwordValidator = new PasswordValidator(passwordRules);
        PasswordData passwordData = new PasswordData(password);
        RuleResult ruleResult = passwordValidator.validate(passwordData);
        return ruleResult.isValid();
    }
}

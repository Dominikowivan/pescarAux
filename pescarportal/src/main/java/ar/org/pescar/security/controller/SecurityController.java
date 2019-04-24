package ar.org.pescar.security.controller;

import ar.org.pescar.security.data.ChangePasswordRequest;
import ar.org.pescar.security.data.JwtUser;
import ar.org.pescar.security.data.RegisterUser;
import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.event.UserForgotPasswordEvent;
import ar.org.pescar.security.event.UserRegistrationEvent;
import ar.org.pescar.security.event.userRegistrationResenderEvent;
import ar.org.pescar.security.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class SecurityController {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${jwt.header}")
    private String tokenHeader;
    @Autowired
    @Qualifier("jwtUserDetailsService")
    private UserDetailsService userDetailsService;

    private final JwtTokenUtil jwtTokenUtil;
    private final ApplicationEventPublisher eventPublisher;
    private final RegistrationService registrationService;
    private final ForgotPasswordService forgotPasswordService;

    @Autowired
    public SecurityController(JwtTokenUtil jwtTokenUtil, ApplicationEventPublisher eventPublisher, RegistrationService registrationService, ForgotPasswordService forgotPasswordService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.eventPublisher = eventPublisher;
        this.registrationService = registrationService;
        this.forgotPasswordService = forgotPasswordService;
    }

    @GetMapping("/user")
    public JwtUser getAuthenticatedUser(HttpServletRequest request) {
        //Get token by cutting the 'Bearer ' part
        String token = request.getHeader(tokenHeader).substring(7);
        LOGGER.info(String.format("Getting username of the token: %s",token));
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);
        return user;
    }

    //Example of Role filter on an endpoint, the role needs to have the "ROLE_" prefix.
    @GetMapping("/protected")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getProtectedGreeting() {
        LOGGER.info("Greetings from admin.");
        return ResponseEntity.ok("Greetings from admin protected method!");
    }

    @GetMapping("/nonProtected")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getNormalGreeting() {
        LOGGER.info("Greetings from user.");
        return ResponseEntity.ok("Greetings from user method!");
    }

    @PostMapping("/register")
    public ResponseEntity registerUser (@RequestBody RegisterUser registerUser){
        LOGGER.info(String.format("Registering user: %s",registerUser));
        User user = null;
        try {
            user = registrationService.registerUser(registerUser);
        } catch (PasswordNotCompliant passwordNotCompliant) {
            return new ResponseEntity<>(passwordNotCompliant.getMessage(),HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e){
            return new ResponseEntity<>("Error persisting user.",HttpStatus.NOT_ACCEPTABLE);
        }
        eventPublisher.publishEvent(new UserRegistrationEvent(user));
        return new ResponseEntity<>(JwtUserFactory.create(user),HttpStatus.OK);
    }

    @GetMapping("/register/resend")
    public ResponseEntity resendEmail(@RequestParam String username){
        eventPublisher.publishEvent(new userRegistrationResenderEvent(username));
        return new ResponseEntity<>("Trigger resend event successfully", HttpStatus.OK);
    }

    @GetMapping("/forgot/password")
    public ResponseEntity forgotPasswordRequest(@RequestParam String email){
        eventPublisher.publishEvent(new UserForgotPasswordEvent(email));
        return new ResponseEntity<>("Trigger forgot password event successfully", HttpStatus.OK);
    }

    @GetMapping("/forgot/password/code")
    public ResponseEntity forgotPasswordCheckCode(@RequestParam String code, @RequestParam String username){
        if (forgotPasswordService.checkCode(code, username)){
            return new ResponseEntity<>("Code is valid",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Code is not valid",HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/forgot/password/change")
    public ResponseEntity forgotPasswordChange(@RequestBody ChangePasswordRequest request) {
        if (forgotPasswordService.checkCode(request.getCode(), request.getUsername())) {
            try {
                forgotPasswordService.changePassword(request.getPassword(),request.getUsername());
            } catch (PasswordNotCompliant passwordNotCompliant) {
                return new ResponseEntity<>(passwordNotCompliant.getMessage(),HttpStatus.NOT_ACCEPTABLE);
            }
        }else {
            return new ResponseEntity<>("Code is not valid",HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(String.format("The password for %s has been changed.",request.getUsername()),HttpStatus.OK);
    }


}
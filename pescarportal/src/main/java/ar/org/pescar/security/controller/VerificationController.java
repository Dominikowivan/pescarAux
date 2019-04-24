package ar.org.pescar.security.controller;

import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.repositories.UserDAO;
import ar.org.pescar.security.service.VerificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerificationController {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	private final VerificationService verificationService;
	private final UserDAO userRepository;

	@Autowired
	public VerificationController(VerificationService verificationService, UserDAO userRepository) {
		this.verificationService = verificationService;
		this.userRepository = userRepository;
	}

	@GetMapping("/verify/email")
	public ResponseEntity verifyEmail(@RequestParam String id) {
		LOGGER.info(String.format("Verifying register user with ID: %s", id));
		String username = verificationService.getUsernameForCode(id, "Register");
		if(username != null) {
			User user = userRepository.findByUsername(username);
			user.setEnabled(true);
			userRepository.save(user);
			verificationService.deleteVerificationById(id);
		}else{
			LOGGER.info("The given code is not valid.");
			return new ResponseEntity<>(String.format("The given code (%s) is not valid.",id),HttpStatus.NOT_ACCEPTABLE);
		}
		LOGGER.info(String.format("Username: %s is now activated and can be used.",username));
		return new ResponseEntity<>(String.format("Username: %s is now activated and can be used.",username), HttpStatus.OK);
	}
	
}

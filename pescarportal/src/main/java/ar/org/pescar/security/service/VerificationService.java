package ar.org.pescar.security.service;

import ar.org.pescar.security.entity.Verification;
import ar.org.pescar.security.repositories.VerificationCodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class VerificationService {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	private final VerificationCodeRepository repository;

	@Autowired
	public VerificationService(VerificationCodeRepository repository) {
		this.repository = repository;
	}

	public String getVerificationIdByUsername(String username) {
		LOGGER.info(String.format("Getting verification id from username: %s.", username));
		Verification verification = repository.findByUsername(username);
		if(verification != null) {
			return verification.getCode();
		}
		return null;
	}

	//The code returned by this method is use to authenticate
	public String createVerification(String username, String type) {
		if (!repository.existsByUsernameAndType(username,type)) {
			Verification verification = new Verification(username, type);
			verification = repository.save(verification);
			return verification.getCode();
		}
		return getVerificationIdByUsername(username);
	}

	public String getUsernameForCode(String code, String Type) {
		Verification verification = repository.findByCode(code);
		if(!(verification == null)){
			return verification.getUsername();
		}
		return null;
	}

	@Transactional
	public void deleteVerificationById(String code){
		repository.deleteByCode(code);
	}

	public String changeVerificationId(String username, String type) {
		if (repository.existsByUsernameAndType(username,type)) {
			//Get old verification and delete it
			Verification oldVerification = repository.findByUsername(username);
			repository.deleteById(oldVerification.getId());

			//Create a new verification
			Verification verification = new Verification(username, type);
			repository.save(verification);

			return verification.getCode();
		}
		LOGGER.info(String.format("%s does not have a pending registration.",username));
		throw new RuntimeException(String.format("%s does not have a pending registration.",username));
	}

	public boolean existsByCodeAndUsername(String code, String username, String type){
		return repository.existsByCodeAndUsernameAndType(code, username, type);
	}
}

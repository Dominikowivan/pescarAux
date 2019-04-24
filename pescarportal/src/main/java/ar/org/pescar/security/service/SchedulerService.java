package ar.org.pescar.security.service;

import ar.org.pescar.security.entity.Verification;
import ar.org.pescar.security.repositories.UserDAO;
import ar.org.pescar.security.repositories.VerificationCodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class SchedulerService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private final VerificationCodeRepository verificationCodeRepository;
    private final UserDAO userDAO;

    @Value("${registration_span}")
    private long REGISTRATION_SPAN;

    @Autowired
    public SchedulerService(VerificationCodeRepository verificationCodeRepository, UserDAO userDAO) {
        this.verificationCodeRepository = verificationCodeRepository;
        this.userDAO = userDAO;
    }

    @Transactional
    @Scheduled(cron = "0 0 11 * * *")
    public void deleteAllUnregisteredUsers(){
        List<Verification> verifications = verificationCodeRepository.findAll();
        Date now = new Date();
        if (verifications.isEmpty()){
            LOGGER.info("There are no pending verifications.");
        }
        for (Verification verification :
                verifications) {
            Long difference = now.getTime() - verification.getTimestamp().getTime();
            LOGGER.info(String.format("The verification for %s is pending since %s(%d ms)",
                    verification.getUsername(), verification.getTimestamp(), difference));
            if (difference >= REGISTRATION_SPAN){
                LOGGER.info(String.format("Verification and User for %s is being deleted.", verification.getUsername()));
                userDAO.deleteByUsername(verification.getUsername());
                verificationCodeRepository.deleteById(verification.getId());
            }else{
                LOGGER.info(String.format("Verification for %s is ok for another %s ms.", verification.getUsername(), REGISTRATION_SPAN-difference));
            }
        }
    }
}

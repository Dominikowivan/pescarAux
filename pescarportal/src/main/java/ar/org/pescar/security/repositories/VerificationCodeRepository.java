package ar.org.pescar.security.repositories;

import ar.org.pescar.security.entity.Verification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<Verification, Long> {
	Verification findByUsername(String username);
	boolean existsByUsernameAndType(String username, String type);
	Verification findByCode(String code);
	void deleteByCode(String code);
	boolean existsByCodeAndUsernameAndType(String code, String username, String type);
}

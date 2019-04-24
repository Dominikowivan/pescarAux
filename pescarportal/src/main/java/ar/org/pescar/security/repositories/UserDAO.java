package ar.org.pescar.security.repositories;

import ar.org.pescar.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    void deleteByUsername(String username);
    User findByEmail(String email);
}

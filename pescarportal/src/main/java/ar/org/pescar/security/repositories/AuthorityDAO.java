package ar.org.pescar.security.repositories;

import ar.org.pescar.security.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityDAO  extends JpaRepository<Authority, Integer>{
}

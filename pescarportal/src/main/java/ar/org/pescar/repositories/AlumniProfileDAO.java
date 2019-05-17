package ar.org.pescar.repositories;

import ar.org.pescar.entity.AlumniProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface AlumniProfileDAO extends JpaRepository<AlumniProfile, Integer>, QueryByExampleExecutor<AlumniProfile> {
    public AlumniProfile findByUserId(Long id);
}

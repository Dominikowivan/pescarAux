package ar.org.pescar.repositories;

import ar.org.pescar.entity.Notification;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface NotificationDAO extends JpaRepository<Notification, Long>, QueryByExampleExecutor<Notification> {
    Optional<Notification> findById(Long id);
}

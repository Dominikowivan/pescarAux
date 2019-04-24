package ar.org.pescar.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.org.pescar.entity.Notification;
import ar.org.pescar.repositories.NotificationDAO;

@Service
public class NotificationService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private NotificationDAO notificationDAO;

    @Autowired
    public NotificationService(NotificationDAO notificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    public List<Notification> getAllNotification() {
        return notificationDAO.findAll();
    }

    public Notification getNotificationById(Long id) {
        Optional<Notification> notification = notificationDAO.findById(id);
    	return notification.isPresent() ? notification.get() : null;
    }
    
    public Notification createNotification(Notification notification) {
    	return notificationDAO.save(notification);
    }
    
    public Notification updateNotification(Notification notification) {
    	return notificationDAO.save(notification);
    }
    
    public boolean deleteNotification(Long notificationId) {
    	try {
    		notificationDAO.deleteById(notificationId);
    		return true;
    	} catch (Exception ex) {
    		LOGGER.error(ex.getMessage());
    		return false;
    	}
    	
    }

}

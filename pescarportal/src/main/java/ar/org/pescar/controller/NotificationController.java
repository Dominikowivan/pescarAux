package ar.org.pescar.controller;

import ar.org.pescar.services.NotificationService;
import ar.org.pescar.entity.Notification;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/notification")
public class NotificationController {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping(produces = "application/json")
    public List<Notification> getAllNotification() {
        return notificationService.getAllNotification();
    }

    @GetMapping(value = "/{id}",produces = "application/json")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }
    
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
    	return new ResponseEntity<Notification>(notificationService.createNotification(notification), HttpStatus.OK); 
    }
    
    @PutMapping
    public ResponseEntity<Notification> updateNotification(@RequestBody Notification notification) {
    	return new ResponseEntity<Notification>(notificationService.updateNotification(notification), HttpStatus.OK); 
    }
    
    @DeleteMapping
    public ResponseEntity<Boolean> deleteNotification(Long notificationId) {
    	return new ResponseEntity<Boolean>(notificationService.deleteNotification(notificationId), HttpStatus.OK); 
    }
    
}

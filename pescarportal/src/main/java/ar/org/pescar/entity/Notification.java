package ar.org.pescar.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "NOTIFICATION")
public class Notification {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "notification_seq")
    @SequenceGenerator(name = "notification_seq", sequenceName = "notification_seq", allocationSize = 1)
    private long id;

    @Column(name = "TITLE", length = 50, unique = true)
    @NotNull
    private String title;

    @Column(name = "SUBJECT", length = 100)
    @NotNull
    private String subject;

    @Column(name = "DESCRIPTION", length = 4000)
    @NotNull
    private String description;

    @Column(name = "CREATEDDATE")
    @NotNull
    private Date createdDate;

    public Notification() {
    }
    
    public Notification(String title, String subject, String description, Date createdDate) {
        this.title = title;
        this.subject = subject;
        this.description = description;
        this.createdDate = createdDate;
    }

    public String getTitle() {
        return title;
    }

    public String getSubject() {
        return subject;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public long getId() {
        return id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setDesription(String description) {
        this.description = description;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

}

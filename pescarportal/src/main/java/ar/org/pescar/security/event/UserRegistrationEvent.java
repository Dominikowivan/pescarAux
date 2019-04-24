package ar.org.pescar.security.event;

import ar.org.pescar.security.entity.User;
import org.springframework.context.ApplicationEvent;

public class UserRegistrationEvent extends ApplicationEvent {

    private static final long serialVersionUID = -8445943548965154778L;
    private final User user;

    public UserRegistrationEvent(User user){
        super(user);
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}

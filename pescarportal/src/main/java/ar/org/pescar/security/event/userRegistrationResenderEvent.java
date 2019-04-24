package ar.org.pescar.security.event;

import org.springframework.context.ApplicationEvent;

public class userRegistrationResenderEvent extends ApplicationEvent {

    private static final long serialVersionUID = -8445943548965154378L;
    private final String username;

    public userRegistrationResenderEvent(String username){
        super(username);
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
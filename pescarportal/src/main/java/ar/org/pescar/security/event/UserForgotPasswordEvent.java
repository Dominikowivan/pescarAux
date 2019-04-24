package ar.org.pescar.security.event;

import org.springframework.context.ApplicationEvent;

public class UserForgotPasswordEvent extends ApplicationEvent {

    private static final long serialVersionUID = -8445943548965156078L;
    private final String email;

    public UserForgotPasswordEvent(String email){
        super(email);
        this.email = email;
    }

    public String getEmail(){
        return email;
    }
}

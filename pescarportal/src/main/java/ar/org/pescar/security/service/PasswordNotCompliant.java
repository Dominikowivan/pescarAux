package ar.org.pescar.security.service;

public class PasswordNotCompliant extends Exception {
    public PasswordNotCompliant(String message){
        super(message);
    }
}

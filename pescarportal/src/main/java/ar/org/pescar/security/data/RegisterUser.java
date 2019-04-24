package ar.org.pescar.security.data;

import java.io.Serializable;

public class RegisterUser implements Serializable {

    //Serializer and Deserializer ID.
    private static final long serialVersionUID = -8445943548965154778L;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private Integer dni;

    public RegisterUser() {
        super();
    }

    public RegisterUser(String username, String password, String firstName, String lastName, String email, Integer dni) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getDni() {
        return dni;
    }

    @Override
    public String toString() {
        return String.format("%s // %s // %s // %s.", username, firstName, lastName, email);
    }
}

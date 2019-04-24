package ar.org.pescar.security.data;

import java.io.Serializable;

public class ChangePasswordRequest implements Serializable {

    private static final long serialVersionUID = 1250166798152483573L;

    private String password;
    private String code;
    private String username;

    public ChangePasswordRequest() {
        super();
    }

    public ChangePasswordRequest(String password, String code, String username) {
        this.password = password;
        this.code = code;
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

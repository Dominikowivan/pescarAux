package ar.org.pescar.security.data;

import java.io.Serializable;

//Class to fill the ResponseEntity.
public class JwtAuthenticationResponse implements Serializable {

    //Serializer and Deserializer ID.
    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}

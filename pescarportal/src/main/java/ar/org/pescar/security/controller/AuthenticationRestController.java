package ar.org.pescar.security.controller;

import ar.org.pescar.security.data.JwtAuthenticationRequest;
import ar.org.pescar.security.data.JwtAuthenticationResponse;
import ar.org.pescar.security.data.JwtUser;
import ar.org.pescar.security.service.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
public class AuthenticationRestController {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    @Qualifier("jwtUserDetailsService")
    private UserDetailsService userDetailsService;

    @PostMapping(value = "${jwt.route.authentication.path}")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {

        LOGGER.info(String.format("Trying to authenticate %s",authenticationRequest));
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        LOGGER.info(String.format("%s authenticated", authenticationRequest));

        // Reload password post-security so we can generate the token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        LOGGER.info(String.format("Authentication token: %s",token));

        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @GetMapping(value = "${jwt.route.authentication.refresh}")
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        LOGGER.info(String.format("Trying to refresh token %s",token));
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
            LOGGER.info("Token can be refreshed, refreshing.");
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            LOGGER.info("Token cannot be refreshed.");
            return ResponseEntity.badRequest().body(null);
        }
    }

    //In case of an AuthenticationException is thrown fall in this method
    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        LOGGER.info(String.format("Authenticating %s.",username));

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            LOGGER.info("Username was authenticated but is disabled.");
            throw new AuthenticationException("User is disabled!", e);
        } catch (BadCredentialsException e) {
            LOGGER.info("Username wasn't authenticated due to bad credentials.");
            throw new AuthenticationException("Bad credentials!", e);
        }
    }
}

package ar.org.pescar.security.config;

import ar.org.pescar.security.service.JwtAuthenticationEntryPoint;
import ar.org.pescar.security.service.JwtAuthorizationTokenFilter;
import ar.org.pescar.security.service.JwtUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Profile("local")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private JwtAuthenticationEntryPoint unauthorizedHandler;
    private JwtUserDetailsService jwtUserDetailsService;
    private JwtAuthorizationTokenFilter authenticationTokenFilter;

    @Autowired
    public WebSecurityConfig(JwtAuthenticationEntryPoint unauthorizedHandler, JwtUserDetailsService jwtUserDetailsService, JwtAuthorizationTokenFilter authenticationTokenFilter){
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.authenticationTokenFilter = authenticationTokenFilter;
    }

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.route.authentication.path}")
    private String authenticationPath;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(jwtUserDetailsService)
            .passwordEncoder(passwordEncoderBean());
    }

    @Bean
    public PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            // we don't need CSRF because our token is invulnerable
            .csrf().disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeRequests()
            // Un-secure H2 Database
            .antMatchers("/h2-console/**/**").permitAll()
            .antMatchers("/auth/**").permitAll()
            .antMatchers("/register","/register/resend").permitAll()
            .antMatchers("/verify/email").permitAll()
            .antMatchers("/forgot/password","/forgot/password/code","/forgot/password/change").permitAll()
            .antMatchers("/api/notification").permitAll()
            .antMatchers("/").permitAll()
            .antMatchers("/**").permitAll()
            .antMatchers("/index.html").permitAll()
            .anyRequest().authenticated();

       httpSecurity
            .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // disable page caching
        httpSecurity
            .headers()
            .frameOptions().sameOrigin()  // required to set for H2 else H2 Console will be blank.
            .cacheControl();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // AuthenticationTokenFilter will ignore the below paths
        web
//            .ignoring()
//            .antMatchers(
//                HttpMethod.POST,
//                authenticationPath
//            )
//
//            // Un-secure H2 Database (for testing purposes, H2 console shouldn't be unprotected in production)
//            .and()
            .ignoring()
            .antMatchers("/h2-console/**/**");
    }
}

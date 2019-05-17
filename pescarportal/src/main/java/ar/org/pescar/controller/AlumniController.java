package ar.org.pescar.controller;

import ar.org.pescar.entity.AlumniProfile;
import ar.org.pescar.security.entity.User;
import ar.org.pescar.security.repositories.UserDAO;
import ar.org.pescar.security.service.JwtTokenUtil;
import ar.org.pescar.services.AlumniProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AlumniController {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Value("${jwt.header}")
    private String tokenHeader;

    private final AlumniProfileService alumniProfileService;
    private final JwtTokenUtil tokenUtil;
    private final UserDAO userDAO;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public AlumniController(AlumniProfileService alumniProfileService, JwtTokenUtil jwtTokenUtil, UserDAO userDAO) {
       this.alumniProfileService = alumniProfileService;
       tokenUtil = jwtTokenUtil;
       this.userDAO = userDAO;
    }

    /**
     * Method to create and assign an Alumni Profile to the currect Authorized user.
     *
     * @param request
     *  Request information instead of @RequestBody to be able to get the token.
     * @return String
     *  No information of the entities is revealed from this query only generalised messages.
     */
    @PostMapping(value = "/alumni")
    public ResponseEntity<String> createAlumniProfile(HttpServletRequest request) {
        //Get Token and username from said token.
        String token = request.getHeader(tokenHeader).substring(7);
        String username = tokenUtil.getUsernameFromToken(token);
        try {
            //Get POST body message and map it to Alumni Profile
            String body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            AlumniProfile alumniProfile = objectMapper.readValue(body, AlumniProfile.class);

            //Add User Obj to AlumniProfile
            alumniProfile.setUser(userDAO.findByUsername(username));
            alumniProfileService.create(alumniProfile);
            return new ResponseEntity<>(String.format("Alumni profile created correctly for user %s.", username),HttpStatus.CREATED);
        }catch (Exception e){
            LOGGER.error(String.format("There was an error while creating new Alumni profile for %s, ERROR:%n%s",username,e.getMessage()));
            return new ResponseEntity<>("Exception creating AlumniProfile",HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**
     * Method to get the Alumni Profile for the current authenticated user.
     *
     * @param request
     *  Request information instead of @RequestBody to be able to get the token.
     * @return AlumniProfile
     *  Partial AlumniProfile entity returned.
     */
    @GetMapping(value= "/alumni")
    public ResponseEntity<?> findAlumniProfile(HttpServletRequest request){
        //Get Token and username from said token.
        String token = request.getHeader(tokenHeader).substring(7);
        String username = tokenUtil.getUsernameFromToken(token);
        User user = userDAO.findByUsername(username);
        AlumniProfile alumniProfile = alumniProfileService.getByUserId(user.getId());
        if(alumniProfile != null){
            return new ResponseEntity<>(alumniProfile, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("There's no profile for this user.",HttpStatus.NO_CONTENT);
        }
    }
   
   
    /**
     * Method to update the Alumni Profile for the current authenticated user,
     *  the ID and User will always be the same for this Alumni Profile entry.
     *
     * @param request
     *  Request information instead of @RequestBody to be able to get the token.
     * @return String
     *  No information of the entities is revealed from this query only generalised messages.
     */
    @PutMapping( value = "/alumni")
    public ResponseEntity<?> updateAlumniProfile(HttpServletRequest request){
        //Get Token and username from said token.
        String token = request.getHeader(tokenHeader).substring(7);
        String username = tokenUtil.getUsernameFromToken(token);
        try {
            //Get PUT body message and map it to Alumni Profile
            String body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            AlumniProfile alumniProfileUpdate = objectMapper.readValue(body, AlumniProfile.class);

            //Find Alumni profile for this username
            User user = userDAO.findByUsername(username);
            AlumniProfile alumniProfile = alumniProfileService.getByUserId(user.getId());

            //Set same id and username(unique columns)so its an update operation
            alumniProfileUpdate.setId(alumniProfile.getId());
            alumniProfileUpdate.setUser(user);

            alumniProfileService.update(alumniProfileUpdate);
            return new ResponseEntity<>(String.format("Alumni updated correctly for user %s.", username),HttpStatus.CREATED);
        }catch (Exception e){
            LOGGER.error(String.format("There was an error while updating new Alumni profile for %s, ERROR:%n%s",username,e.getMessage()));
            return new ResponseEntity<>("Exception updating AlumniProfile",HttpStatus.NOT_ACCEPTABLE);
        }
    }

   // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value= "/alumni/all")
    public ResponseEntity< List<AlumniProfile> > findAllAlumniProfile() {
        List<AlumniProfile> allAlumniProfile = alumniProfileService.getAllAlumniProfile();
        return new ResponseEntity<>(allAlumniProfile, HttpStatus.OK);
    }

   // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/alumni/filter")
    public ResponseEntity<?> getAlumniBy(@RequestBody AlumniProfile profileToFilterBy){
        List<AlumniProfile> results = alumniProfileService.getAllAlumniProfileByExample(profileToFilterBy);
        return new ResponseEntity<>(results ,HttpStatus.OK);
    }
 // @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value="/alumni/{id}")
    public ResponseEntity<?> deleteAlumniProfile(@PathVariable Integer id){
        alumniProfileService.delete(id);
        return new ResponseEntity<>(String.format("Alumni deleted correctly"),HttpStatus.OK);
    }
 // @PreAuthorize("hasRole('ADMIN')") 
    @GetMapping(value="/alumni/{id}")
    public ResponseEntity<?> getAlumniProfile(@PathVariable Integer id){
    	
    	AlumniProfile alumniProfile= alumniProfileService.getByUserId(id.longValue());
    
    	if(alumniProfile!=null) {
        return new ResponseEntity<>(alumniProfile,HttpStatus.OK);
    }
    	else             
    		return new ResponseEntity<>("There's no profile for this user.",HttpStatus.NO_CONTENT);

    		
    }
 


}

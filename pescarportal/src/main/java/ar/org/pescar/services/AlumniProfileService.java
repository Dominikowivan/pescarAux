package ar.org.pescar.services;

import ar.org.pescar.entity.AlumniProfile;
import ar.org.pescar.repositories.AlumniProfileDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumniProfileService {

    private AlumniProfileDAO alumniProfileDAO;

    @Autowired
    public AlumniProfileService(AlumniProfileDAO alumniProfileDAO) {
        this.alumniProfileDAO = alumniProfileDAO;
    }

    public Integer create(AlumniProfile alumniProfile) {
        alumniProfileDAO.save(alumniProfile);
        return alumniProfile.getId();
    }

    public AlumniProfile getById(Integer id) {
        return alumniProfileDAO.findById(id).get();
    }

    public void update(AlumniProfile alumniProfile) {
        alumniProfileDAO.save(alumniProfile);
    }

    public List<AlumniProfile> getAllAlumniProfile(){ return alumniProfileDAO.findAll();}

    @Deprecated
    public List<AlumniProfile> getAllAlumniProfileByExample(AlumniProfile profileToFilterBy) {
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreCase()//.withMatcher("counselor",contains().ignoreCase());
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withIgnorePaths("currentJob","jobHistory","currentStudy","studyHistory","user");
        Example<AlumniProfile> example = Example.of(profileToFilterBy,matcher);
        return alumniProfileDAO.findAll(example);
    }

    public AlumniProfile getByUserId(Long id) {
        return alumniProfileDAO.findByUserId(id);
    }

    public void delete(Integer alumniId) {
        alumniProfileDAO.delete(getById(alumniId));
    }
}

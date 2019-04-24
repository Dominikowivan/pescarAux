package ar.org.pescar;

import ar.org.pescar.entity.AlumniProfile;
import ar.org.pescar.entity.Job;
import ar.org.pescar.entity.Study;
import ar.org.pescar.services.AlumniProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PescarPortalApplication {

    @Autowired
    AlumniProfileService alumniProfileService;

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(PescarPortalApplication.class, args);
    }

    @Bean
    public void load() {
        alumniProfileService.create(manuelProfile());
        alumniProfileService.create(ivanProfile());
        alumniProfileService.create(cristianProfile());
    }

    private AlumniProfile cristianProfile() {
        AlumniProfile cristianProfile= new AlumniProfile("1126887628","1183776592","College","Copenaghue","Pepe",2016);
        cristianProfile.setCurrentJob(new Job("Arquitecto",20,800000));
        cristianProfile.setCurrentStudy(new Study("UTN","Ingenieria", 2008, "no"));
        cristianProfile.addToJobHistory(new Job("Doctor",10,5000));
        cristianProfile.addToStudyHistory(new Study("UTN","Arte", 2018, "yes"));
        return cristianProfile;
    }

    private AlumniProfile ivanProfile() {
        AlumniProfile ivanProfile= new AlumniProfile("112555628","1177776592","College","Italia","Mariano",2012);
        ivanProfile.setCurrentJob(new Job("Pescador",25,80));
        ivanProfile.setCurrentStudy(new Study("UTN","Igenieria naval", 2003, "no"));
        ivanProfile.addToJobHistory(new Job("Marino",10,5330));
        ivanProfile.addToStudyHistory(new Study("ITBA","Cocinero", 2011, "no"));
        return ivanProfile;
    }

    private AlumniProfile manuelProfile() {
        AlumniProfile manuelProfile= new AlumniProfile("1177777778","1172938677","University","Italia","Mariano",2013);
        manuelProfile.setCurrentJob(new Job("Lucha Libre fighter",21,99999999));
        manuelProfile.setCurrentStudy(new Study("UBA","Polygon data researcher", 2013, "no"));
        manuelProfile.addToJobHistory(new Job("Gundam Pilot",14,53330));
        manuelProfile.addToStudyHistory(new Study("UBA","Cheese pope", 2001, "no"));
        return manuelProfile;
    }


}


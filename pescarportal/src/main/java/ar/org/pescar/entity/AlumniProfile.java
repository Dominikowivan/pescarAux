package ar.org.pescar.entity;

import ar.org.pescar.security.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
public class AlumniProfile {

    @Transient
    private static final long serialVersionUID = -8445943548965164378L;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "alumni_seq")
    @SequenceGenerator(name = "alumni_seq", sequenceName = "alumni_seq", allocationSize = 1)
    private Integer id;

    private String telephone;
    private String alternativeTelephone;
    private String maximumEducation;
    private String pescarCenter;
    private String counselor;
    private Integer graduationYear;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Job currentJob;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Job> jobHistory;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Study currentStudy;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    private List<Study> studyHistory;

    @OneToOne
    @JoinColumn(name="USER_ID", unique=true)
    private User user;


    public AlumniProfile() {
        this.jobHistory = new ArrayList<>();
        this.studyHistory = new ArrayList<>();
    }

    public AlumniProfile(String telephone, String alternativeTelephone,
                         String maximumEducation, String pescarCenter,
                         String counselor, Integer graduationYear) {
        this.telephone = telephone;
        this.alternativeTelephone = alternativeTelephone;
        this.maximumEducation = maximumEducation;
        this.pescarCenter = pescarCenter;
        this.counselor = counselor;
        this.graduationYear = graduationYear;
        this.jobHistory = new ArrayList<>();
        this.studyHistory= new ArrayList<>();
    }


    public String getTelephone() {
        return telephone;
    }

    public String getAlternativeTelephone() {
        return alternativeTelephone;
    }

    public String getMaximumEducation() {
        return maximumEducation;
    }

    public String getPescarCenter() {
        return pescarCenter;
    }

    public String getCounselor() {
        return counselor;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public Integer getId() {
        return id;
    }

    public Optional<Job> getCurrentJob() {
        return Optional.ofNullable(currentJob);
    }

    public void setCurrentJob(Job currentJob) {
        this.currentJob = currentJob;
    }

    public void addToJobHistory(Job historyJob) {
        this.jobHistory.add(historyJob);
    }

    public List<Job> getJobHistory() {
        return new ArrayList<>(this.jobHistory);
    }

    public void setCurrentStudy(Study study) {
        this.currentStudy = study;
    }

    public Optional<Study> getCurrentStudy() {
        return Optional.ofNullable(currentStudy);
    }

    public void addToStudyHistory(Study study) {
        this.studyHistory.add(study);
    }

    public List<Study> getStudyHistory() {
        return this.studyHistory;
    }

    //To avoid returning the user object.
    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

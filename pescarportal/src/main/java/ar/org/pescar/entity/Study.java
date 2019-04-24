package ar.org.pescar.entity;

import javax.persistence.*;

@Entity
public class Study {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "study_seq")
    @SequenceGenerator(name = "study_seq", sequenceName = "study_seq", allocationSize = 1)
    private Integer id;
    private String instituteName;
    private String fieldStudy;

    private Integer yearStudy;
    private String scholarship;

    public Study() {
    }

    public Study(String instituteName, String fieldStudy, Integer yearStudy, String scholarship) {

        this.instituteName = instituteName;
        this.fieldStudy = fieldStudy;
        this.yearStudy = yearStudy;
        this.scholarship = scholarship;
    }

    public String getInstituteName() {
        return instituteName;
    }

    public String getFieldStudy() {
        return fieldStudy;
    }

    public Integer getYearStudy() {
        return yearStudy;
    }

    public String getScholarship() {
        return scholarship;
    }
}

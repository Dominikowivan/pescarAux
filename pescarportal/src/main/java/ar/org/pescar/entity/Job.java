package ar.org.pescar.entity;

import javax.persistence.*;

@Entity
public class Job {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "job_seq")
    @SequenceGenerator(name = "job_seq", sequenceName = "job_seq", allocationSize = 1)
    private Integer id;

    private  String jobDesignationName;
    private  Integer workingHours;
    private  Integer grossSalary;

    public Job(){}

    public Job(String jobDesignationName, Integer workingHours, Integer grossSalary) {

        this.jobDesignationName = jobDesignationName;
        this.workingHours = workingHours;
        this.grossSalary = grossSalary;
    }

    public String getJobDesignationName() {
        return jobDesignationName;
    }

    public Integer getWorkingHours() {
        return workingHours;
    }

    public Integer getGrossSalary() {
        return grossSalary;
    }
}

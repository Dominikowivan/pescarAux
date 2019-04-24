package ar.org.pescar;

import ar.org.pescar.entity.AlumniProfile;
import ar.org.pescar.entity.Job;
import ar.org.pescar.entity.Study;
import ar.org.pescar.repositories.AlumniProfileDAO;
import ar.org.pescar.services.AlumniProfileService;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;
import java.util.Optional;

@ContextConfiguration(classes = TestConfig.class)
public class AlumniProfileTestSteps {

    private AlumniProfile alumniProfile;
    private AlumniProfile alumniProfileRetrieved;
    private AlumniProfileService alumniProfileService;

    @Autowired
    private AlumniProfileDAO alumniProfileDAO;

    @Given("^service that has a Dao$")
    public void serviceThatHasADao() throws Throwable {
        alumniProfileService = new AlumniProfileService(alumniProfileDAO);
    }

    @Given("^an alumni profile with (.+) (.+) (.+) (.+) (.+) (.+)$")
    public void anAlumniProfileWithTelephoneAlternativeTelephoneMaximumEducationLevelPescarCenterCounselorGraduationYear(String telephone, String alternativeTelephone, String maximumEducation, String pescarCenter, String counselor, Integer graduationYear) throws Throwable {
        alumniProfile = new AlumniProfile(telephone, alternativeTelephone, maximumEducation, pescarCenter, counselor, graduationYear);
    }

    @When("^the alumni profile is created")
    public void theAlumniProfileIsCreated() throws Throwable {
        alumniProfileService.create(alumniProfile);
    }

    @Then("^the alumni profile has (.+) (.+) (.+) (.+) (.+) (.+)$")
    public void theAlumniProfileHasTelephoneAlternativeTelephoneMaximumEducationLevelPescarCenterCounselorGraduationYear(String telephone, String alternativeTelephone, String maximumEducation, String pescarCenter, String counselor, Integer graduationYear) throws Throwable {
        alumniProfileRetrieved = alumniProfileService.getById(alumniProfile.getId());
        Assert.assertEquals(alumniProfileRetrieved.getTelephone(), telephone);
        Assert.assertEquals(alumniProfileRetrieved.getAlternativeTelephone(), alternativeTelephone);
        Assert.assertEquals(alumniProfileRetrieved.getMaximumEducation(), maximumEducation);
        Assert.assertEquals(alumniProfileRetrieved.getPescarCenter(), pescarCenter);
        Assert.assertEquals(alumniProfileRetrieved.getCounselor(), counselor);
        Assert.assertEquals(alumniProfileRetrieved.getGraduationYear(), graduationYear);
    }

    @And("^works in (.+) (.+) (.+)$")
    public void worksInJobDesignationWorkingHoursGrossSalary(String jobDesignationName, Integer workingHours, Integer grossSalary) throws Throwable {
        Job currentJob = new Job(jobDesignationName, workingHours, grossSalary);
        alumniProfile.setCurrentJob(currentJob);
    }

    @Then("^the profile has a work with (.+) (.+) (.+)$")
    public void aWorkWithJobDesignationWorkingHoursGrossSalary(
            String jobDesignationName, Integer workingHours, Integer grossSalary) throws Throwable {
        alumniProfileRetrieved = alumniProfileService.getById(alumniProfile.getId());
        Optional<Job> currentJobOpt = alumniProfileRetrieved.getCurrentJob();
        Assert.assertTrue(currentJobOpt.isPresent());

        Job currentJobRetrieved = currentJobOpt.get();

        Assert.assertEquals(currentJobRetrieved.getJobDesignationName(), jobDesignationName);
        Assert.assertEquals(currentJobRetrieved.getWorkingHours(), workingHours);
        Assert.assertEquals(currentJobRetrieved.getGrossSalary(), grossSalary);
    }

    @Given("^an alumni profile$")
    public void anAlumniProfile() throws Throwable {
        alumniProfile = new AlumniProfile();
    }

    @And("^a job history with (.+) (.+) (.+)$")
    public void aJobHistoryWithJobHistoryDesignationJobDesignationWorkingHoursJobHistoryGrossSalary(
            String jobHistoryDesignation,
            Integer jobDesignationWorkingHours,
            Integer jobHistoryGrossSalary) throws Throwable {

        Job historyJob = new Job(jobHistoryDesignation, jobDesignationWorkingHours, jobHistoryGrossSalary);
        alumniProfile.addToJobHistory(historyJob);
    }

    @Then("^the profile has a history job with (.+) (.+) (.+)$")
    public void theProfileHasAHistoryJobWithJobHistoryDesignationJobDesignationWorkingHoursJobHistoryGrossSalary(
            String jobHistoryDesignation, Integer jobDesignationWorkingHours,
            Integer jobHistoryGrossSalary) throws Throwable {
        alumniProfileRetrieved = alumniProfileService.getById(alumniProfile.getId());
        List<Job> jobHistory = alumniProfileRetrieved.getJobHistory();
        Assert.assertFalse(jobHistory.isEmpty());

        Job historyJob = jobHistory.get(0);

        Assert.assertEquals(historyJob.getJobDesignationName(), jobHistoryDesignation);
        Assert.assertEquals(historyJob.getWorkingHours(), jobDesignationWorkingHours);
        Assert.assertEquals(historyJob.getGrossSalary(), jobHistoryGrossSalary);
    }

    @And("^study in (.+) (.+) (.+) and (.+)$")
    public void studyInInstituteNameFieldStudyYearStudyAndScholarship(
            String instituteName, String fieldStudy, Integer yearStudy, String scholarship) throws Throwable {
        Study study = new Study(instituteName, fieldStudy, yearStudy, scholarship);
        alumniProfile.setCurrentStudy(study);
    }

    @Then("^the profile has a study with (.+) (.+) (.+) (.+)$")
    public void theProfileHasAStudyWithInstituteNameFieldStudyYearStudyScholarship(
            String instituteName, String fieldStudy, Integer yearStudy, String scholarship) throws Throwable {
        alumniProfileRetrieved = alumniProfileService.getById(alumniProfile.getId());
        Optional<Study> currentStudy = alumniProfileRetrieved.getCurrentStudy();
        Assert.assertTrue(currentStudy.isPresent());

        Study currentStudyRetrieved = currentStudy.get();

        Assert.assertEquals(currentStudyRetrieved.getInstituteName(), instituteName);
        Assert.assertEquals(currentStudyRetrieved.getFieldStudy()   , fieldStudy);
        Assert.assertEquals(currentStudyRetrieved.getScholarship()  , scholarship);
        Assert.assertEquals(currentStudyRetrieved.getYearStudy()    , yearStudy);
    }

    @And("^a study history with (.+) (.+) (.+) and (.+)$")
    public void aStudyHistoryWithInstituteNameFieldStudyYearStudyAndScholarship(
            String instituteName, String fieldStudy, Integer yearStudy, String scholarship) throws Throwable {
        Study study = new Study(instituteName, fieldStudy, yearStudy, scholarship);
        alumniProfile.addToStudyHistory(study);
    }

    @Then("^the profile has a study history with (.+) (.+) (.+) (.+)$")
    public void theProfileHasAStudyHistoryWithInstituteNameFieldStudyYearStudyScholarship(
            String instituteName, String fieldStudy, Integer yearStudy, String scholarship) throws Throwable {
        alumniProfileRetrieved = alumniProfileService.getById(alumniProfile.getId());
        List<Study> studyHistory = alumniProfileRetrieved.getStudyHistory();
        Assert.assertFalse(studyHistory.isEmpty());

        Study currentStudyRetrieved = studyHistory.get(0);

        Assert.assertEquals(currentStudyRetrieved.getInstituteName(), instituteName);
        Assert.assertEquals(currentStudyRetrieved.getFieldStudy()   , fieldStudy);
        Assert.assertEquals(currentStudyRetrieved.getScholarship()  , scholarship);
        Assert.assertEquals(currentStudyRetrieved.getYearStudy()    , yearStudy);
    }
}

package ar.org.pescar;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(features = {"src/test/resources/feature/alumni_profile_persistence.feature"},format = "html:target/pescar")
public class AlumniProfileTestRunner {
}

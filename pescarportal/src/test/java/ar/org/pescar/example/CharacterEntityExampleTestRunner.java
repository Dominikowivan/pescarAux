package ar.org.pescar.example;


import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(features = {"src/test/resources/feature/character_entity_example.feature"},format = "html:target/pescar")
public class CharacterEntityExampleTestRunner { }
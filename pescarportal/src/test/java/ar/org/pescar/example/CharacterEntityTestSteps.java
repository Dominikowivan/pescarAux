package ar.org.pescar.example;

import ar.org.pescar.TestConfig;
import ar.org.pescar.example.model.CharacterExample;
import ar.org.pescar.example.model.CharacterExampleController;
import ar.org.pescar.example.model.CharacterService;
import ar.org.pescar.example.model.ItemExample;
import ar.org.pescar.example.model.CharacterExampleDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@ContextConfiguration(classes = TestConfig.class)
public class CharacterEntityTestSteps {

    private CharacterExample character;
    private CharacterExample retrievedCharacter;
    private CharacterService characterService;
    private ItemExample item;
    private CharacterExampleController controller;
    private MockMvc mockMvc;
    private ResultActions resultActions;
    private ObjectMapper objectMapper;

    @Autowired
    private CharacterExampleDAO characterExampleDAO;

    @Given("^There is a controller service and Dao ready to be used$")
    public void thereIsAControllerServiceAndDaoReadyToBeUsed() throws Throwable {
        characterService = new CharacterService(characterExampleDAO);
        controller = new CharacterExampleController();
        controller.characterService = characterService;
        mockMvc = standaloneSetup(controller).build();
        objectMapper = new ObjectMapper();
    }

    @Given("^a character with (.+) (.+) (.+) and (.+)$")
    public void aCharacterWithNameClassLifeAndMoney(String name, String characterClass, Integer life, Integer money) throws Throwable {
        character = new CharacterExample(name, characterClass, life, money);
    }

    @And("^the item with (.+) and (.+)$")
    public void theItemWithItemNameAndAttackValue(String itemName, String attackValue) throws Throwable {
        Integer attack = Integer.valueOf(attackValue.trim());
        item = new ItemExample(itemName, attack);
    }

    @And("^it equips the item$")
    public void itEquipsTheItem() throws Throwable {
        character.equip(item);
    }

    @When("^and the characters is saved in the characterService$")
    public void andTheCharactersIsCreatedInTheCharacterService() throws Throwable {
        characterService.create(character);
    }

    @And("^the character is retrieved$")
    public void theCharacterIsRetrieved() throws Throwable {
        retrievedCharacter = characterService.get(character.getId());
    }

    @Then("^the character retrieved has the same (.+) (.+) (.+) and (.+)$")
    public void theCharacterRetrievedHasTheSameNameClassLifeAndMoney(String name, String characterClass, Integer life, Integer money) throws Throwable {
        Assert.assertEquals(name, retrievedCharacter.getName());
        Assert.assertEquals(characterClass, retrievedCharacter.getCharacterClass());
        Assert.assertEquals(life, retrievedCharacter.getLife());
        Assert.assertEquals(money, retrievedCharacter.getMoney());
    }

    @And("^the retrieved character has the same sword with (.+) and (.+)$")
    public void theRetrievedCharacterHasTheSameSwordWithItemNameAndAttackValue(String itemName, Integer attackValue) throws Throwable {
        ItemExample retrievedItem = retrievedCharacter.getItem(itemName);
        Assert.assertEquals(itemName, retrievedItem.getItemName());
        Assert.assertEquals(attackValue, retrievedItem.getAttackValue());
    }

    @And("^a client sends a Get rest call for the character$")
    public void aClientSendsAGetRestCallForTheCharacter() throws Throwable {
        Integer characterId = character.getId();
        this.resultActions = this.mockMvc.perform(get("/character/" + characterId));
    }

    @And("^a 401 message status code is returned and a message with the character with (.+) (.+) (.+) and (.+) is returned$")
    public void aMessageStatusCodeIsReturnedAndAMessageWithTheCharacterWithNameClassLifeAndMoneyIsReturned(String name, String characterClass, Integer life, Integer money) throws Throwable {

        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        String retrievedCharString = mvcResult.getResponse().getContentAsString();
        retrievedCharacter = objectMapper.readValue(retrievedCharString, CharacterExample.class);

        Assert.assertEquals(name, retrievedCharacter.getName());
        Assert.assertEquals(characterClass, retrievedCharacter.getCharacterClass());
        Assert.assertEquals(life, retrievedCharacter.getLife());
        Assert.assertEquals(money, retrievedCharacter.getMoney());
    }

    @When("^a client sends a POST rest call with the character$")
    public void aClientSendsAPOSTRestCallWithTheCharacterNameClassLifeAndMoney() throws Throwable {

        String json = objectMapper.writeValueAsString(character);

        this.resultActions =  this.mockMvc.perform(
                post("/character")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json));

    }

    @And("^a 201 status code is returned and the character is in the database$")
    public void aStatusCodeIsReturnedAndTheCharacterIsInTheDatabase() throws Throwable {
        MvcResult mvcResult = resultActions.andExpect(status().isCreated()).andReturn();
        String characterIdReturned = mvcResult.getResponse().getContentAsString();
        Integer characterId = Integer.valueOf(characterIdReturned);
       characterService.get(characterId);
    }

}

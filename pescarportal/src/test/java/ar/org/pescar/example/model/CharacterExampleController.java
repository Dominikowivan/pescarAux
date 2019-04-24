package ar.org.pescar.example.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class CharacterExampleController {

    public CharacterService characterService;

    @RequestMapping(method={RequestMethod.GET},value={"/hello"})
    public String index() {
        return "Hola Pescar!";
    }

    @GetMapping(value = "/character/{characterID}")
    public CharacterExample getData(@PathVariable Integer characterID) {
        return characterService.get(characterID);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/character")
    public Integer createUser(@RequestBody CharacterExample requestUserDetails) {
        return characterService.create(requestUserDetails);
    }

}
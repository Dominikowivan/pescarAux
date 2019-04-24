package ar.org.pescar.example.model;

import javax.transaction.Transactional;

@Transactional
public class CharacterService {

    CharacterExampleDAO characterExampleDAO;

    public CharacterService(CharacterExampleDAO aCharacterExampleDAO){
        this.characterExampleDAO = aCharacterExampleDAO;
    }

    public Integer create(CharacterExample character) {
        characterExampleDAO.save(character);
        return character.getId();
    }

    public CharacterExample get(Integer id) {
        return characterExampleDAO.findById(id).get();
    }
}

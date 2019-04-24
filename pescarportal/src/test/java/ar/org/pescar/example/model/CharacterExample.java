package ar.org.pescar.example.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CharacterExample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String      name;
    private String      characterClass;
    private Integer     life;
    private Integer     money;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ItemExample> items;

    public CharacterExample() { }

    public CharacterExample(String aName, String aCharacterClass, Integer aLife, Integer money) {
        this.name           = aName;
        this.characterClass = aCharacterClass;
        this.life           = aLife;
        this.money          = money;
        this.items = new ArrayList<>();
    }

    public void equip(ItemExample anItem) {
        this.items.add(anItem);
    }


    // Getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCharacterClass() {
        return characterClass;
    }

    public void setCharacterClass(String characterClass) {
        this.characterClass = characterClass;
    }

    public Integer getLife() {
        return life;
    }

    public void setLife(Integer life) {
        this.life = life;
    }

    public Integer getMoney() {
        return money;
    }

    public void setMoney(Integer money) {
        this.money = money;
    }

    public ItemExample getItem(String itemName) {
        return items.stream().filter((ItemExample item) -> item.getItemName().equals(itemName)).findFirst().get();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

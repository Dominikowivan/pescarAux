package ar.org.pescar.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ItemExample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String  itemName;
    private Integer attackValue;


    public ItemExample() { }

    public ItemExample(String itemName, Integer attackValue) {
        this.itemName = itemName;
        this.attackValue = attackValue;
    }

    //Getter and Setter
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getAttackValue() {
        return attackValue;
    }

    public void setAttackValue(Integer attackValue) {
        this.attackValue = attackValue;
    }
}

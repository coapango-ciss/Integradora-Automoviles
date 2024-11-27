package utez.edu.mx.automoviles.modules.brand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.edu.mx.automoviles.modules.car.Car;

import java.util.List;

@Entity
@Table(name = "brand")
public class Brand {

    /* Atributos */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    /* Relaciones */
    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    List<Car> cars;

    /* Constructores */
    public Brand() {}

    public Brand(String name) {
        this.name = name;
    }

    public Brand(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Brand(String name, List<Car> cars) {
        this.name = name;
        this.cars = cars;
    }

    public Brand(int id, String name, List<Car> cars) {
        this.id = id;
        this.name = name;
        this.cars = cars;
    }

    /* Getters & Setters */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}


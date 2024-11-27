package utez.edu.mx.automoviles.modules.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.edu.mx.automoviles.modules.car.Car;

import java.util.List;

@Entity
@Table(name = "service")
public class Service {

    /* Atributos */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    /* Relaciones */
    @ManyToMany(mappedBy = "services")
    @JsonIgnore
    private List<Car> cars;

    /* Constructores */
    public Service() {}

    public Service(String code, String name, String description) {
        this.code = code;
        this.name = name;
        this.description = description;
    }

    public Service(int id, String code, String name, String description) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
    }

    public Service(String code, String name, String description, List<Car> cars) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.cars = cars;
    }

    public Service(int id, String code, String name, String description, List<Car> cars) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.cars = cars;
    }

    /* Getters & Setters */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}

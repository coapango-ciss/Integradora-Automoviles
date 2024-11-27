package utez.edu.mx.automoviles.modules.car;

import jakarta.persistence.*;
import utez.edu.mx.automoviles.modules.brand.Brand;
import utez.edu.mx.automoviles.modules.customer.Customer;
import utez.edu.mx.automoviles.modules.service.Service;

import java.util.List;

@Entity
@Table(name = "car")
public class Car {

    /* Atributos */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "register_date", nullable = false)
    private String registerDate;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "sell_date")
    private String sellDate;

    /* Relaciones */
    @ManyToOne
    @JoinColumn(name = "id_brand", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customer customer;

    @ManyToMany
    @JoinTable(
            name = "car_has_services",
            joinColumns = @JoinColumn(name = "id_car"),
            inverseJoinColumns = @JoinColumn(name = "id_service")
    )
    private List<Service> services;

    /* Constructores */
    public Car() {}

    public Car(String model, String color, String registerDate, double price, String sellDate) {
        this.model = model;
        this.color = color;
        this.registerDate = registerDate;
        this.price = price;
        this.sellDate = sellDate;
    }

    public Car(long id, String model, String color, String registerDate, double price, String sellDate) {
        this.id = id;
        this.model = model;
        this.color = color;
        this.registerDate = registerDate;
        this.price = price;
        this.sellDate = sellDate;
    }

    public Car(String model, String color, String registerDate, double price, String sellDate, Brand brand, Customer customer, List<Service> services) {
        this.model = model;
        this.color = color;
        this.registerDate = registerDate;
        this.price = price;
        this.sellDate = sellDate;
        this.brand = brand;
        this.customer = customer;
        this.services = services;
    }

    public Car(long id, String model, String color, String registerDate, double price, String sellDate, Brand brand, Customer customer, List<Service> services) {
        this.id = id;
        this.model = model;
        this.color = color;
        this.registerDate = registerDate;
        this.price = price;
        this.sellDate = sellDate;
        this.brand = brand;
        this.customer = customer;
        this.services = services;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSellDate() {
        return sellDate;
    }

    public void setSellDate(String sellDate) {
        this.sellDate = sellDate;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }
}

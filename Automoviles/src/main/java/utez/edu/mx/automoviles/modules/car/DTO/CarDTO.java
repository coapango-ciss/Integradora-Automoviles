package utez.edu.mx.automoviles.modules.car.DTO;
import utez.edu.mx.automoviles.modules.brand.Brand;
import utez.edu.mx.automoviles.modules.customer.Customer;
import utez.edu.mx.automoviles.modules.service.Service;

import java.util.List;

public class CarDTO {
    private long id;
    private String model;
    private String color;
    private String registerDate;
    private String sellDate;
    private double price;
    private Brand brand ;
    private boolean status;
    private Customer customer;
    private List<Service> services;

    public CarDTO() {
    }

    public CarDTO(long id, String model, String color, String registerDate, String sellDate, double price, Brand brand, boolean status, Customer customer, List<Service> services) {
        this.id = id;
        this.model = model;
        this.color = color;
        this.registerDate = registerDate;
        this.sellDate = sellDate;
        this.price = price;
        this.brand = brand;
        this.status = status;
        this.customer = customer;
        this.services = services;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getSellDate() {
        return sellDate;
    }

    public void setSellDate(String sellDate) {
        this.sellDate = sellDate;
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



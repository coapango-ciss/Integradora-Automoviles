package utez.edu.mx.automoviles.modules.customer.DTO;

import utez.edu.mx.automoviles.modules.employee.Employee;

public class CustomerDTO {

    private long id;
    private String name,surname,lastname,telephoneNumber,email;
    private Employee employee;

    private CustomerDTO(){}

    public CustomerDTO(long id,String name, String surname, String lastname, String telephoneNumber, String email, Employee employee) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.telephoneNumber = telephoneNumber;
        this.email = email;
        this.employee = employee;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}



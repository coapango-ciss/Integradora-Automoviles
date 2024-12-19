package utez.edu.mx.automoviles.modules.employee.DTO;

import utez.edu.mx.automoviles.modules.rol.Rol;

public class EmployeeDTO {

    long id;
    private String name;
    private String surname;
    private String lastname;
    private String username;
    private Rol rol;


    public EmployeeDTO(){
    };

    public EmployeeDTO(long id, String name, String surname, String lastname, String username, Rol rol) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.username = username;
        this.rol = rol;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}

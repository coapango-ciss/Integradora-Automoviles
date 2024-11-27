package utez.edu.mx.automoviles.modules.employee;

import jakarta.persistence.*;
import utez.edu.mx.automoviles.modules.rol.Rol;

@Entity
@Table(name = "employee")
public class Employee {
    /* Atributos */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    /* Relaciones */

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    /* Contructores */
    public Employee() {}

    public Employee(String name, String surname, String lastname, String username, String password) {
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }

    public Employee(Long id, String name, String surname, String lastname, String username, String password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }

    public Employee(Rol rol, String password, String username, String lastname, String surname, String name) {
        this.rol = rol;
        this.password = password;
        this.username = username;
        this.lastname = lastname;
        this.surname = surname;
        this.name = name;
    }

    public Employee(Long id, String name, String surname, String lastname, String username, String password, Rol rol) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.rol = rol;
    }


    /* Getters & Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

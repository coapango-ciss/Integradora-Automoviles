package utez.edu.mx.automoviles.auth.DTO;

public class AuthLoginDTO {
    private String username, password;

    public AuthLoginDTO() {
    }

    public AuthLoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

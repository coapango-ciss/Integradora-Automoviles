package utez.edu.mx.automoviles.modules.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Modifying
    @Query(value = "select * from employee where id_rol = 2;", nativeQuery = true)
    List<Employee> findAll();
    Employee findById(long id);
    Employee save(Employee employee);
    void deleteById(long id);

    @Query(value = "SELECT * FROM employee WHERE username = :username", nativeQuery = true)
    Employee findByUsername(@Param("username") String username);

    @Query(value = "SELECT * FROM employee WHERE username = :username AND password = :password;", nativeQuery = true)
    Employee findByUsernameAndPassword( @Param("username") String username, @Param("password") String password);
}

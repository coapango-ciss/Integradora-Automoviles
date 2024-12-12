package utez.edu.mx.automoviles.modules.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findAll();
    Customer findById(long id);
    Customer save(Customer customer);
    void deleteById(long id);

    @Query(value = "SELECT * FROM customer WHERE id_employee = :id_employee;", nativeQuery = true)
    List<Customer> findByEmployee(@Param("id_employee") long id);

}

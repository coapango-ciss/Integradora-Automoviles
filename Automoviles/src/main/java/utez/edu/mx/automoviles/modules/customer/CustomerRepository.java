package utez.edu.mx.automoviles.modules.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findAll();
    Customer findById(long id);
    Customer save(Customer customer);
    void deleteById(long id);
}

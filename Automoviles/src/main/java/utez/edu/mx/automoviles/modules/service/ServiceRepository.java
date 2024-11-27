package utez.edu.mx.automoviles.modules.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    List<Service> findAll();
    Service findById(int id);
    Service save(Service service);
    void deleteById(int id);
}

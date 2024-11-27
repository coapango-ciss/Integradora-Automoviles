package utez.edu.mx.automoviles.modules.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{
    List<Car> findAll();
    Car findById(long id);
    Car save(Car car);
    void deleteById(long id);
}

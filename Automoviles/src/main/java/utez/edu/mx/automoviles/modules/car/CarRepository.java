package utez.edu.mx.automoviles.modules.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{
    List<Car> findAll();
    @Query(value = "SELECT * FROM car WHERE status = :status;", nativeQuery = true)
    List<Car> findByStatus(@Param("status")boolean status);
    Car findById(long id);
    Car save(Car car);
    void deleteById(long id);
}

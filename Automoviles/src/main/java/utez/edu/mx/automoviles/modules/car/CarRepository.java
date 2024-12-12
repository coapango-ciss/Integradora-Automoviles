package utez.edu.mx.automoviles.modules.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{
    List<Car> findAll();
    @Query(value = "SELECT * FROM car WHERE status = false;", nativeQuery = true)
    List<Car> findSellingCars();
    @Query(value = "select car.id, car.status,car.color, car.model, car.price, car.sell_date, car.id_brand, car.id_customer, car.register_date from car \n" +
            "inner join customer " +
            "on customer.id = id_customer " +
            "inner join employee " +
            "on employee.id = id_employee " +
            "where id_employee = :id_employee;", nativeQuery = true)
    List<Car> findSoldCarsByEmployee(@Param("id_employee") long id_employee);
    Car findById(long id);
    Car save(Car car);
    void deleteById(long id);
}

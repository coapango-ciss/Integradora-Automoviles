package utez.edu.mx.automoviles.modules.brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    List<Brand> findAll();
    Brand findById(int id);
    Brand save(Brand brand);
    Brand deleteById(int id);
}

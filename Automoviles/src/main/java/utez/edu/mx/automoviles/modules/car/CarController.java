package utez.edu.mx.automoviles.modules.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/automoviles/car")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findAll() {
        return carService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findById(@PathVariable long id) {
        return carService.findById(id);
    }

    @PostMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> save(@RequestBody Car car) {
        return carService.save(car);
    }

    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> update(@PathVariable long id,@RequestBody Car car) {
        return carService.update(id,car);
    }

    @DeleteMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> delete(@PathVariable long id) {
        return carService.deleteById(id);
    }
}

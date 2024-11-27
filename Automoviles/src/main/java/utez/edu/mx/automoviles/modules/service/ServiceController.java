package utez.edu.mx.automoviles.modules.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/automoviles/service")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findAll() {
        return serviceService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findById(@PathVariable int id) {
        return serviceService.findById(id);
    }

    @PostMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> save(@RequestBody Service service) {
        return serviceService.save(service);
    }

    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> update(@PathVariable int id,@RequestBody Service service) {
        return serviceService.update(id,service);
    }

    @DeleteMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> delete(@PathVariable int id) {
        return serviceService.deleteById(id);
    }
}

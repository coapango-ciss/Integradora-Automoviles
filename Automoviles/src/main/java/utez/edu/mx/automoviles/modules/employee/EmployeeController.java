package utez.edu.mx.automoviles.modules.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/automoviles/employee")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return employeeService.findById(id);
    }

    @PostMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> save(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> update(@PathVariable long id,@RequestBody Employee employee) {
        return employeeService.update(id,employee);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> delete(@PathVariable long id) {
        return employeeService.deleteById(id);
    }
}

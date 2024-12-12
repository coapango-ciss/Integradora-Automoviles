package utez.edu.mx.automoviles.modules.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/automoviles/customer")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findAll() {
        return customerService.findAll();
    }

    @GetMapping("/mine")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findMyClients() {
        return customerService.findMyClients();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findById(@PathVariable long id) {
        return customerService.findById(id);
    }

    @PostMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> save(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> update(@PathVariable long id,@RequestBody Customer customer) {
        return customerService.update(id,customer);
    }

    @DeleteMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> delete(@PathVariable long id) {
        return customerService.deleteById(id);
    }
}

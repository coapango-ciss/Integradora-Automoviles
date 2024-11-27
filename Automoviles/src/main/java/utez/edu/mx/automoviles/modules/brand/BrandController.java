package utez.edu.mx.automoviles.modules.brand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/automoviles/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return brandService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> findById(@PathVariable int id) {
        return brandService.findById(id);
    }

    @PostMapping("")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> save(@RequestBody Brand Brand) {
        return brandService.save(Brand);
    }

    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> update(@PathVariable int id,@RequestBody Brand Brand) {
        return brandService.update(id,Brand);
    }

    @DeleteMapping("/{id}")
    @Secured({"ROLE_ADMIN","ROLE_EMPLOYEE"})
    public ResponseEntity<?> delete(@PathVariable int id) {
        return brandService.deleteById(id);
    }
}

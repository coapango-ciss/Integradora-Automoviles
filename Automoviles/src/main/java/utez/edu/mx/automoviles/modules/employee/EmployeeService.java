package utez.edu.mx.automoviles.modules.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.automoviles.modules.employee.DTO.EmployeeDTO;
import utez.edu.mx.automoviles.modules.rol.Rol;
import utez.edu.mx.automoviles.utils.CustomResponseEntity;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CustomResponseEntity customResponseEntity;

    public EmployeeDTO transformToDTO(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getName(),
                employee.getSurname(),
                employee.getLastname(),
                employee.getUsername(),
                employee.getRol()
        );
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<EmployeeDTO> employees = new ArrayList<>();
        String message = "";
        if(employeeRepository.findAll().isEmpty()) message = "Aun no hay empleados registrados";
        else{
          for(Employee employee : employeeRepository.findAll()){
              employees.add(transformToDTO(employee));
          }
          message = "Operación exitosa";
        }
        return customResponseEntity.getOkResponse(message,"OK",200,employees);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id){
        EmployeeDTO found;
        if (employeeRepository.findById(id) == null) return customResponseEntity.get404Response();
        else {
            try {
                found = transformToDTO(employeeRepository.findById(id));
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200,found);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> save(Employee employee){
        try {
            Rol rol = new Rol();
            rol.setId(2);
            employee.setRol(rol);
            employee.setPassword(employee.getUsername());
            employeeRepository.save(employee);
            return customResponseEntity.getOkResponse("Registro exitoso", "CREATED", 201, null);
        } catch (Exception e){
            e.getMessage();
            e.printStackTrace();
            return customResponseEntity.get400Response();
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> update(long id,Employee employee){
        Employee found = employeeRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                employee.setId(id);
                employee.setPassword(found.getPassword());
                employee.setRol(found.getRol());
                employeeRepository.save(employee);
                return customResponseEntity.getOkResponse("Actualización exitosa", "OK", 200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }


    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> deleteById(long id){
        Employee found = employeeRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                employeeRepository.deleteById(id);
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}

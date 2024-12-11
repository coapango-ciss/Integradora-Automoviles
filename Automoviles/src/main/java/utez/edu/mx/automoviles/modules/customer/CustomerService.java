package utez.edu.mx.automoviles.modules.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.automoviles.modules.customer.DTO.CustomerDTO;
import utez.edu.mx.automoviles.modules.employee.Employee;
import utez.edu.mx.automoviles.modules.employee.EmployeeRepository;
import utez.edu.mx.automoviles.utils.CustomResponseEntity;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    private CustomResponseEntity customResponseEntity;


    public CustomerDTO transformToDTO(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getSurname(),
                customer.getLastname(),
                customer.getTelephoneNumber(),
                customer.getEmail(),
                customer.getEmployee()
        );
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<CustomerDTO> customers = new ArrayList<>();
        String message = "";
        if(customerRepository.findAll().isEmpty()) message = "Aun no hay empleados registrados";
        else{
            for(Customer customer : customerRepository.findAll()){
                customers.add(transformToDTO(customer));
            }
            message = "Operación exitosa";
        }
        return customResponseEntity.getOkResponse(message,"OK",200,customers);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id){
        CustomerDTO found;
        if (customerRepository.findById(id) == null) return customResponseEntity.get404Response();
        else {
            try {
                found = transformToDTO(customerRepository.findById(id));
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200,found);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> save(Customer customer){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Nombre del usuario autenticado
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) return customResponseEntity.get404Response();
        else {
            try {
                customer.setEmployee(employee);
                customerRepository.save(customer);
                return customResponseEntity.getOkResponse("Registro exitoso", "CREATED", 201, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> update(long id,Customer customer){
        Customer found = customerRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                customer.setId(id);
                customerRepository.save(customer);
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
        Customer found = customerRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                customerRepository.deleteById(id);
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}


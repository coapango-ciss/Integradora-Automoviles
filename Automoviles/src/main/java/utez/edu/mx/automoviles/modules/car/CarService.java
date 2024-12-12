package utez.edu.mx.automoviles.modules.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.automoviles.modules.car.DTO.CarDTO;
import utez.edu.mx.automoviles.modules.customer.Customer;
import utez.edu.mx.automoviles.modules.customer.CustomerRepository;
import utez.edu.mx.automoviles.modules.customer.DTO.CustomerDTO;
import utez.edu.mx.automoviles.modules.employee.Employee;
import utez.edu.mx.automoviles.modules.employee.EmployeeRepository;
import utez.edu.mx.automoviles.utils.CustomResponseEntity;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class CarService { 
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private CustomResponseEntity customResponseEntity;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public CarDTO transformToDTO(Car car) {
        return new CarDTO(
                car.getId(),
                car.getModel(),
                car.getColor(),
                car.getRegisterDate(),
                car.getSellDate(),
                car.getPrice(),
                car.getBrand(),
                car.isStatus(),
                car.getCustomer(),
                car.getServices()
        );
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<CarDTO> cars = new ArrayList<>();
        String message = "";
        if(carRepository.findAll().isEmpty()) message = "Aun no hay autos";
        else{
            for(Car car : carRepository.findAll()){
                cars.add(transformToDTO(car));
            }
            message = "Operación exitosa";
        }
        return customResponseEntity.getOkResponse(message,"OK",200,cars);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findSellingCars(){
        List<CarDTO> cars = new ArrayList<>();
            String message = "";
            if(carRepository.findSellingCars().isEmpty()) message = "Aun no hay autos";
            else{
                for(Car car : carRepository.findSellingCars()){
                    cars.add(transformToDTO(car));
                }
                message = "Operación exitosa";
            }
            return customResponseEntity.getOkResponse(message,"OK",200,cars);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findMySales(){
        Authentication currentAuthentication = SecurityContextHolder.getContext().getAuthentication();
        String username = currentAuthentication.getName(); // Nombre del usuario autenticado
        Employee currentEmployee = employeeRepository.findByUsername(username);

        List<CarDTO> cars = new ArrayList<>();
        String message = "";
        if(carRepository.findSoldCarsByEmployee(currentEmployee.getId()).isEmpty()) message = "Aun no hay autos";
        else{
            for(Car car : carRepository.findSoldCarsByEmployee(currentEmployee.getId())){
                cars.add(transformToDTO(car));
            }
            message = "Operación exitosa";
        }
        return customResponseEntity.getOkResponse(message,"OK",200,cars);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id){
            CarDTO found;
            if (carRepository.findById(id) == null) return customResponseEntity.get404Response();
            else {
                try {
                    found = transformToDTO(carRepository.findById(id));
                    return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200,found);
                } catch (Exception e){
                    e.getMessage();
                    e.printStackTrace();
                    return customResponseEntity.get400Response();
                }
            }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> save(Car car){
        try {
            Date fecha = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm", new Locale("es-MX"));
            car.setRegisterDate(sdf.format(fecha));
            car.setStatus(false);
            carRepository.save(car);
            return customResponseEntity.getOkResponse("Registro exitoso", "CREATED", 201, null);
        } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> update(long id,Car car){
        Car found = carRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                car.setId(id);
                car.setRegisterDate(found.getRegisterDate());
                carRepository.save(car);
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
        Car found = carRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                carRepository.deleteById(id);
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class,SQLException.class})
    public ResponseEntity<?> sell(long id, CustomerDTO customer){
        Customer soldTo = customerRepository.findById(customer.getId());
        Car found = carRepository.findById(id);
        if(soldTo == null) return customResponseEntity.get404Response();
        if(found == null) return customResponseEntity.get404Response();
        else {
            try {
                Date fecha = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm", new Locale("es-MX"));
                found.setSellDate(sdf.format(fecha));
                found.setStatus(true);
                found.setCustomer(soldTo);
                System.out.println(soldTo.getName());
                return customResponseEntity.getOkResponse(
                        "Venta completada exitosamente",
                        "OK",
                        200,
                        null
                );
            } catch (Exception e) {
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}


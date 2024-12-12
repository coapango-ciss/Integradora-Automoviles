package utez.edu.mx.automoviles.modules.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.automoviles.modules.service.DTO.ServiceDTO;
import utez.edu.mx.automoviles.utils.CustomResponseEntity;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private CustomResponseEntity customResponseEntity;

    public ServiceDTO transformToDTO(utez.edu.mx.automoviles.modules.service.Service service) {
        return new ServiceDTO(
                service.getId(),
                service.getCode(),
                service.getName(),
                service.getDescription(),
                service.getPrice()
        );
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<ServiceDTO> services = new ArrayList<>();
        String message = "";
        if(serviceRepository.findAll().isEmpty()) message = "Aun no hay empleados registrados";
        else{
            for(utez.edu.mx.automoviles.modules.service.Service service : serviceRepository.findAll()){
                services.add(transformToDTO(service));
            }
            message = "Operación exitosa";
        }
        return customResponseEntity.getOkResponse(message,"OK",200,services);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(int id){
        ServiceDTO found;
        if (serviceRepository.findById(id) == null) return customResponseEntity.get404Response();
        else {
            try {
                found = transformToDTO(serviceRepository.findById(id));
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200,found);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> save(utez.edu.mx.automoviles.modules.service.Service service){
        try {
            serviceRepository.save(service);
            return customResponseEntity.getOkResponse("Registro exitoso", "CREATED", 201, null);
        } catch (Exception e){
            e.getMessage();
            e.printStackTrace();
            return customResponseEntity.get400Response();
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> update(int id, utez.edu.mx.automoviles.modules.service.Service service){
        utez.edu.mx.automoviles.modules.service.Service found = serviceRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                service.setId(id);
                serviceRepository.save(service);
                return customResponseEntity.getOkResponse("Actualización exitosa", "OK", 200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }


    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> deleteById(int id){
        utez.edu.mx.automoviles.modules.service.Service found = serviceRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                serviceRepository.deleteById(id);
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}


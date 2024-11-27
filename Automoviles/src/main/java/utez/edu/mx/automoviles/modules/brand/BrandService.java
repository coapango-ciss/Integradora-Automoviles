package utez.edu.mx.automoviles.modules.brand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.automoviles.utils.CustomResponseEntity;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private CustomResponseEntity customResponseEntity;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<Brand> brands = new ArrayList<Brand>();
        String message = "";
        if(brandRepository.findAll().isEmpty()) message = "Aun no hay marcas registradas";
        else{
            for(Brand brand : brandRepository.findAll()){
                brands.add(brand);
            }
            message = "Operación exitosa";
        }
        return customResponseEntity.getOkResponse(message,"OK",200,brands);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(int id){
        Brand found;
        if (brandRepository.findById(id) == null) return customResponseEntity.get404Response();
        else {
            try {
                found = brandRepository.findById(id);
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200,found);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> save(Brand brand){
        try {
            brandRepository.save(brand);
            return customResponseEntity.getOkResponse("Registro exitoso", "CREATED", 201, null);
        } catch (Exception e){
            e.getMessage();
            e.printStackTrace();
            return customResponseEntity.get400Response();
        }
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    public ResponseEntity<?> update(int id,Brand brand){
        Brand found = brandRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                brand.setId(id);
                brandRepository.save(brand);
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
        Brand found = brandRepository.findById(id);
        if (found == null) return customResponseEntity.get404Response();
        else {
            try {
                brandRepository.deleteById(id);
                return customResponseEntity.getOkResponse("Operacion exitosa", "OK",200, null);
            } catch (Exception e){
                e.getMessage();
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}

package utez.edu.mx.automoviles.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.automoviles.auth.DTO.AuthLoginDTO;
import utez.edu.mx.automoviles.modules.employee.Employee;
import utez.edu.mx.automoviles.modules.employee.EmployeeDetailsImpl;
import utez.edu.mx.automoviles.modules.employee.EmployeeRepository;
import utez.edu.mx.automoviles.utils.CustomResponseEntity;
import utez.edu.mx.automoviles.utils.security.JWTUtil;


@Service
public class AuthService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CustomResponseEntity customResponseEntity;

    @Autowired
    private JWTUtil jwtUtil;

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(AuthLoginDTO authLoginDTO) {
        Employee found = employeeRepository.findByUsernameAndPassword(
                authLoginDTO.getUsername(),
                authLoginDTO.getPassword()
        );
        if(found == null) {
            return customResponseEntity.get404Response();
        } else {
            try {
                UserDetails userDetails = new EmployeeDetailsImpl(found);
                return customResponseEntity.getOkResponse(
                        "Inicio de sesión exitoso",
                        "OK",
                        200,
                        jwtUtil.generateToken(userDetails)
                );
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}

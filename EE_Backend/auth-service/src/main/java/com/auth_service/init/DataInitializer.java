package com.auth_service.init;

import com.auth_service.model.Role;
import com.auth_service.model.User;
import com.auth_service.repository.RoleRepository;
import com.auth_service.repository.UserRepository;
import com.auth_service.utils.UserCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

@Component
@Order(2)
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserCodeGenerator userCodeGenerator;

    @Override
    public void run(String... args) throws Exception {
        // Buscamos el rol ROLE_ADMIN, si no existe lanzamos error
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Role ROLE_ADMIN not found"));

        // Verificamos si existe algún usuario con ese rol
        boolean adminExists = userRepository.existsByRole(adminRole);

        // Generamos código único para el usuario admin
        String uniqueCode = userCodeGenerator.generateUniqueUserCode();

        if (!adminExists) {
            // Creamos el usuario admin por defecto
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role(adminRole)
                    .active(true)
                    .userCode(uniqueCode)
                    .build();

            userRepository.save(admin);
            System.out.println("Usuario admin creado: username=admin, password=admin123");
        } else {
            System.out.println("Ya existe un usuario admin, no se creó uno nuevo.");
        }
    }
}

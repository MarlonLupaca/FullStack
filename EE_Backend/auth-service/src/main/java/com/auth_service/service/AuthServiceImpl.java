package com.auth_service.service;

import com.auth_service.dto.request.ChangePasswordRequest;
import com.auth_service.dto.request.UserRequest;
import com.auth_service.dto.response.LoginResponse;
import com.auth_service.dto.response.UserResponse;
import com.auth_service.model.Role;
import com.auth_service.model.User;
import com.auth_service.repository.RoleRepository;
import com.auth_service.repository.UserRepository;
import com.auth_service.utils.JwtUtil;
import com.auth_service.utils.UserCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserCodeGenerator userCodeGenerator;
    

    @Override
    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Usuario inactivo");
        }

        String roleName = user.getRole().getName();

        // Generamos token con username, userCode y rol
        return jwtUtil.generateToken(user.getUsername(), user.getUserCode(), roleName);
    }


    @Override
    public UserResponse register(UserRequest userRequest) {
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }

        String uniqueCode = userCodeGenerator.generateUniqueUserCode();

        // Por defecto asignamos el rol USER al registrar
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role USER no encontrado"));

        User user = User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(userRole)
                .active(true)
                .userCode(uniqueCode)
                .build();

        userRepository.save(user);

        return new UserResponse(user.getUserCode(), user.getUsername(), user.getRole().getName(), user.isActive());
    }

    @Override
    public List<UserResponse> getUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> new UserResponse(user.getUserCode(), user.getUsername(), user.getRole().getName(), user.isActive()))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return new UserResponse(user.getUserCode(), user.getUsername(), user.getRole().getName(), user.isActive());
    }

    @Override
    public String changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return "Contraseña actualizada exitosamente";
    }

    @Override
    public String toggleUserStatus(String userCode) {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean newStatus = !user.isActive();
        user.setActive(newStatus);

        userRepository.save(user);

        return "Usuario " + (newStatus ? "activado" : "desactivado") + " exitosamente";
    }

    @Override
    public boolean validateToken(String token) {
        try {
            String username = jwtUtil.extractUsername(token);
            return !jwtUtil.isTokenExpired(token) && userRepository.findByUsername(username).isPresent();
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public UserResponse getUserByUserCode(String userCode) {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return new UserResponse(user.getUserCode(), user.getUsername(), user.getRole().getName(), user.isActive());
    }

    // ------------------ NUEVOS MÉTODOS PARA ROLES ------------------

    /**
     * Obtener todos los roles disponibles
     */

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    /**
     * Asignar un nuevo rol a un usuario (solo admins)
     */
    public String assignRoleToUser(String userCode, String roleName) {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        user.setRole(role);
        userRepository.save(user);

        return "Rol " + roleName + " asignado al usuario " + user.getUsername() + " correctamente";
    }

}

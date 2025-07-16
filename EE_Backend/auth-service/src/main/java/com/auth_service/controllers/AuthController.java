package com.auth_service.controllers;

import com.auth_service.dto.request.AssignRoleRequest;
import com.auth_service.dto.request.ChangePasswordRequest;
import com.auth_service.dto.request.LoginRequest;
import com.auth_service.dto.request.UserRequest;
import com.auth_service.dto.response.LoginResponse;
import com.auth_service.dto.response.UserResponse;
import com.auth_service.service.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authService;

    // Logear y devolver solo token
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRequest userRequest) {
        try {
            UserResponse response = authService.register(userRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error interno en el servidor"));
        }
    }


    //Jalar a todo los usuarios
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers() {
        try {
            List<UserResponse> users = authService.getUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //buscar usuario por ID
    @GetMapping("/users/{userCode}")
    public ResponseEntity<UserResponse> getUserByUserCode(@PathVariable String userCode) {
        try {
            System.out.println(userCode);
            UserResponse user = authService.getUserByUserCode(userCode);



            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Cambiar contraseña
    @PutMapping("/users/{username}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable String username, @RequestBody ChangePasswordRequest request) {
        try {
            String result = authService.changePassword(username, request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Desactivar usuario por ID
    @PutMapping("/users/toggle/{userCode}")
    public ResponseEntity<String> toggleUserStatus(@PathVariable String userCode) {
        try {
            String result = authService.toggleUserStatus(userCode);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Obtener todos los roles disponibles
    @GetMapping("/roles")
    public ResponseEntity<?> getAllRoles() {
        try {
            return ResponseEntity.ok(authService.getAllRoles());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener los roles"));
        }
    }

    // Asignar un rol a un usuario por su userCode
    @PutMapping("/users/{userCode}/assign-role")
    public ResponseEntity<?> assignRoleToUser(
            @PathVariable String userCode,
            @RequestBody AssignRoleRequest request
    ) {
        try {
            String result = authService.assignRoleToUser(userCode, request.getRoleName());
            return ResponseEntity.ok(Map.of("message", result));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    // Obtener perfil por username (puede usarse después de verificar el token)
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        try {
            UserResponse user = authService.getProfile(username);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    // Validar token JWT
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(Map.of("valid", isValid));
    }


}

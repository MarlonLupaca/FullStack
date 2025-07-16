package com.auth_service.repository;

import com.auth_service.model.Role;
import com.auth_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Buscar usuario por username (para login, validación, etc.)
    Optional<User> findByUsername(String username);

    Optional<User> findByUserCode(String userCode);

    // Verificar si un username ya existe (para prevenir duplicados en registro)
    boolean existsByUsername(String username);

    // Verificar si un userCode ya existe (para evitar duplicados en generación)
    boolean existsByUserCode(String userCode);

    boolean existsByRole(Role role);
}

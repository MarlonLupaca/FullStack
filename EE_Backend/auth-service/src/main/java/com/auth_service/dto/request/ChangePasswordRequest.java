package com.auth_service.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO para la petición de cambio de contraseña,
 * contiene la contraseña actual y la nueva.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String currentPassword;
    private String newPassword;
}

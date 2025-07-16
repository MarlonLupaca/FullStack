package com.auth_service.service;

import com.auth_service.dto.request.ChangePasswordRequest;
import com.auth_service.dto.request.UserRequest;
import com.auth_service.dto.response.UserResponse;

import java.util.List;

public interface AuthService {
    public String login(String username, String password);
    public UserResponse register(UserRequest userRequest);
    public List<UserResponse> getUsers();
    public UserResponse getProfile(String username);
    public String toggleUserStatus(String userCode);
    public boolean validateToken(String token);
    public String changePassword(String username, ChangePasswordRequest request);
    public UserResponse getUserByUserCode(String userCode);
}

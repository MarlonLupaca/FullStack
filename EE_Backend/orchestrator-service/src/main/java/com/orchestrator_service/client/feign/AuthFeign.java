package com.orchestrator_service.client.feign;

import com.orchestrator_service.client.dto.request.AuthFeignRequest;
import com.orchestrator_service.client.dto.response.AuthFeignResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

// Usa Eureka para descubrir "auth-service"
@FeignClient(name = "auth-service")
public interface AuthFeign {

    @PostMapping("/auth/register")
    AuthFeignResponse createUser(@RequestBody AuthFeignRequest authFeignRequest);

    @GetMapping("/auth/users")
    List<AuthFeignResponse> getAllUsers();

    @GetMapping("/auth/users/{userCode}")
    AuthFeignResponse getUser(@PathVariable String userCode);
}

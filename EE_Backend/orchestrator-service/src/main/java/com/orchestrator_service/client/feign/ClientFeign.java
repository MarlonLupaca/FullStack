package com.orchestrator_service.client.feign;

import com.orchestrator_service.client.dto.request.ClientFeignRequest;
import com.orchestrator_service.client.dto.response.ClientFeingResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

// Usa el nombre del servicio registrado en Eureka
@FeignClient(name = "client-service")
public interface ClientFeign {

    @PostMapping("/customers")
    ClientFeingResponse createClient(@RequestBody ClientFeignRequest clientFeignRequest);

    @GetMapping("/customers")
    List<ClientFeingResponse> getAllUsers();

    @GetMapping("/customers/{userCode}")
    ClientFeingResponse getCustomer(@PathVariable String userCode);
}

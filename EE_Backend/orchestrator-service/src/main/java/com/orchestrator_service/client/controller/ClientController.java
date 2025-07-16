package com.orchestrator_service.client.controller;

import com.orchestrator_service.client.dto.request.ClientRequest;
import com.orchestrator_service.client.dto.response.ClientResponse;
import com.orchestrator_service.client.service.ServiceClientImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchestrator")
@RequiredArgsConstructor
public class ClientController {

    @Autowired
    private final ServiceClientImpl serviceClient;

    @PostMapping("/register")
    public ResponseEntity<ClientResponse> registerClient(@RequestBody ClientRequest clientRequest) {
        System.out.println(clientRequest);
        ClientResponse clientResponse = serviceClient.createClient(clientRequest);
        return ResponseEntity.ok(clientResponse);
    }

    @GetMapping("/clients")
    public ResponseEntity<List<ClientResponse>> getAllClients() {
        List<ClientResponse> clients = serviceClient.getClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/clients/{userCode}")
    public ResponseEntity<ClientResponse> getClient(@PathVariable String userCode) {
        try {
            ClientResponse response = serviceClient.getClientByUserCode(userCode);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}

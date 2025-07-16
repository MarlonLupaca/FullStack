package com.orchestrator_service.client.service;

import com.orchestrator_service.client.dto.request.AuthFeignRequest;
import com.orchestrator_service.client.dto.request.ClientFeignRequest;
import com.orchestrator_service.client.dto.request.ClientRequest;
import com.orchestrator_service.client.dto.response.AuthFeignResponse;
import com.orchestrator_service.client.dto.response.ClientFeingResponse;
import com.orchestrator_service.client.dto.response.ClientResponse;
import com.orchestrator_service.client.feign.AuthFeign;
import com.orchestrator_service.client.feign.ClientFeign;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceClientImpl implements ServiceClient {

    private final ClientFeign clientFeign;
    private final AuthFeign authFeign;

    @Override
    public ClientResponse createClient(ClientRequest clientRequest) {
        try {

            // 1. Crear usuario en auth-service
            AuthFeignRequest authRequest = AuthFeignRequest.builder()
                    .username(clientRequest.getUsername())
                    .password(clientRequest.getPassword())
                    .rol(clientRequest.getRol())
                    .build();

            System.out.println(authRequest);

            AuthFeignResponse authFeignResponse = authFeign.createUser(authRequest);

            System.out.println(authFeignResponse);

            // 2. Crear cliente en client-service
            ClientFeignRequest clientFeignRequest = ClientFeignRequest.builder()
                    .userCode(authFeignResponse.getUserCode())
                    .firstName(clientRequest.getFirstName())
                    .lastName(clientRequest.getLastName())
                    .email(clientRequest.getEmail())
                    .phoneNumber(clientRequest.getPhoneNumber())
                    .address(clientRequest.getAddress())
                    .build();


            System.out.println(clientFeignRequest);

            ClientFeingResponse clientFeingResponse = clientFeign.createClient(clientFeignRequest);

            System.out.println(clientFeingResponse);

            // 3. Construir y devolver respuesta combinada
            return ClientResponse.builder()
                    .usercode(authFeignResponse.getUserCode())
                    .username(authFeignResponse.getUsername())
                    .active(authFeignResponse.isActive())
                    .rol(authFeignResponse.getRol())
                    .fullname(clientFeingResponse.getFullName())
                    .email(clientFeingResponse.getEmail())
                    .phoneNumber(clientFeingResponse.getPhoneNumber())
                    .address(clientFeingResponse.getAddress()) // ← aquí
                    .registrationDate(clientFeingResponse.getRegistrationDate())
                    .purchaseCount(clientFeingResponse.getPurchaseCount())
                    .totalSpent(clientFeingResponse.getTotalSpent())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Error durante el registro de usuario y cliente: " + e.getMessage(), e);
        }
    }


    @Override
    public ClientResponse updateClient(ClientRequest clientRequest) {
        return null;
    }

    @Override
    public List<ClientResponse> getClients() {
        List<AuthFeignResponse> listUsers = authFeign.getAllUsers();
        List<ClientFeingResponse> listClients = clientFeign.getAllUsers();

        // Crear un mapa de clientes por userCode
        Map<String, ClientFeingResponse> clientMap = listClients.stream()
                .collect(Collectors.toMap(ClientFeingResponse::getUserCode, client -> client));

        // Recorrer usuarios y combinar con datos de cliente (si existe)
        return listUsers.stream()
                .map(user -> {
                    ClientFeingResponse client = clientMap.get(user.getUserCode());

                    return ClientResponse.builder()
                            .usercode(user.getUserCode())
                            .username(user.getUsername())
                            .active(user.isActive())
                            .rol(user.getRol())
                            .fullname(client != null ? client.getFullName() : "Sin información")
                            .email(client != null ? client.getEmail() : "Sin información")
                            .phoneNumber(client != null ? client.getPhoneNumber() : "Sin información")
                            .address(client != null ? client.getAddress() : "Sin información")
                            .registrationDate(client != null ? client.getRegistrationDate() : null)
                            .purchaseCount(client != null ? client.getPurchaseCount() : 0)
                            .totalSpent(client != null ? client.getTotalSpent() : 0.0)
                            .build();
                })
                .toList();
    }


    @Override
    public ClientResponse getClientByUserCode(String userCode) {
        try {
            AuthFeignResponse user = authFeign.getUser(userCode);

            ClientFeingResponse client = clientFeign.getCustomer(userCode);

            return ClientResponse.builder()
                    .usercode(user.getUserCode())
                    .username(user.getUsername())
                    .active(user.isActive())
                    .rol(user.getRol())
                    .fullname(client.getFullName())
                    .email(client.getEmail())
                    .phoneNumber(client.getPhoneNumber())
                    .address(client.getAddress())
                    .registrationDate(client.getRegistrationDate())
                    .purchaseCount(client.getPurchaseCount())
                    .totalSpent(client.getTotalSpent())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el cliente por userCode: " + e.getMessage(), e);
        }
    }
}

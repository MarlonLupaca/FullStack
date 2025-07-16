package com.orchestrator_service.client.service;

import com.orchestrator_service.client.dto.request.ClientRequest;
import com.orchestrator_service.client.dto.response.ClientResponse;

import java.util.List;

public interface ServiceClient {
    ClientResponse createClient(ClientRequest clientRequest);
    ClientResponse updateClient(ClientRequest clientRequest);
    List<ClientResponse> getClients();
    public ClientResponse getClientByUserCode(String userCode);
}

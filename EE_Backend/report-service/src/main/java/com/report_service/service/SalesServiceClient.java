package com.report_service.service;

import com.report_service.dto.SalesSummaryDTO;
import com.report_service.dto.TopProductDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class SalesServiceClient {
    private final WebClient webClient;

    String serviceUrl = "http://sales-service";

    public SalesServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(this.serviceUrl).build();
    }

    public Mono<SalesSummaryDTO> getSalesSummary(LocalDate startDate, LocalDate endDate) {
        return webClient.get()
                .uri("/api/sales/summary?startDate={start}&endDate={end}", startDate, endDate)
                .retrieve()
                .bodyToMono(SalesSummaryDTO.class);
    }

    public Mono<List<TopProductDTO>> getTopSellingProducts() {
        return webClient.get()
                .uri("/api/sales/top-products")
                .retrieve()
                .bodyToMono(TopProductDTO[].class)
                .map(Arrays::asList);
    }
}

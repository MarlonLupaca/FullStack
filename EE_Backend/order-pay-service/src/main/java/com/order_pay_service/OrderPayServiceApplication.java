package com.order_pay_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class OrderPayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderPayServiceApplication.class, args);
	}

}

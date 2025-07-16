package com.report_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableDiscoveryClient
@SpringBootApplication
//@EnableJpaRepositories(basePackages = "com.report_service.repository")
public class ReportServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReportServiceApplication.class, args);
	}

}

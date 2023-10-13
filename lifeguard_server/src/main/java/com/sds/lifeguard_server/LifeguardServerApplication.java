package com.sds.lifeguard_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class LifeguardServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LifeguardServerApplication.class, args);
	}

}

package com.ffock.gymanalyzer;

import org.springframework.boot.SpringApplication;

public class TestGymanalyzerApplication {

	public static void main(String[] args) {
		SpringApplication.from(GymanalyzerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}

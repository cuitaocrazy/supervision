package com.yada.encryptByPubk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class EncryptByPubkApplication {

	public static void main(String[] args) {
		SpringApplication.run(EncryptByPubkApplication.class, args);
	}

}

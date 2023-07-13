package com.hamhabocca.dallibocca.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = "com.hamhabocca.dallibocca")
@EnableJpaRepositories(basePackages = "com.hamhabocca.dallibocca")
public class JPAConfiguration {

}

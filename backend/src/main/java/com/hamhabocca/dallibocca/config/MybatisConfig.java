package com.hamhabocca.dallibocca.config;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = {"com.hamhabocca.dallibocca"}, annotationClass = Mapper.class)
public class MybatisConfig {

}

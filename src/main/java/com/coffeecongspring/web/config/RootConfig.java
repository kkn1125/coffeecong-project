package com.coffeecongspring.web.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan(basePackages = {"com.coffeespring.web"}, annotationClass = org.apache.ibatis.annotations.Mapper.class)
public class RootConfig
{
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource mysql = new DriverManagerDataSource();
		mysql.setDriverClassName("com.mysql.cj.jdbc.Driver");
		mysql.setUrl("jdbc:mysql://localhost:3306/coffeespring");
		mysql.setUsername("root");
		mysql.setUsername("1234");
		return mysql;
	}
	
	@Bean
	public SqlSessionFactory sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource());
		return bean.getObject();
	}
}

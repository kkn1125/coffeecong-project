package com.coffeecongspring.web.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan(basePackages = {"com.coffeecongspring.web"}, annotationClass = org.apache.ibatis.annotations.Mapper.class)
public class RootConfig
{
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource mysql = new DriverManagerDataSource();
		mysql.setDriverClassName("com.mysql.cj.jdbc.Driver");
		mysql.setUrl("jdbc:mysql://localhost:3306/coffeespring");
		mysql.setUsername("root");
		mysql.setPassword("1234");
//		mysql.setUrl("jdbc:mysql://o7ubfi2wnp9wj8pw:f9cc8eqwdzsd5mrv@ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/kx15nbovban3cm41");
//		mysql.setUsername("o7ubfi2wnp9wj8pw");
//		mysql.setPassword("f9cc8eqwdzsd5mrv");
		return mysql;
	}
	
	@Bean
	public SqlSessionFactory sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource());
		return bean.getObject();
	}
}

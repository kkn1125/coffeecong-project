package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.ProductMapper;
import com.coffeecongspring.web.vo.Product;

@Service
public class ProductService{
	@Autowired
	ProductMapper productMapper;

	public List<Product> findAll() {
		return productMapper.findAll();
	}

	public Product findByNum(int num) {
		return productMapper.findByNum(num).orElse(null);
	}

	public Product findByPid(String pid) {
		return productMapper.findByPid(pid).orElse(null);
	}

	public Integer add(Product product) {
		productMapper.add(product);
		return product.getNum();
	}

	public Integer update(Product product) {
		productMapper.update(product);
		return product.getNum();
	}

	public Integer delete(int num) {
		return productMapper.delete(num);
	}
	
}

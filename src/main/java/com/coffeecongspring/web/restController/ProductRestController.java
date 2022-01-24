package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.ProductService;
import com.coffeecongspring.web.vo.Product;

@RestController
@RequestMapping("/product")
public class ProductRestController {
	@Autowired
	public ProductService productService;
	
	@GetMapping("")
	public List<Product> findByNum() {
		return productService.findAll();
	}
	
	@GetMapping("/{num}")
	public Product findByNum(@PathVariable("num") int num) {
		return productService.findByNum(num);
	}
}

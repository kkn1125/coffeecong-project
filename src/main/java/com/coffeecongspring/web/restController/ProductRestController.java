package com.coffeecongspring.web.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductRestController {
	@Autowired
	public ProductService productService;
	
	@GetMapping("/{num}")
	public String findByNum(@PathVariable("num") int num) {
		
		return null;
	}
}

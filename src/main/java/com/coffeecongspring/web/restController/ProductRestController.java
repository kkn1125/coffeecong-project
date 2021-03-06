package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.ProductService;
import com.coffeecongspring.web.vo.Base;
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
	public Product findByNum(@PathVariable("num") String num) {
		if(Base.isNumber(num)) {
			return productService.findByNum(Integer.parseInt(num));
		} else {			
			return productService.findByPid(num);
		}
	}
	
	@GetMapping("/category/{category}")
	public List<Product> findByCategory(@PathVariable("category") String category) {
		return productService.findByCategory(category);
	}
}

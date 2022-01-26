package com.coffeecongspring.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mall")
public class ProductController {
	
	@GetMapping("")
	public String notice() {
		return "root.mall";
	}
	
	@GetMapping("/{num}")
	public String detail(@PathVariable("num") int num) {
		return "mall.detail";
	}
	
}

package com.coffeecongspring.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {
	
	@GetMapping("")
	public String home() {
		return "root.home";
	}
	
	@GetMapping("mall")
	public String notice() {
		return "root.mall";
	}
	
	@GetMapping("signin")
	public String signin() {
		return "root.signin";
	}
	
	@GetMapping("signup")
	public String signup() {
		return "root.signup";
	}
	
	@GetMapping("about")
	public String about() {
		return "root.about";
	}
	
}

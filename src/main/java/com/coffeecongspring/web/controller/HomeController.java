package com.coffeecongspring.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class HomeController {
	@GetMapping("")
	public String home() {
		return "root.home";
	}
	
	@GetMapping("signin")
	public String signin() {
		return "root.signin";
	}
	
	@PostMapping("signin")
	public String signin(String id, String password) {
		return "redirect:/";
	}
	
	@GetMapping("signup")
	public String signup() {
		return "root.signup";
	}
}

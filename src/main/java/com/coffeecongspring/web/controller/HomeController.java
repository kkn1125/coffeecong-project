package com.coffeecongspring.web.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.coffeecongspring.web.service.MemberService;
import com.coffeecongspring.web.vo.Member;

@Controller
@RequestMapping("/")
public class HomeController {
	
	@Autowired
	private MemberService memberService;
	
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

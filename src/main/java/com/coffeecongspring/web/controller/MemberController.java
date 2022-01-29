package com.coffeecongspring.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/setting")
public class MemberController {
	@GetMapping("")
	public String setting() {
		return "member.setting";
	}
}

package com.coffeecongspring.web.restController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberRestController {
	@GetMapping("/{num}")
	public String findByNum(@PathVariable("num") int num) {
		
		return null;
	}
}

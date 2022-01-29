package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.MemberService;
import com.coffeecongspring.web.vo.Base;
import com.coffeecongspring.web.vo.Member;

@RestController
@RequestMapping("/member")
public class MemberRestController {
	@Autowired
	public MemberService memberService;
	
	@GetMapping("/gensample")
	public Integer genSample() {
		return memberService.genSample(30);
	}
	
	@GetMapping("")
	public List<Member> findAll() {
		return memberService.findAll();
	}
	
	@GetMapping("/{num}")
	public Member findByNum(@PathVariable("num") int num) {
		return memberService.findByNum(num);
	}
	
	@GetMapping("/id/{id}")
	public Member findById(@PathVariable("id") String id) {
		return memberService.findById(id);
	}
	
	@GetMapping("/email/{email}")
	public Member findByEmail(@PathVariable("email") String email) {
		return memberService.findByEmail(email);
	}
	
	@PostMapping("")
	public Integer add(Member member) {
		memberService.add(member);
		return member.getNum();
	}
	
	@DeleteMapping("/{num}")
	public Integer delete(@PathVariable("num") int num) {
		return memberService.delete(num);
	}
}
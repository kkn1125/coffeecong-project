package com.coffeecongspring.web.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.MemberMapper;
import com.coffeecongspring.web.vo.Base;
import com.coffeecongspring.web.vo.Member;

@Service
public class MemberService {
	@Autowired
	private MemberMapper memberMapper;
	
	public Integer genSample(int num) {
		List<Member> list = memberMapper.findAll();
		if(!list.isEmpty()) return null;
		
		Member member = new Member();
		for(int i=0; i<num; i++) {
			member = new Member();
			member.setId("test"+Base.leftPad(String.valueOf(i), "0", 3));
			member.setEmail("test"+Base.rightPad(String.valueOf(i), "0", 3)+"@naver.com");
			member.setPassword("1234");
			member.setName("kimson"+Base.rightPad(String.valueOf(i), "0", 3));
			member.setBirth(new java.sql.Date(new Date().getTime()));
			member.setAddress_main("서울특별시 00동"+Base.rightPad(String.valueOf(i), "0", 3));
			member.setAddress_sub(Base.leftPad(String.valueOf(i), "0", 3));
			member.setAddress_zip(56865);
			memberMapper.genSample(num, member);
		}
		return member.getNum();
	}

	public List<Member> findAll() {
		return memberMapper.findAll();
	}

	public Member findById(String id) {
		return memberMapper.findById(id).orElse(null);
	}

	public Member findByNum(int num) {
		return memberMapper.findByNum(num).orElse(null);
	}

	public Member findByEmail(String email) {
		return memberMapper.findByEmail(email).orElse(null);
	}

	public Integer add(Member member) {
		memberMapper.add(member);
		return member.getNum();
	}

	public Integer update(Member member) {
		memberMapper.update(member);
		return member.getNum();
	}

	public Integer delete(int num) {
		return memberMapper.delete(num);
	}

	
}

package com.coffeecongspring.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.MemberMapper;
import com.coffeecongspring.web.vo.Member;

@Service
public class MemberService {
	@Autowired
	MemberMapper memberMapper;

	public List<Member> findAll() {
		return memberMapper.findAll();
	}

	public List<Member> findById(String id) {
		return memberMapper.findById(id);
	}

	public List<Member> findByNum(int num) {
		return memberMapper.findByNum(num);
	}

	public List<Member> findByEmail(String email) {
		return memberMapper.findByEmail(email);
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

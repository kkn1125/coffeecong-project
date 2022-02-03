package com.coffeecongspring.web.mapper.provider;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import org.apache.ibatis.annotations.Param;

import com.coffeecongspring.web.vo.Member;

public class MemberProvider {
	public String update(@Param("member") Member member) {
		String sql = "UPDATE member SET";
		String temp = "";
		
		if(member.getId()!=null) {
			temp += " id=#{member.id}";
		}
		if(member.getEmail()!=null) {
			temp += " email=#{member.email}";
		}
		if(member.getAddress_main()!=null) {
			temp += " address_main=#{member.address_main}";
		}
		if(member.getAddress_sub()!=null) {
			temp += " address_sub=#{member.address_sub}";
		}
		if(member.getAddress_zip()>0) {
			temp += " address_zip=#{member.address_zip}";
		}
		if(member.getBirth()!=null) {
			temp += " birth=#{member.birth}";
		}
		if(member.getName()!=null) {
			temp += " name=#{member.name}";
		}
		if(member.getPassword()!=null) {
			temp += " password=#{member.password}";
		}
		String[] split = Stream.of(temp.split(" ")).map(x->x.trim()).filter(x->!x.isEmpty()).toArray(String[]::new);
		temp = String.join(",", split);
		sql += " " + temp + " WHERE num=#{member.num}";
		return sql;
	}
}

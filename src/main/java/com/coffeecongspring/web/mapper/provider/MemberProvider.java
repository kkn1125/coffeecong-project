package com.coffeecongspring.web.mapper.provider;

import org.apache.ibatis.annotations.Param;

import com.coffeecongspring.web.vo.Member;

public class MemberProvider {
	public String update(@Param("member") Member member) {
		String sql = "UPDATE member SET";
		if(member.getId()!=null) {
			sql += " id=#{id}";
		} else if(member.getEmail()!=null) {
			sql += " email=#{email}";
		} else if(member.getAddress_main()!=null) {
			sql += " address_main=#{address_main}";
		} else if(member.getAddress_sub()!=null) {
			sql += " address_sub=#{address_sub}";
		} else if(member.getAddress_zip()>0) {
			sql += " address_zip=#{address_zip}";
		} else if(member.getBirth()!=null) {
			sql += " birth=#{birth}";
		} else if(member.getName()!=null) {
			sql += " name=#{name}";
		} else if(member.getPassword()!=null) {
			sql += " password=#{password}";
		}
		return sql;
	}
}

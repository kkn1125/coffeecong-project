package com.coffeecongspring.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.UpdateProvider;

import com.coffeecongspring.web.mapper.provider.MemberProvider;
import com.coffeecongspring.web.vo.Member;

@Mapper
public interface MemberMapper {
	@Select("SELECT * FROM member")
	List<Member> findAll();
	
	@Select("SELECT * FROM member WHERE id=#{id}")
	List<Member> findById(@Param("id") String id);
	
	@Select("SELECT * FROM member WHERE num=#{num}")
	List<Member> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM member WHERE email=#{email}")
	List<Member> findByEmail(@Param("email") String email);
	
	@Insert("INSERT INTO member(id, email, password, name, birth, address_main, address_sub, address_zip) VALUES(#{member.id}, #{member.email}, #{member.password}, #{member.name}, #{member.birth}, #{member.address_main}, #{member.address_sub}, #{member.address_zip})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(Member member);
	
	@UpdateProvider(method = "update", type = MemberProvider.class)
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void update(Member member);
	
	@Delete("DELETE FROM member WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer delete(@Param("num") int num);
	
}

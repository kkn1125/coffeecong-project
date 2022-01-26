package com.coffeecongspring.web.mapper;

import java.util.List;
import java.util.Optional;

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
//	select
	@Select("SELECT * FROM member")
	List<Member> findAll();
	
	@Select("SELECT * FROM member WHERE id=#{id}")
	Optional<Member> findById(@Param("id") String id);
	
	@Select("SELECT * FROM member WHERE num=#{num}")
	Optional<Member> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM member WHERE email=#{email}")
	Optional<Member> findByEmail(@Param("email") String email);
	
//	insert
	@Insert("INSERT INTO member(id, email, password, name, birth, address_main, address_sub, address_zip) VALUES(#{member.id}, #{member.email}, #{member.password}, #{member.name}, #{member.birth}, #{member.address_main}, #{member.address_sub}, #{member.address_zip})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void genSample(@Param("num") int num, @Param("member") Member member);
	
	@Insert("INSERT INTO member(id, email, password, name, birth, address_main, address_sub, address_zip) VALUES(#{member.id}, #{member.email}, #{member.password}, #{member.name}, #{member.birth}, #{member.address_main}, #{member.address_sub}, #{member.address_zip})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("member") Member member);
	
//	update
	@UpdateProvider(method = "update", type = MemberProvider.class)
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void update(@Param("member") Member member);
	
//	delete
	@Delete("DELETE FROM member WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer delete(@Param("num") int num);
	
}

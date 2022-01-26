package com.coffeecongspring.web.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.coffeecongspring.web.vo.Like;

@Mapper
public interface LikeMapper {
//	select
	@Select("SELECT * FROM like")
	List<Like> findAll();
	
	@Select("SELECT * FROM like WHERE num=#{num}")
	Optional<Like> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM like WHERE mnum=#{mnum}")
	Optional<Like> findByMemberNum(@Param("mnum") int mnum);
	
	@Select("SELECT * FROM like WHERE pnum=#{pnum}")
	Optional<Like> findByProductNum(@Param("pnum") int pnum);
	
//	insert
	@Insert("INSERT INTO like (mnum, pnum) VALUES (#{like.mnum}, #{like.pnum})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("like") Like like);
	
//	delete
	@Delete("DELETE FROM like WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByNum(@Param("num") int num);
	
	@Delete("DELETE FROM like WHERE mnum=#{mnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByMemberNum(@Param("mnum") int mnum);
	
	@Delete("DELETE FROM like WHERE pnum=#{pnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByProductNum(@Param("pnum") int pnum);
}

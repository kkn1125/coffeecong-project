package com.coffeecongspring.web.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.coffeecongspring.web.vo.CommentTag;

@Mapper
public interface CommentTagMapper {
//	select
	@Select("SELECT * FROM comment_tag")
	List<CommentTag> findAll();

	@Select("SELECT * FROM comment_tag WHERE num=#{num}")
	Optional<CommentTag> findByNum(@Param("num") int num);

	@Select("SELECT * FROM comment_tag WHERE pnum=#{pnum}")
	Optional<CommentTag> findByProductNum(@Param("pnum") int pnum);

	@Select("SELECT * FROM comment_tag WHERE cnum=#{cnum}")
	Optional<CommentTag> findByCommentNum(@Param("cnum") int cnum);

//	insert
	@Insert("INSERT INTO comment_tag (cnum, pnum, content) VALUES (#{comment_tag.cnum}, #{comment_tag.pnum}, #{comment_tag.content})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("comment_tag") CommentTag comment_tag);

//	update
	@Update("UPDATE comment_tag SET content=#{comment_tag.content} WHERE num=#{comment_tag.num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByNum(@Param("comment_tag") CommentTag comment_tag);

	@Update("UPDATE comment_tag SET content=#{comment_tag.content} WHERE cnum=#{comment_tag.cnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByCommentNum(@Param("comment_tag") CommentTag comment_tag);

	@Update("UPDATE comment_tag SET content=#{comment_tag.content} WHERE pnum=#{comment_tag.pnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByProductNum(@Param("comment_tag") CommentTag comment_tag);

//	delete
	@Delete("DELETE FROM comment_tag WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByNum(@Param("num") int num);
	
	@Delete("DELETE FROM comment_tag WHERE cnum=#{cnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByCommentNum(@Param("cnum") int cnum);

	@Delete("DELETE FROM comment_tag WHERE pnum=#{pnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByProductNum(@Param("pnum") int pnum);
}

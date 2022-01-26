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

import com.coffeecongspring.web.vo.Comment;

@Mapper
public interface CommentMapper {
//	select
	@Select("SELECT * FROM comment")
	List<Comment> findAll();

	@Select("SELECT * FROM comment WHERE num=#{num}")
	Optional<Comment> findByNum(@Param("num") int num);

	@Select("SELECT * FROM comment WHERE pnum=#{pnum}")
	List<Comment> findByProductNum(@Param("pnum") int pnum);

	@Select("SELECT * FROM comment WHERE mnum=#{mnum}")
	List<Comment> findByMemberNum(@Param("mnum") int mnum);

//	insert
	@Insert("INSERT INTO comment (mnum, pnum, content, img_path, star, cid, layer, group) VALUES (#{comment.mnum}, #{comment.pnum}, #{comment.content}, #{comment.img_path}, #{comment.star}, #{comment.cid}, #{comment.layer}, #{comment.group})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("comment") Comment comment);

//	update
	@Update("UPDATE comment SET content=#{comment.content} WHERE num=#{comment.num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByNum(@Param("comment") Comment comment);

//	delete
	@Delete("DELETE FROM comment WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByNum(@Param("num") int num);
}

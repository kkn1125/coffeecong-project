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

import com.coffeecongspring.web.vo.ProductTag;

@Mapper
public interface ProductTagMapper {
//	select
	@Select("SELECT * FROM product_tag")
	List<ProductTag> findAll();
	
	@Select("SELECT * FROM product_tag WHERE num=#{num}")
	Optional<ProductTag> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM product_tag WHERE pnum=#{pnum}")
	Optional<ProductTag> findByProductNum(@Param("pnum") int pnum);
	
//	insert
	@Insert("INSERT INTO product_tag (pnum, content) VALUES (#{product_tag.pnum}, #{product_tag.content})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("product_tag") ProductTag product_tag);
	
//	update
	@Update("UPDATE product_tag SET content=#{product_tag.content} WHERE num=#{product_tag.num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByNum(@Param("product_tag") ProductTag product_tag);
	
	@Update("UPDATE product_tag SET content=#{product_tag.content} WHERE pnum=#{product_tag.pnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByProductNum(@Param("product_tag") ProductTag product_tag);
	
//	delete
	@Delete("DELETE FROM product_tag WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByNum(@Param("num") int num);
	
	@Delete("DELETE FROM product_tag WHERE pnum=#{pnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer deleteByProductNum(@Param("pnum") int pnum);
}

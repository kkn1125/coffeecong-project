package com.coffeecongspring.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.coffeecongspring.web.vo.ProductImg;

@Mapper
public interface ProductImgMapper {
//	select
	@Select("SELECT * FROM productimg")
	List<ProductImg> findAll();
	
	@Select("SELECT * FROM productimg WHERE num=#{num}")
	List<ProductImg> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM productimg WHERE pnum=#{pnum}")
	List<ProductImg> findByPnum(@Param("pnum") int pnum);
	
//	insert
	@Insert("INSERT INTO productimg(pid, pname, title, subtitle, content, capacity, price, category) VALUES(#{productimg.pid}, #{productimg.pname}, #{productimg.title}, #{productimg.subtitle}, #{productimg.content}, #{productimg.capacity}, #{productimg.price}, #{productimg.category})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("productimg") ProductImg productimg);
	
//	delete
	@Delete("DELETE FROM productimg WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer delete(@Param("num") int num);
}

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

import com.coffeecongspring.web.mapper.provider.ProductProvider;
import com.coffeecongspring.web.vo.Product;

@Mapper
public interface ProductMapper {
//	select
	@Select("SELECT * FROM product")
	List<Product> findAll();
	
	@Select("SELECT * FROM product WHERE num=#{num}")
	Optional<Product> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM product WHERE pid=#{pid}")
	Optional<Product> findByPid(@Param("pid") String pid);
	
//	#{}은 자동으로 따옴표가 덮혀 사용되고, ${}는 따옴표 없이 사용된다.
	@Select("SELECT * FROM product WHERE category LIKE '%${category}%'")
	List<Product> findByCategory(@Param("category") String category);
	
//	insert
	@Insert("INSERT INTO product(pid, pname, title, subtitle, content, capacity, price, category) VALUES(#{product.pid}, #{product.pname}, #{product.title}, #{product.subtitle}, #{product.content}, #{product.capacity}, #{product.price}, #{product.category})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("product") Product product);
	
//	update
	@UpdateProvider(method = "update", type = ProductProvider.class)
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void update(@Param("product") Product product);
	
//	delete
	@Delete("DELETE FROM product WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer delete(@Param("num") int num);
	
}

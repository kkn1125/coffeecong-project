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
import com.coffeecongspring.web.mapper.provider.ProductProvider;
import com.coffeecongspring.web.vo.Product;

@Mapper
public interface ProductMapper {
	@Select("SELECT * FROM product")
	List<Product> findAll();
	
	@Select("SELECT * FROM product WHERE num=#{num}")
	List<Product> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM product WHERE pid=#{pid}")
	List<Product> findByPid(@Param("pid") String pid);
	
	@Insert("INSERT INTO product(pid, pname, title, subtitle, content, capacity, price, category) VALUES(#{product.pid}, #{product.pname}, #{product.title}, #{product.subtitle}, #{product.content}, #{product.capacity}, #{product.price}, #{product.category})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(Product product);
	
	@UpdateProvider(method = "update", type = ProductProvider.class)
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void update(Product product);
	
	@Delete("DELETE FROM product WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer delete(@Param("num") int num);
	
}

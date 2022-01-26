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
import org.apache.ibatis.annotations.UpdateProvider;

import com.coffeecongspring.web.mapper.provider.MemberProvider;
import com.coffeecongspring.web.vo.Cart;

@Mapper
public interface CartMapper {
//	select
	@Select("SELECT * FROM cart")
	List<Cart> findAll();
	
	@Select("SELECT * FROM cart WHERE num=#{num}")
	Optional<Cart> findByNum(@Param("num") int num);
	
	@Select("SELECT * FROM cart WHERE mnum=#{mnum}")
	Optional<Cart> findByMemberNum(@Param("mnum") int mnum);
	
	@Select("SELECT * FROM cart WHERE pnum=#{pnum}")
	Optional<Cart> findByProductNum(@Param("pnum") int pnum);
	
//	insert
	@Insert("INSERT INTO cart(mnum, pnum, id, capacity) VALUES(#{cart.mnum}, #{cart.pnum}, #{cart.id}, #{cart.capacity})")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void add(@Param("cart") Cart cart);
	
//	update
	@Update("UPDATE cart SET capacity=#{cart.capacity} WHERE num=#{cart.num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByNum(@Param("cart") Cart cart);
	
	@Update("UPDATE cart SET capacity=#{cart.capacity} WHERE mnum=#{cart.mnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByMemberNum(@Param("cart") Cart cart);
	
	@Update("UPDATE cart SET capacity=#{cart.capacity} WHERE pnum=#{cart.pnum}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	void updateByProductNum(@Param("cart") Cart cart);
	
//	delete
	@Delete("DELETE FROM cart WHERE num=#{num}")
	@Options(useGeneratedKeys = true, keyColumn = "num")
	Integer delete(@Param("num") int num);
}

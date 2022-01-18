package com.coffeecongspring.web.mapper.provider;

import org.apache.ibatis.annotations.Param;

import com.coffeecongspring.web.vo.Product;

public class ProductProvider {
	public String update(@Param("product") Product product) {
		String sql = "UPDATE product SET";
		if(product.getPid()!=null) {
			sql += " pid=#{pid}";
		} else if(product.getPname()!=null) {
			sql += " pname=#{pname}";
		} else if(product.getTitle()!=null) {
			sql += " title=#{title}";
		} else if(product.getSubtitle()!=null) {
			sql += " subtitle=#{subtitle}";
		} else if(product.getContent()!=null) {
			sql += " content=#{content}";
		} else if(product.getCapacity()>0) {
			sql += " capacity=#{capacity}";
		} else if(product.getPrice()>0) {
			sql += " price=#{price}";
		} else if(product.getCategory()!=null) {
			sql += " category=#{category}";
		}
		return sql;
	}
}

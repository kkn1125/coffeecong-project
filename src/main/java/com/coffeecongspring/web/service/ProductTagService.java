package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.ProductTagMapper;
import com.coffeecongspring.web.vo.ProductTag;

@Service
public class ProductTagService {
	@Autowired
	private ProductTagMapper productTagMapper;

	public List<ProductTag> findAll() {
		return productTagMapper.findAll();
	}

	public ProductTag findByNum(int num) {
		return productTagMapper.findByNum(num).orElse(null);
	}

	public ProductTag findByProductNum(int pnum) {
		return productTagMapper.findByProductNum(pnum).orElse(null);
	}

	public Integer add(ProductTag product_tag) {
		productTagMapper.add(product_tag);
		return product_tag.getNum();
	}

	public Integer updateByNum(ProductTag product_tag) {
		productTagMapper.updateByNum(product_tag);
		return product_tag.getNum();
	}

	public Integer updateByProductNum(ProductTag product_tag) {
		productTagMapper.updateByProductNum(product_tag);
		return product_tag.getNum();
	}

	public Integer deleteByNum(int num) {
		return productTagMapper.deleteByNum(num);
	}

	public Integer deleteByProductNum(int pnum) {
		return productTagMapper.deleteByProductNum(pnum);
	}
}

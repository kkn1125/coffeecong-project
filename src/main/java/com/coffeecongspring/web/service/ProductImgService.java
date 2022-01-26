package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.ProductImgMapper;
import com.coffeecongspring.web.vo.ProductImg;

@Service
public class ProductImgService {
	@Autowired
	private ProductImgMapper productImgMapper;

	public List<ProductImg> findAll() {
		return productImgMapper.findAll();
	}

	public List<ProductImg> findByNum(int num) {
		return productImgMapper.findByNum(num);
	}

	public List<ProductImg> findByPnum(int pnum) {
		return productImgMapper.findByPnum(pnum);
	}

	public Integer add(List<ProductImg> productimgs) {
		ProductImg productimg = null;
		for(ProductImg pi : productimgs) {			
			productImgMapper.add(pi);
			productimg = pi;
		}
		return productimg.getNum();
	}

	public Integer delete(int num) {
		return productImgMapper.delete(num);
	}

}

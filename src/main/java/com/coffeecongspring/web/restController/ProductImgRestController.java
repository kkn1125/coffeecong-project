package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.ProductImgService;
import com.coffeecongspring.web.vo.ProductImg;

@RestController
@RequestMapping("/productimg")
public class ProductImgRestController {
	@Autowired
	private ProductImgService productImgSerivce;

	@GetMapping("")
	public List<ProductImg> findAll() {
		return productImgSerivce.findAll();
	}

	@GetMapping("/{num}")
	public List<ProductImg> findByNum(@PathVariable("num") int num) {
		return productImgSerivce.findByNum(num);
	}

	@GetMapping("/pnum/{pnum}")
	public List<ProductImg> findByPnum(@PathVariable("pnum") int pnum) {
		return productImgSerivce.findByPnum(pnum);
	}

	@PostMapping("")
	public Integer add(List<ProductImg> productimg) {
		return productImgSerivce.add(productimg);
	}

	@DeleteMapping("/{num}")
	public Integer delete(@PathVariable("num") int num) {
		return productImgSerivce.delete(num);
	}
	
}

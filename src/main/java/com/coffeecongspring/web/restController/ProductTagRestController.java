package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.ProductTagService;
import com.coffeecongspring.web.vo.ProductTag;

@RestController
@RequestMapping("/producttag")
public class ProductTagRestController {
	@Autowired
	private ProductTagService productTagSerivce;
	
	@GetMapping("")
	public List<ProductTag> findAll(){
		return productTagSerivce.findAll();
	}
	
	@GetMapping("/pnum/{pnum}")
	public ProductTag findByProductNum(@PathVariable("pnum") int pnum){
		return productTagSerivce.findByProductNum(pnum);
	}
}

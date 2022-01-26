package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.CartService;
import com.coffeecongspring.web.vo.Cart;

@RestController
@RequestMapping("/cart")
public class CartRestController {
	@Autowired
	private CartService cartService;
	
	@GetMapping("")
	public List<Cart> findAll(){
		return cartService.findAll();
	}
}

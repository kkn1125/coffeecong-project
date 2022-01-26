package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.CartMapper;
import com.coffeecongspring.web.vo.Cart;

@Service
public class CartService {
	@Autowired
	private CartMapper cartMapper;

	public List<Cart> findAll() {
		return cartMapper.findAll();
	}
	
	public Cart findByNum(int num) {
		return cartMapper.findByNum(num).orElse(null);
	}

	public Cart findByMemberNum(int mnum) {
		return cartMapper.findByNum(mnum).orElse(null);
	}

	public Cart findByProductNum(int pnum) {
		return cartMapper.findByProductNum(pnum).orElse(null);
	}

	public Integer add(Cart cart) {
		cartMapper.add(cart);
		return cart.getNum();
	}
	
	public Integer updateByNum(Cart cart) {
		cartMapper.updateByNum(cart);
		return cart.getNum();
	}
	
	public Integer updateByMemberNum(Cart cart) {
		cartMapper.updateByMemberNum(cart);
		return cart.getNum();
	}

	public Integer updateByProductNum(Cart cart) {
		cartMapper.updateByProductNum(cart);
		return cart.getNum();
	}

	public Integer delete(int num) {
		return cartMapper.delete(num);
	}
}

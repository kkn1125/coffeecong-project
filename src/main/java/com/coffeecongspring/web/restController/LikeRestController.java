package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.LikeService;
import com.coffeecongspring.web.vo.Like;

@RestController
@RequestMapping("/like")
public class LikeRestController {
	@Autowired
	private LikeService likeService;
	
	@GetMapping("")
	public List<Like> findAll() {
		return likeService.findAll();
	}
}

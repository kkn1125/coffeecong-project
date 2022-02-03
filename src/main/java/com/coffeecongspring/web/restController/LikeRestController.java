package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@GetMapping("/{num}")
	public Like findByNum(@PathVariable("num") int num) {
		return likeService.findByNum(num);
	}

	@GetMapping("/mnum/{mnum}")
	public List<Like> findByMemberNum(@PathVariable("mnum") int mnum) {
		return likeService.findByMemberNum(mnum);
	}

	@GetMapping("/pnum/{pnum}")
	public List<Like> findByProductNum(@PathVariable("pnum") int pnum) {
		return likeService.findByProductNum(pnum);
	}

	@PostMapping("")
	public Integer add(Like like) {
		likeService.add(like);
		return like.getNum();
	}

	@DeleteMapping("/{num}")
	public Integer deleteByNum(@PathVariable("num") int num) {
		return likeService.deleteByNum(num);
	}

	@DeleteMapping("/mnum/{mnum}")
	public Integer deleteByMemberNum(@PathVariable("mnum") int mnum) {
		return likeService.deleteByMemberNum(mnum);
	}

	@DeleteMapping("/pnum/{pnum}")
	public Integer deleteByProductNum(@PathVariable("pnum") int pnum) {
		return likeService.deleteByProductNum(pnum);
	}
}

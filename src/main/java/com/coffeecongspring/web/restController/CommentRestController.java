package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.CommentService;
import com.coffeecongspring.web.vo.Comment;

@RestController
@RequestMapping("/comment")
public class CommentRestController {
	@Autowired
	private CommentService commentService;
	
	@GetMapping("")
	public List<Comment> findAll() {
		return commentService.findAll();
	}

	@GetMapping("/{num}")
	public Comment findByNum(@PathVariable("num") int num) {
		return commentService.findByNum(num);
	}

	@GetMapping("/pnum/{pnum}")
	public List<Comment> findByProductNum(@PathVariable("pnum") int pnum) {
		return commentService.findByProductNum(pnum);
	}

	@GetMapping("/mnum/{mnum}")
	public List<Comment> findByMemberNum(@PathVariable("mnum") int mnum) {
		return commentService.findByMemberNum(mnum);
	}

	@PostMapping("")
	public Integer add(Comment comment) {
		commentService.add(comment);
		return comment.getNum();
	}

	@PutMapping("/{num}")
	public Integer updateByNum(@PathVariable int num, Comment comment) {
		comment.setNum(num);
		commentService.updateByNum(comment);
		return comment.getNum();
	}

	@DeleteMapping("/{num}")
	public Integer deleteByNum(@PathVariable int num) {
		return commentService.deleteByNum(num);
	}
}

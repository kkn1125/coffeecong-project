package com.coffeecongspring.web.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeecongspring.web.service.CommentTagService;
import com.coffeecongspring.web.vo.CommentTag;

@RestController
@RequestMapping("/commenttag")
public class CommentTagRestController {
	@Autowired
	private CommentTagService commentTagService;
	
	@GetMapping("")
	public List<CommentTag> findAll(){
		return commentTagService.findAll();
	}
}

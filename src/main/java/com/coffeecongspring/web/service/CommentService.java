package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.CommentMapper;
import com.coffeecongspring.web.vo.Comment;

@Service
public class CommentService {
	@Autowired
	private CommentMapper commentMapper;

	public List<Comment> findAll() {
		return commentMapper.findAll();
	}

	public Comment findByNum(int num) {
		return commentMapper.findByNum(num).orElse(null);
	}

	public List<Comment> findByProductNum(int pnum) {
		return commentMapper.findByProductNum(pnum);
	}

	public List<Comment> findByMemberNum(int mnum) {
		return commentMapper.findByMemberNum(mnum);
	}

	public Integer add(Comment comment) {
		commentMapper.add(comment);
		return comment.getNum();
	}

	public Integer updateByNum(Comment comment) {
		commentMapper.updateByNum(comment);
		return comment.getNum();
	}

	public Integer deleteByNum(int num) {
		return commentMapper.deleteByNum(num);
	}
}

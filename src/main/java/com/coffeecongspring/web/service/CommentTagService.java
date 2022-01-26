package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.CommentTagMapper;
import com.coffeecongspring.web.vo.CommentTag;

@Service
public class CommentTagService {
	@Autowired
	private CommentTagMapper commentTagMapper;

	public List<CommentTag> findAll() {
		return commentTagMapper.findAll();
	}

	public CommentTag findByNum(int num) {
		return commentTagMapper.findByNum(num).orElse(null);
	}

	public CommentTag findByProductNum(int pnum) {
		return commentTagMapper.findByProductNum(pnum).orElse(null);
	}

	public CommentTag findByCommentNum(int cnum) {
		return commentTagMapper.findByCommentNum(cnum).orElse(null);
	}

	public Integer add(CommentTag comment_tag) {
		commentTagMapper.add(comment_tag);
		return comment_tag.getNum();
	}

	public Integer updateByNum(CommentTag comment_tag) {
		commentTagMapper.updateByNum(comment_tag);
		return comment_tag.getNum();
	}

	public Integer updateByCommentNum(CommentTag comment_tag) {
		commentTagMapper.updateByCommentNum(comment_tag);
		return comment_tag.getNum();
	}

	public Integer updateByProductNum(CommentTag comment_tag) {
		commentTagMapper.updateByProductNum(comment_tag);
		return comment_tag.getNum();
	}

	public Integer deleteByNum(int num) {
		return commentTagMapper.deleteByNum(num);
	}

	public Integer deleteByCommentNum(int cnum) {
		return commentTagMapper.deleteByCommentNum(cnum);
	}

	public Integer deleteByProductNum(int pnum) {
		return commentTagMapper.deleteByProductNum(pnum);
	}
}

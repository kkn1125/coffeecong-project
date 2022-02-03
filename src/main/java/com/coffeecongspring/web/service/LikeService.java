package com.coffeecongspring.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeecongspring.web.mapper.LikeMapper;
import com.coffeecongspring.web.vo.Like;

@Service
public class LikeService {
	@Autowired
	private LikeMapper likeMapper;

	public List<Like> findAll() {
		return likeMapper.findAll();
	}

	public Like findByNum(int num) {
		return likeMapper.findByNum(num).orElse(null);
	}

	public List<Like> findByMemberNum(int mnum) {
		return likeMapper.findByMemberNum(mnum);
	}

	public List<Like> findByProductNum(int pnum) {
		return likeMapper.findByProductNum(pnum);
	}

	public Integer add(Like like) {
		likeMapper.add(like);
		return like.getNum();
	}

	public Integer deleteByNum(int num) {
		return likeMapper.deleteByNum(num);
	}

	public Integer deleteByMemberNum(int mnum) {
		return likeMapper.deleteByMemberNum(mnum);
	}

	public Integer deleteByProductNum(int pnum) {
		return likeMapper.deleteByProductNum(pnum);
	}
}

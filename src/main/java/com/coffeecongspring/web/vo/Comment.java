package com.coffeecongspring.web.vo;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment {
	private int num;
	private int mnum;
	private int pnum;
	private String content;
	private String img_path;
	private float star;
	private Timestamp regdate;
	private int cid;
	private int layer;
	private int group;
}

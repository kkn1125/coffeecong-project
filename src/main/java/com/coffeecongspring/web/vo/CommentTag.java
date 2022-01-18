package com.coffeecongspring.web.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentTag {
	private int num;
	private int cnum;
	private int pnum;
	private String content;
}

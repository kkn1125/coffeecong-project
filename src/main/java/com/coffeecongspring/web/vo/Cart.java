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
public class Cart {
	private int num;
	private int mnum;
	private int pnum;
	private String id;
	private int capacity;
	private Timestamp regdate;
}

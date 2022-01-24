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
public class Product {
	private int num;
	private String pid;
	private String pname;
	private String title;
	private String subtitle;
	private String content;
	private long capacity;
	private long price;
	private String category;
	private String image;
	private Timestamp regdate;
	private Timestamp updates;
}

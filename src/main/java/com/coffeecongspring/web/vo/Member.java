package com.coffeecongspring.web.vo;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member{
	private int num;
	private String id;
	private String email;
	private String password;
	private String name;
	private Date birth;
	private String address_main;
	private String address_sub;
	private long address_zip;
	private Timestamp regdate;
	private Timestamp updates;
}

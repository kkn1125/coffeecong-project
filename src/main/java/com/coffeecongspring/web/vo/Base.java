package com.coffeecongspring.web.vo;

public class Base {
	static public String leftPad(String str, String pad, int num) {
		String sb = "";
		for(int i=0; i<num-str.length(); i++) {
			sb += pad;
		}
		return sb+str;
	}
	static public String rightPad(String str, String pad, int num) {
		String sb = str;
		for(int i=0; i<num-str.length(); i++) {
			sb += pad;
		}
		return sb;
	}
	static public boolean isNumber(String str) {
		return str.matches("[0-9]+");
	}
}

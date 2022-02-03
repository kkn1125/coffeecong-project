package com.coffeecongspring.web;

import java.util.List;
import java.util.stream.Stream;

import org.junit.Test;

public class testfor {
	static String regex = "[0-9]+";
	static String regex2 = " a,b,c,d,e,f";
	
	@Test
	public void justNumber() {
//		System.out.println(Base.leftPad("1", "0", 3));
//		assertTrue("123".matches(regex));
//		assertFalse("a12b".matches(regex));
//		assertFalse("12b".matches(regex));
//		assertFalse("1b2".matches(regex));
//		assertFalse("a12".matches(regex));
//		System.out.println(Arrays.toString(regex2.split("[\\s\\,]+")));
		String[] lists = Stream.of(regex2.split("[\\s\\,]+")).map(x->x.trim()).filter(x->!x.isEmpty()).toArray(String[]::new);
		System.out.println(String.join(",", lists));
	}
}

package com.coffeecongspring.web;

import static org.junit.Assert.*;

import org.junit.Test;

public class testfor {
	static String regex = "[0-9]+";
	
	@Test
	public void justNumber() {
//		System.out.println(Base.leftPad("1", "0", 3));
		assertTrue("123".matches(regex));
		assertFalse("a12b".matches(regex));
		assertFalse("12b".matches(regex));
		assertFalse("1b2".matches(regex));
		assertFalse("a12".matches(regex));
	}
}

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<app-main>
	<div
	v-if="getError"
	:class="getError==1?'error position-fixed notice notice-danger':getError==2?'position-fixed notice notice-info':''"
	:style="getError==1?'top: 61px; left: 50%; transform: translateX(-50%); z-index: 1;':getError==2?'top: 61px; left: 50%; transform: translateX(-50%); z-index: 1;':''">
		{{getError==1?'로그인 기간이 만료되었습니다.':''}}
		{{getError==2?'로그아웃 되었습니다.':''}}
	</div>
	<app-main-body
	:itemlist="itemlist"></app-main-body>
</app-main>
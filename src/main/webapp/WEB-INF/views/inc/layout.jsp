<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/css/penli.css" integrity="sha384-GRlAVG2hpmCsp6fahietb2fYclf6GcPQ//SP/cbgU5fXb/XnuNXgcBtiDnxsfWZn" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/css/penli.theme.css" integrity="sha384-01r009YpiICsv6vC6VOYlFkAXL3fvSbJWvj4y6IFDQ5ydtcsROidPN6OZ4pHTz8m" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<link rel="stylesheet" href="/resources/assets/style/main.css">
<title><tiles:insertAttribute name="title" /></title>
</head>
<body>
	<div id="app">
		<tiles:insertAttribute name="nav" />
		<tiles:insertAttribute name="body" />
		<tiles:insertAttribute name="footer" />
	</div>
	<script src="/resources/assets/script/App.js" type="module"></script>
	<script src="https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/js/penli.js" integrity="sha384-v8IcF+Ajik1Du5Pn4UGwOVizMisxuU6LhXVsWYy1WdP2+1MxTdeJRHuYeDAdtQ6v" crossorigin="anonymous"></script>
	<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>
</html>
# CoffeeCong

Java JSP 1개월 반 과정의 학원을 이수하고 마지막 2주 가량 남았을 때 만들었던 "커피 상품 온라인 몰" CoffeeCong 프로젝트입니다.

## 변경사항

처음 만들었던 프로젝트가 `JSP`로 만들어졌고, 프론트에 대한 지식이 많이 없어 다른 샘플 사이트를 활용해서 만들었습니다. 현재 공부하고 있는 `Spring`과 `Spring Boot`중 `Spring` 프레임워크로 새로 만들고 기능을 더 추가하는 대신 다듬어 만들고 있습니다.

처음 JSP 프로젝트는 `About`의 링크를 참고하시기 바랍니다.

> Heroku에서 구동되기 때문에 월말 즈음에는 접속이 불가 할 수 있습니다. JSP프로젝트가 궁금하시다면 소스를 전송해드리도록 하겠습니다.

## 개발환경

- apache tomcat 9.0.43
- apache maven 3.8.1
- spring legacy mvc project (java configuration)

### Dependencies

- servlet-api 3.1.0
- spring-jdbc 5.3.6
- mybatis-spring 2.0.6
- mybatis 3.5.7
- tiles-jsp 3.0.8
- lombok 1.18.22
- jackson-databind 2.13.1
- junit 4.7

### Skills

- Front-End: HTML, CSS, JavaScript, Vue.js
- Back-End: Spring, Spring Boot, MySQL, Java

## 개발 범위

- 댓글 (리뷰 계층형)
- Rest API
- 로그인/회원가입(구글 oAuth, naver Auth)
- 상품리스트(몰) 페이지
- 상품 상세페이지
- 상품 입력페이지
- 검색/필터링
- 페이징

## 페이지 기획 및 디자인

### 페이지 기획

`Whimsical`을 이용한 페이지 목업을 통해 빠르게 생각하는 바에 근접했습니다.

### 디자인

본인이 다른 프레임워크를 사용하지 않고 연습삼아 만들었던 CSS툴 `Penli`를 사용하여 디자인 했습니다.

## DB 및 API 설계

### DB 명세서

#### Member

|Name|Type|Key|Desc|Example|Column|
|---|---|---|---|---|---|
|num|int|PK|멤버 넘버|1||
|id|VARCHAR(20)||멤버 아이디|kimson12||
|email|VARCHAR(45)||멤버 이메일|chapet01@gmail.com||
|password|VARCHAR(20)||패스워드|1234qwe||
|name|VARCHAR(45)||이름|김슨||
|birth|DATE||생년월일|1994-2-15|input datetime 으로 처리
|address_main|VARCHAR(45)||동\|읍\|면 까지의 주소||daum 주소 api 사용|
|address_sub|VARCHAR(45)||기타 상세 주소||상동|
|address_zip|BIGINT||우편번호||상동|
|regdate|TIMESTAMP||생성일||자동 등록|
|updates|TIMESTAMP||수정일||자동 등록|

#### Product

|Name|Type|Key|Desc|Example|Column|
|---|---|---|---|---|---|
|num|int|PK|상품 넘버|1||
|pid|varchar(100)||상품 아이디|cc-0-001|cc는 coffeecong의 c 2개와 카테고리 순번, 그리고 해당 카테고리의 상품 순번으로 (cc-0[,1 ... ]-001[, 002 ... ]|
|pname|varchar(100)||상품 이름|에티오피아 예가체프||
|title|varchar(45)||상품 제목|에티오피아 예가체프 G2||
|subtitle|varchar(100)||부제목|주식회사 커피창고||
|content|longtext||상품 설명|아라비아 커피의 고장이라고 불리우는 에티오피아. 그보다 더 유명한 커피가 에티오피아 예가체프로...||
|capacity|bigint||총 수량|50||
|price|bigint||가격|5000|view단에서 Comma처리|
|category|varchar(45)||상품 분류|bean|`bean`, `coffee`, `tea`, `machine`, `wear` 5가지|
|image|text||상품 이미지|/resources/assets/images/...||
|regdate|timestamp||상품 등록 일자||자동 등록
|updates|timestamp||상품 수정 일자 (수정 시 변경)||자동 등록

#### Comment

|Name|Type|Key|Desc|Example|Column|
|---|---|---|---|---|---|
|num|INT|PK|댓글 넘버|1||
|mnum|INT|FK(→member.num)|멤버 넘버 참조|12||
|pnum|INT|FK(→product.num)|상품 넘버 참조|13||
|content|VARCHAR(500)||댓글 내용|산미가 있어 좋아요!||
|img_path|VARCHAR(500)||댓글 첨부 이미지 경로|/resources/assets/images/coffee01.png||
|star|FLOAT||별점|2.6||
|regdate|TIMESTAMP||생성일||자동 등록|
|cid|INT||참조 댓글 넘버|1||
|layer|INT||참조 댓글의 계층|0||
|group|INT||참조 댓글의 그룹|0||

#### Like

|Name|Type|Key|Desc|Example|
|---|---|---|---|---|
|num|int|PK|좋아요 버튼 넘버|1|
|mnum|int|FK(→member.num)|멤버 넘버 참조|12|
|pnum|int|FK(→product.num)|상품 넘버 참조|13|

#### Product_tag

|Name|Type|Key|Desc|Example|Column|
|---|---|---|---|---|---|
|num|INT|PK|좋아요 버튼 넘버|1||
|pnum|INT|FK(→product.num)|상품 넘버 참조|5||
|content|VARCHAR(45)||멤버 넘버 참조|MD 추천|상품의 태그|

#### Comment_tag

|Name|Type|Key|Desc|Example|Column|
|---|---|---|---|---|---|
|num|INT|PK|좋아요 버튼 넘버|1||
|cnum|INT|FK(→comment.num)|댓글 넘버 참조|12||
|pnum|INT|FK(→product.num)|상품 넘버 참조|13||
|content|VARCHAR(45)||태그 내용|산미|#은 view단에서 붙임|

#### Cart

|Name|Type|Key|Desc|Example|Column|
|---|---|---|---|---|---|
|num|INT|PK|카드 넘버|1||
|mnum|INT|FK(→member.num)|멤버 넘버 참조|5||
|pnum|INT|FK(→product.num)|상품 넘버 참조|||
|id|VARCHAR(300)||주문 아이디|kyl968qh :: new Date().getTime().toString(36)|프론트에서 long타입 시간 → 36진수로 변환|
|capacity|INT||주문 수량|||
|regdate|TIMESTAMP||생성일||자동 등록|

### API 명세서

... 작성 중

## 포트폴리오 샘플

[Old Version::CoffeeCong Sample Page](https://coffeecong.herokuapp.com)

[New Version::CoffeeCong Sample Page](https://coffeecong.herokuapp.com)

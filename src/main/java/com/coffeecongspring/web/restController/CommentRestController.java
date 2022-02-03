package com.coffeecongspring.web.restController;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.coffeecongspring.web.service.CommentService;
import com.coffeecongspring.web.vo.Comment;

@RestController
@RequestMapping("/comment")
public class CommentRestController {
	@Autowired
	private CommentService commentService;
	
	@GetMapping("")
	public List<Comment> findAll() {
		return commentService.findAll();
	}

	@GetMapping("/{num}")
	public Comment findByNum(@PathVariable("num") int num) {
		return commentService.findByNum(num);
	}

	@GetMapping("/pnum/{pnum}")
	public List<Comment> findByProductNum(@PathVariable("pnum") int pnum) {
		return commentService.findByProductNum(pnum);
	}

	@GetMapping("/mnum/{mnum}")
	public List<Comment> findByMemberNum(@PathVariable("mnum") int mnum) {
		return commentService.findByMemberNum(mnum);
	}

	@PostMapping(value="", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Integer add(@RequestParam(value = "file", required = false) MultipartFile file, Comment comment) {
		final String UPLOAD_PATH = "D:\\kkns_Coding\\JAVACODE\\newJSP\\coffeecongSpring\\src\\main\\webapp\\resources\\assets\\images";
		
		if(file==null) comment.setImg_path("");
		
		try {
			String fileName = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
			System.out.println(fileName);
			String originName = file.getOriginalFilename(); // ex) 파일.jpg
			String fileExtension = originName.substring(originName.lastIndexOf(".") + 1); // ex) jpg
			originName = originName.substring(0, originName.lastIndexOf(".")); // ex) 파일
			long fileSize = file.getSize(); // 파일 사이즈
			
			File fileSave = new File(UPLOAD_PATH, fileName + "." + fileExtension); // ex) fileId.jpg
			if(!fileSave.exists()) { // 폴더가 없을 경우 폴더 만들기
				fileSave.mkdirs();
			}
			
			file.transferTo(fileSave); // fileSave의 형태로 파일 저장
			
//			System.out.println("fileName= " + fileName);
//			System.out.println("originName= " + originName);
//			System.out.println("fileExtension= " + fileExtension);
//			System.out.println("fileSize= " + fileSize);
			comment.setImg_path("/resources/assets/images/"+fileName+"."+fileExtension);
			System.out.println(comment);
		} catch(Exception e) {
			
		} finally {
			commentService.add(comment);
		}
		return comment.getNum();
	}

	@PutMapping("/{num}")
	public Integer updateByNum(@PathVariable int num, Comment comment) {
		comment.setNum(num);
		commentService.updateByNum(comment);
		return comment.getNum();
	}

	@DeleteMapping("/{num}")
	public Integer deleteByNum(@PathVariable int num) {
		return commentService.deleteByNum(num);
	}
}

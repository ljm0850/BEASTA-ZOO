package com.nft.jav.controller;

import com.nft.jav.data.dto.CommentModiReqDto;
import com.nft.jav.data.dto.CommentReqDto;
import com.nft.jav.data.dto.CommentResDto;
import com.nft.jav.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

    private final Logger logger = LoggerFactory.getLogger(CommentController.class);

    private final CommentService commentService;

    @GetMapping("/{community_id}")
    public ResponseEntity<List<CommentResDto>> commentList(@PathVariable long community_id) {
        logger.info("commentList - 호출");
        return new ResponseEntity<>(commentService.commentList(community_id), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<String> saveComment(@RequestBody CommentReqDto commentReqDto) {
        logger.info("saveComment - 호출");

        if(commentService.saveComment(commentReqDto))
            return new ResponseEntity<>("Success",HttpStatus.OK);
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<String> updateComment(@RequestBody CommentModiReqDto commentModiReqDto){
        logger.info("updateComment - 호출");

        if(commentService.updateComment(commentModiReqDto)){
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<String> deleteComment(@PathVariable long comment_id){
        logger.info("deleteComment - 호출");

        if(commentService.deleteComment(comment_id)){
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }
}

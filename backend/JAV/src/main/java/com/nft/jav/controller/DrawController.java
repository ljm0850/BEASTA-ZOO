package com.nft.jav.controller;

import com.nft.jav.data.dto.DrawReqDto;
import com.nft.jav.service.DrawService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/draw")
public class DrawController {

    private final Logger logger = LoggerFactory.getLogger(DrawController.class);

    private final DrawService drawService;

    @PostMapping("")
    public ResponseEntity<String> saveDrawNft(@RequestBody DrawReqDto drawReqDto){
        logger.info("drawSaveNft- 호출");
        if(drawService.saveDrawNft(drawReqDto))
            return new ResponseEntity<>("Success", HttpStatus.OK);
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }
}

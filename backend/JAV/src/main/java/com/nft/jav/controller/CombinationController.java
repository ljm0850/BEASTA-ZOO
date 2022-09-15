package com.nft.jav.controller;


import com.nft.jav.data.dto.CombiReqDto;
import com.nft.jav.service.CombiService;
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
@RequestMapping("/comb")
public class CombinationController {
    private final Logger logger = LoggerFactory.getLogger(CombinationController.class);

    private final CombiService combiService;

    @PostMapping("")
    public ResponseEntity<String> saveCombiNft(@RequestBody CombiReqDto combiReqDto){
        logger.info("saveCombiNft- 호출");

        if(combiService.saveCombiNft(combiReqDto))
            return new ResponseEntity<>("Success", HttpStatus.OK);

        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }
}

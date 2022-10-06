package com.nft.jav.controller;


import com.nft.jav.data.dto.CombiReqDto;
import com.nft.jav.data.dto.NFTAbleResDto;
import com.nft.jav.service.CombiService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comb")
public class CombinationController {
    private final Logger logger = LoggerFactory.getLogger(CombinationController.class);

    private final CombiService combiService;

    @PostMapping("")
    @ApiOperation(value = "조합")
    public ResponseEntity<String> saveCombiNft(@RequestBody CombiReqDto combiReqDto){
        logger.info("saveCombiNft- 호출");

        if(combiService.saveCombiNft(combiReqDto))
            return new ResponseEntity<>("Success", HttpStatus.OK);

        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{wallet_address}")
    @ApiOperation(value = "조합 가능한 NFT 리스트")
    public ResponseEntity<List<NFTAbleResDto>> availNFT(@PathVariable String wallet_address){
        logger.info("조합 가능한 nft 리스트 호출");
        return new ResponseEntity<>(combiService.availableNFT(wallet_address), HttpStatus.OK);
    }
}

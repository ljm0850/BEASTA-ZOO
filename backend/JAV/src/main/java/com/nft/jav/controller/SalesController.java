package com.nft.jav.controller;

import com.nft.jav.data.dto.*;
import com.nft.jav.service.LikedService;
import com.nft.jav.service.SalesService;
import com.nft.jav.service.UserCollectionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/market")
public class SalesController {

    private final Logger logger = LoggerFactory.getLogger(SalesController.class);

    private final SalesService salesService;
    private final UserCollectionService userCollectionService;
    private final LikedService likedService;

    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResDto> purchaseNFT(@RequestBody PurchaseReqDto purchaseReqDto) {
        logger.info("purchaseNFT - 호출");

        PurchaseResDto purchaseResDto = salesService.purchaseNFT(purchaseReqDto);
        return new ResponseEntity<>(purchaseResDto, HttpStatus.OK);
    }

    @PostMapping("/sale")
    public ResponseEntity<SalesResDto> saleNFT(@RequestBody SalesReqDto salesReqDto) {
        logger.info("saleNFT - 호출");

        SalesResDto salesResDto = salesService.saleNFT(salesReqDto);
        return new ResponseEntity<>(salesResDto,HttpStatus.OK);
    }

    @GetMapping("/info/{user_collection_id}")
    public ResponseEntity<String> infoNFT(@PathVariable long user_collection_id) {
        logger.info("infoNFT - 호출");

        String nftAddress = userCollectionService.getNFTAddress(user_collection_id);
        return new ResponseEntity<>(nftAddress,HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<SalesResDto>> getSales(@RequestParam int page, @RequestParam int size) {
        logger.info("전체 판매 목록 - 호출");
        List<SalesResDto> salesResDtoList = salesService.getSales(page,size);
        return new ResponseEntity<>(salesResDtoList,HttpStatus.OK);
    }

    @GetMapping("/{sale_id}")
    public ResponseEntity<SalesResDto> getSale(@PathVariable long sale_id) {
        logger.info("특정 판매 목록 - 호출");
        SalesResDto salesResDto = salesService.getSale(sale_id);
        return new ResponseEntity<>(salesResDto,HttpStatus.OK);
    }

    @PostMapping("/liked/{user_id}/{sale_id}")
    public ResponseEntity<LikedResDto> addLiked(@PathVariable long user_id, @PathVariable long sale_id) {
        logger.info("addLiked - 호출");

        LikedResDto likedResDto = likedService.addLiked(user_id, sale_id);
        return new ResponseEntity<>(likedResDto,HttpStatus.OK);
    }
}

package com.nft.jav.controller;

import com.nft.jav.data.dto.*;
import com.nft.jav.service.LikedService;
import com.nft.jav.service.SalesService;
import com.nft.jav.service.UserCollectionService;
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
@RequestMapping("/market")
public class SalesController {

    private final Logger logger = LoggerFactory.getLogger(SalesController.class);

    private final SalesService salesService;
    private final UserCollectionService userCollectionService;
    private final LikedService likedService;

    @PostMapping("/purchase")
    @ApiOperation(value = "구매")
    public ResponseEntity<PurchaseResDto> purchaseNFT(@RequestBody PurchaseReqDto purchaseReqDto) {
        logger.info("purchaseNFT - 호출");

        PurchaseResDto purchaseResDto = salesService.purchaseNFT(purchaseReqDto);
        return new ResponseEntity<>(purchaseResDto, HttpStatus.OK);
    }

    @PostMapping("/sale")
    @ApiOperation(value = "판매")
    public ResponseEntity<SalesResDto> saleNFT(@RequestBody SalesReqDto salesReqDto) {
        logger.info("saleNFT - 호출");

        SalesResDto salesResDto = salesService.saleNFT(salesReqDto);
        return new ResponseEntity<>(salesResDto,HttpStatus.OK);
    }

//    @GetMapping("/info/{user_collection_id}")
//    @ApiOperation(value = "nft 주소 반환")
//    public ResponseEntity<String> infoNFT(@PathVariable long user_collection_id) {
//        logger.info("infoNFT - 호출");
//
//        String nftAddress = userCollectionService.getNFTAddress(user_collection_id);
//        return new ResponseEntity<>(nftAddress,HttpStatus.OK);
//    }

    @GetMapping("")
    @ApiOperation(value = "판매 테이블 목록 조회", notes ="sort가 0: 최신순, 1: 가격낮은순, 2: 가격높은순 \n"+
            "type이 0: 판매중인 목록만 반환, 1: 전체 판매목록 반환")
    public ResponseEntity<List<SalesResPageDto>> getSales(@RequestParam String search, @RequestParam int page,
                                                          @RequestParam int size, @RequestParam int type,
                                                          @RequestParam int sort) {
        logger.info("전체 판매 목록 - 호출");
        List<SalesResPageDto> salesResDtoList = salesService.getSales(search, page,size, type, sort);
        return new ResponseEntity<>(salesResDtoList,HttpStatus.OK);
    }

    @GetMapping("/{sale_id}")
    @ApiOperation(value = "판매 detail")
    public ResponseEntity<SalesResDto> getSale(@PathVariable long sale_id) {
        logger.info("특정 판매 목록 - 호출");
        SalesResDto salesResDto = salesService.getSale(sale_id);
        return new ResponseEntity<>(salesResDto,HttpStatus.OK);
    }

    @GetMapping("/nft/{jav_code}")
    @ApiOperation(value = "같은 자브코드의 판매 완료 리스트 호출")
    public ResponseEntity<List<SalesResDto>> getNftByJavCode(@PathVariable String jav_code) {
        logger.info("같은 자브코드의 판매 완료 리스트 호출");
        List<SalesResDto> salesResDtoList = salesService.getSaleByJavCodeCompleted(jav_code);
        return new ResponseEntity<>(salesResDtoList,HttpStatus.OK);
    }

    @PostMapping("/liked/{user_id}/{sale_id}")
    @ApiOperation(value = "찜")
    public ResponseEntity<LikedResDto> addLiked(@PathVariable long user_id, @PathVariable long sale_id) {
        logger.info("addLiked - 호출");

        LikedResDto likedResDto = likedService.addLiked(user_id, sale_id);
        return new ResponseEntity<>(likedResDto,HttpStatus.OK);
    }

    @DeleteMapping("/{contract_address}")
    @ApiOperation(value = "판매 삭제")
    public ResponseEntity<String> deleteSale(@PathVariable String contract_address){
        logger.info("deleteCommunity - 호출");

        if(salesService.deleteCommunity(contract_address)){
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }
}

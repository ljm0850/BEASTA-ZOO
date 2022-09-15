package com.nft.jav.controller;

import com.nft.jav.data.dto.*;
import com.nft.jav.data.entity.Liked;
import com.nft.jav.service.LikedService;
import com.nft.jav.service.NFTService;
import com.nft.jav.service.SalesService;
import com.nft.jav.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final LikedService likedService;
    private final NFTService nftService;
    private final SalesService salesService;

    @PostMapping("/login/{wallet_address}")
    public ResponseEntity<UserResDto> login(@PathVariable String wallet_address) {
        logger.info("login - 호출");

        UserResDto userResDto = userService.login(wallet_address);

        return new ResponseEntity<>(userResDto,HttpStatus.OK);
    }

    @GetMapping("/info/{user_id}")
    public ResponseEntity<UserResDto> userInfo(@PathVariable long user_id) {
        logger.info("userInfo - 호출");

        UserResDto userResDto = userService.userInfo(user_id);
        if(userResDto != null) {
            return new ResponseEntity<>(userResDto,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/liked/{user_id}")
    public ResponseEntity<List<LikedResDto>> likedList(@PathVariable long user_id) {
        logger.info("likedList - 호출");

        List<LikedResDto> userLikedList = likedService.getUserLikedList(user_id);
        return new ResponseEntity<>(userLikedList,HttpStatus.OK);
    }

    @GetMapping("/nft/{user_id}")
    public ResponseEntity<List<NFTResDto>> nftList(@PathVariable long user_id) {
        logger.info("nftList - 호출");

        List<NFTResDto> nftResDtoList = nftService.getUserNFTList(user_id);
        return new ResponseEntity<>(nftResDtoList,HttpStatus.OK);
    }

    @GetMapping("/sale/{user_id}")
    public ResponseEntity<List<SalesResDto>> salesList(@PathVariable long user_id) {
        logger.info("salesList - 호출");

        List<SalesResDto> salesResDtoList = salesService.getUserSalesList(user_id);
        return new ResponseEntity<>(salesResDtoList,HttpStatus.OK);
    }

    @GetMapping("/purchase/{user_id}")
    public ResponseEntity<List<SalesResDto>> purchaseList(@PathVariable long user_id) {
        logger.info("purchaseList - 호출");

        List<SalesResDto> purchaseResDtoList = salesService.getUserPurchaseList(user_id);
        return new ResponseEntity<>(purchaseResDtoList, HttpStatus.OK);
    }

    @GetMapping("/tier/{user_id}")
    public ResponseEntity<Double> tier(@PathVariable long user_id) {
        logger.info("tier - 호출");

        Double userTier = userService.getUserTier(user_id);
        return new ResponseEntity<>(userTier,HttpStatus.OK);
    }

    @GetMapping("/token/{user_id}")
    public ResponseEntity<Double> token(@PathVariable long user_id) {
        logger.info("tier - 호출");

        Double userToken = userService.getUserToken(user_id);
        return new ResponseEntity<>(userToken,HttpStatus.OK);
    }

    @PutMapping("info/{user_id}")
    public ResponseEntity<UserResDto> updateUserInfo(@PathVariable long user_id, @RequestBody UserReqDto userReqDto) {
        logger.info("updateUserInfo - 호출");

        UserResDto userResDto = userService.updateUserInfo(user_id, userReqDto);
        return new ResponseEntity<>(userResDto,HttpStatus.OK);
    }
}

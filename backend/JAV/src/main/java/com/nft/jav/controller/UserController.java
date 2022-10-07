package com.nft.jav.controller;

import com.nft.jav.data.dto.*;
import com.nft.jav.data.entity.Liked;
import com.nft.jav.service.LikedService;
import com.nft.jav.service.NFTService;
import com.nft.jav.service.SalesService;
import com.nft.jav.service.UserService;
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
@RequestMapping("/user")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final LikedService likedService;
    private final NFTService nftService;
    private final SalesService salesService;

    @PostMapping("/login/{wallet_address}")
    @ApiOperation(value = "로그인")
    public ResponseEntity<UserResDto> login(@PathVariable String wallet_address) {
        logger.info("login - 호출");

        UserResDto userResDto = userService.login(wallet_address);

        return new ResponseEntity<>(userResDto,HttpStatus.OK);
    }

    @GetMapping("/info/{wallet_address}")
    @ApiOperation(value = "지갑주소로 유저 정보 반환")
    public ResponseEntity<UserResDto> userInfo(@PathVariable String wallet_address) {
        logger.info("userInfo - 호출");

        UserResDto userResDto = userService.userInfo(wallet_address);
        if(userResDto != null) {
            return new ResponseEntity<>(userResDto,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/nickname/{wallet_address}")
    @ApiOperation(value = "닉네임 반환")
    public ResponseEntity<NicknameResDto> getNickname(@PathVariable String wallet_address) {
        logger.info("getNickname - 호출");
        return new ResponseEntity<>(userService.getNickname(wallet_address),HttpStatus.OK);
    }

    @GetMapping("/liked/{wallet_address}")
    @ApiOperation(value = "찜한 목록 조회")
    public ResponseEntity<List<LikedResDto>> likedList(@PathVariable String wallet_address) {
        logger.info("likedList - 호출");

        List<LikedResDto> userLikedList = likedService.getUserLikedList(wallet_address);
        return new ResponseEntity<>(userLikedList,HttpStatus.OK);
    }

    @GetMapping("/nft/{wallet_address}")
    @ApiOperation(value = "가지고 있는 nft 목록 조회", notes = "sort가 0: 최신순, 1: 오래된순, 2: 티어순")
    public ResponseEntity<List<NFTResDto>> nftList(@PathVariable String wallet_address, @RequestParam int page,
                                                   @RequestParam int size, @RequestParam int sort) {
        logger.info("nftList - 호출");

        List<NFTResDto> nftResDtoList = nftService.getUserNFTList(wallet_address, page, size, sort);
        return new ResponseEntity<>(nftResDtoList,HttpStatus.OK);
    }

    @GetMapping("/sale/{wallet_address}")
    @ApiOperation(value = "판매 리스트")
    public ResponseEntity<List<SalesResDto>> salesList(@PathVariable String wallet_address) {
        logger.info("salesList - 호출");

        List<SalesResDto> salesResDtoList = salesService.getUserSalesList(wallet_address);
        return new ResponseEntity<>(salesResDtoList,HttpStatus.OK);
    }

    @GetMapping("/purchase/{wallet_address}")
    @ApiOperation(value = "구매한 리스트")
    public ResponseEntity<List<SalesResDto>> purchaseList(@PathVariable String wallet_address) {
        logger.info("purchaseList - 호출");

        List<SalesResDto> purchaseResDtoList = salesService.getUserPurchaseList(wallet_address);
        return new ResponseEntity<>(purchaseResDtoList, HttpStatus.OK);
    }

    @GetMapping("/rank/{wallet_address}")
    @ApiOperation(value = "등수")
    public ResponseEntity<UserRankResDto> tier(@PathVariable String wallet_address) {
        logger.info("user rank - 호출");
        UserRankResDto userRankResDto = userService.getUserTier(wallet_address);
        return new ResponseEntity<>(userRankResDto,HttpStatus.OK);
    }

    @GetMapping("/token/{wallet_address}")
    @ApiOperation(value = "보유하고 있는 토큰")
    public ResponseEntity<Double> token(@PathVariable String wallet_address) {
        logger.info("token - 호출");

        Double userToken = userService.getUserToken(wallet_address);
        return new ResponseEntity<>(userToken,HttpStatus.OK);
    }

    @PutMapping("info/{wallet_address}")
    @ApiOperation(value = "회원정보수정")
    public ResponseEntity<UserResDto> updateUserInfo(@PathVariable String wallet_address, @RequestBody UserReqDto userReqDto) {
        logger.info("updateUserInfo - 호출");

        UserResDto userResDto = userService.updateUserInfo(wallet_address, userReqDto);
        return new ResponseEntity<>(userResDto,HttpStatus.OK);
    }
}

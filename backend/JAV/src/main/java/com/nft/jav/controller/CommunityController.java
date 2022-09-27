package com.nft.jav.controller;

import com.nft.jav.data.dto.*;
import com.nft.jav.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final Logger logger = LoggerFactory.getLogger(CommunityController.class);

    private final CommunityService communityService;

    @GetMapping
    public ResponseEntity<List<CommunityResDto>> communityList() {
        logger.info("commnunityList - 호출");
        return new ResponseEntity<>(communityService.communityList(), HttpStatus.OK);
    }

    @GetMapping("/notice")
    public ResponseEntity<List<CommunityResDto>> noticeList() {
        logger.info("noticeList - 호출");
        return new ResponseEntity<>(communityService.noticeList(), HttpStatus.OK);
    }

    @GetMapping("/{community_id}")
    public ResponseEntity<CommunityResDto> detailCommunity(@PathVariable long community_id) {
        logger.info("detailCommunity - 호출");
        return new ResponseEntity<>(communityService.detailCommunity(community_id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> saveCommunity(@RequestBody CommunityReqDto communityDto) {
        logger.info("saveCommunity - 호출");

        if(communityService.saveCommunity(communityDto))
            return new ResponseEntity<>("Success",HttpStatus.OK);
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<String> updateCommunity(@RequestBody CommunityModiReqDto communityModiReqDto){
        logger.info("updateCommunity - 호출");

         if(communityService.updateCommunity(communityModiReqDto)){
             return new ResponseEntity<>("Success", HttpStatus.OK);
         }
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{community_id}")
    public ResponseEntity<String> deleteCommunity(@PathVariable long community_id){
        logger.info("deleteCommunity - 호출");

        if(communityService.deleteCommunity(community_id)){
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/rank")
    public ResponseEntity<List<RankResDto>> rankUser(){
        logger.info("ranking - 호출");
        return new ResponseEntity<>(communityService.rankUser(), HttpStatus.OK);
    }
}

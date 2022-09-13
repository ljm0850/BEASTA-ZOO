package com.nft.jav.controller;

import com.nft.jav.data.dto.CommunityDto;
import com.nft.jav.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final Logger logger = LoggerFactory.getLogger(CommunityController.class);

    private final CommunityService communityService;

    @GetMapping("")
    public ResponseEntity<List<CommunityDto>> communityList() {
        logger.info("commnunityList - 호출");
        return new ResponseEntity<>(communityService.communityList(), HttpStatus.OK);
    }

    @GetMapping("/notice")
    public ResponseEntity<List<CommunityDto>> noticeList() {
        logger.info("noticeList - 호출");
        return new ResponseEntity<>(communityService.noticeList(), HttpStatus.OK);
    }

    @GetMapping("/{community_id}")
    public ResponseEntity<CommunityDto> detailCommunity(@PathVariable long community_id) {
        logger.info("detailCommunity - 호출");
        return new ResponseEntity<>(communityService.detailCommunity(community_id),HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<String> saveCommunity(@RequestBody CommunityDto communityDto) {
        logger.info("saveCommunity - 호출");

        if(communityService.saveCommunity(communityDto))
            return new ResponseEntity<>("Success",HttpStatus.OK);
        return new ResponseEntity<>("Fail",HttpStatus.BAD_REQUEST);
    }
}

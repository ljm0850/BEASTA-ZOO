package com.nft.jav.controller;

import com.nft.jav.data.dto.ServiceCollectionResDto;
import com.nft.jav.service.ServiceCollectionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/collection")
public class ServiceCollectionController {
    private final Logger logger = LoggerFactory.getLogger(ServiceCollectionController.class);
    private final ServiceCollectionService serviceCollectionService;

    @GetMapping("")
    public ResponseEntity<List<ServiceCollectionResDto>> serviceCollectionList(@RequestParam int page){
        logger.info("serviceCollectionList - 호출");
        return new ResponseEntity<>(serviceCollectionService.serviceCollectionList(page), HttpStatus.OK);
    }

    @GetMapping("/{jav_id}")
    public ResponseEntity<ServiceCollectionResDto> detailJav(@PathVariable long jav_id){
        logger.info("detailJav - 호출");
        return new ResponseEntity<>(serviceCollectionService.detailJav(jav_id), HttpStatus.OK);
    }
}

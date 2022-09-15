package com.nft.jav.controller;

import com.nft.jav.data.dto.serviceCollectionResDto;
import com.nft.jav.service.ServiceCollectionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/collection")
public class ServiceCollectionController {
    private final Logger logger = LoggerFactory.getLogger(ServiceCollectionController.class);
    private final ServiceCollectionService serviceCollectionService;

    @GetMapping("")
    public ResponseEntity<List<serviceCollectionResDto>> serviceCollectionList(){
        logger.info("serviceCollectionList - 호출");
        return new ResponseEntity<>(serviceCollectionService.serviceCollectionList(), HttpStatus.OK);
    }

    @GetMapping("/{jav_id}")
    public ResponseEntity<serviceCollectionResDto> detailJav(@PathVariable long jav_id){
        logger.info("detailJav - 호출");
        return new ResponseEntity<>(serviceCollectionService.detailJav(jav_id), HttpStatus.OK);
    }
}

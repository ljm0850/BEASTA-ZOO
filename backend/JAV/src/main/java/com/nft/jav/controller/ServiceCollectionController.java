package com.nft.jav.controller;

import com.nft.jav.data.dto.SalesResDto;
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
    public ResponseEntity<List<ServiceCollectionResDto>> serviceCollectionList(
            @RequestParam int page, @RequestParam int size, @RequestParam int type,
            @RequestParam(required = false) String wallet_address){
        logger.info("serviceCollectionList - 호출");
        if(type==0 || wallet_address == null) return new ResponseEntity<>(serviceCollectionService.serviceCollectionList(page,size, wallet_address), HttpStatus.OK);
        else return new ResponseEntity<>(serviceCollectionService.firstUserCollectionList(page, size, wallet_address), HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ServiceCollectionResDto>> latestJavList(@RequestParam int size){
        logger.info("latestJavList - 호출");
        return new ResponseEntity<>(serviceCollectionService.latestJav(size), HttpStatus.OK);
    }

    @GetMapping("/sale/{jav_code}")
    public ResponseEntity<List<SalesResDto>> saleListByJavCode(@RequestParam String jav_code){
        logger.info("saleListByJavCode - 호출");
        return new ResponseEntity<>(serviceCollectionService.getSaleByJavCode(jav_code), HttpStatus.OK);
    }

    @GetMapping("/{jav_id}")
    public ResponseEntity<ServiceCollectionResDto> detailJav(@PathVariable long jav_id){
        logger.info("detailJav - 호출");
        return new ResponseEntity<>(serviceCollectionService.detailJav(jav_id), HttpStatus.OK);
    }
}

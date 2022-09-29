package com.nft.jav.service;

import com.nft.jav.data.dto.SalesResDto;
import com.nft.jav.data.dto.ServiceCollectionResDto;

import java.util.List;

public interface ServiceCollectionService {
    List<ServiceCollectionResDto> serviceCollectionList(int page, int size, String wallet_address);
    List<SalesResDto> getSaleByJavCode(String jav_code);
    List<ServiceCollectionResDto> latestJav(int size);
    ServiceCollectionResDto detailJav(long javId);
}

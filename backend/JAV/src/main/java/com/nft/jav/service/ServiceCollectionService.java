package com.nft.jav.service;

import com.nft.jav.data.dto.ServiceCollectionResDto;

import java.util.List;

public interface ServiceCollectionService {
    List<ServiceCollectionResDto> serviceCollectionList(int page, int size);
    ServiceCollectionResDto detailJav(long javId);
}

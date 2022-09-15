package com.nft.jav.service;

import com.nft.jav.data.dto.serviceCollectionResDto;

import java.util.List;

public interface ServiceCollectionService {
    List<serviceCollectionResDto> serviceCollectionList();
    serviceCollectionResDto detailJav(long javId);
}

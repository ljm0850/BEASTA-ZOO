package com.nft.jav.service;

import com.nft.jav.data.dto.NFTResDto;

import java.util.List;

public interface NFTService {
    List<NFTResDto> getUserNFTList(String wallet_address);
}

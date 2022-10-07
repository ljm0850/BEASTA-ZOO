package com.nft.jav.service;

import com.nft.jav.data.dto.NFTResDto;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface NFTService {
    List<NFTResDto> getUserNFTList(String wallet_address, int page, int size, int sort);
}

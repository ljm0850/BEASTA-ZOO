package com.nft.jav.service;

import com.nft.jav.data.dto.CombiReqDto;
import com.nft.jav.data.dto.NFTAbleResDto;

import java.util.List;

public interface CombiService {

    boolean saveCombiNft(CombiReqDto combReqDto);

    List<NFTAbleResDto> availableNFT(String wallet_address);
}

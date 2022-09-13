package com.nft.jav.service;

import com.nft.jav.data.dto.DrawReqDto;
import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class DrawServiceImpl implements DrawService{

    private final Logger logger = LoggerFactory.getLogger(DrawServiceImpl.class);
    private final NFTRepository nftRepository;
    private final UserRepository userRepository;

    @Override
    public boolean saveDrawNft(DrawReqDto drawReqDto) {
        logger.info("saveDrawNft serviceImpl - 호출");

        User targetUser = userRepository.findById(drawReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        NFT savedNFT = nftRepository.save(NFT.builder()
                .user(targetUser)
                .nft_address(drawReqDto.getNft_address())
                .build());

        if(savedNFT !=null)
            return true;
        return false;
    }
}

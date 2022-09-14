package com.nft.jav.service;

import com.nft.jav.data.dto.CombiReqDto;
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
public class CombiServiceImpl implements CombiService{

    private final Logger logger = LoggerFactory.getLogger(CombiServiceImpl.class);
    private final NFTRepository nftRepository;
    private final UserRepository userRepository;

    @Override
    public boolean saveCombiNft(CombiReqDto combiReqDto) {
        logger.info("saveCombiNft serviceImpl - 호출");

        User targetUser = userRepository.findById(combiReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        NFT savedNFT = nftRepository.save(NFT.builder()
                .user(targetUser)
                .nft_address(combiReqDto.getNft_address())
                .build());

        // 조합으로 쓰인 NFT 삭제
        NFT tartgetNft1 = nftRepository.findById(combiReqDto.getNft_id_1())
                .orElseThrow(IllegalArgumentException::new);
        nftRepository.delete(tartgetNft1);

        NFT tartgetNft2 = nftRepository.findById(combiReqDto.getNft_id_1())
                .orElseThrow(IllegalArgumentException::new);
        nftRepository.delete(tartgetNft2);

        if(savedNFT !=null)
            return true;
        return false;
    }
}

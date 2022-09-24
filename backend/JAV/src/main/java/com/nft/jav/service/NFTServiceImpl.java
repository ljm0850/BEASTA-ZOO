package com.nft.jav.service;

import com.nft.jav.data.dto.NFTResDto;
import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NFTServiceImpl implements NFTService {

    private final UserRepository userRepository;

    private final NFTRepository nftRepository;

    @Override
    public List<NFTResDto> getUserNFTList(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        List<NFT> userNFTList = nftRepository.findAllByUserId(targetUser);

        List<NFTResDto> userNFTResDtoList = new ArrayList<>();
        for(int i=0;i<userNFTList.size();i++) {
            NFT targetNFT = userNFTList.get(i);

            userNFTResDtoList.add(NFTResDto.builder()
                    .nft_id(targetNFT.getNft_id())
                    .nft_address(targetNFT.getNft_address())
                    .user_id(targetUser.getUser_id())
                    .jav_code(targetNFT.getJav_code())
                    .img_address(targetNFT.getImg_address())
                    .build());
        }

        return userNFTResDtoList;
    }
}

package com.nft.jav.service;

import com.nft.jav.data.dto.NFTResDto;
import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public List<NFTResDto> getUserNFTList(String wallet_address, int page, int size, int sort) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<NFT> userNFTList;

        if(sort==0){ // 최근순
            userNFTList= nftRepository.findAllByUserSortLatest(targetUser,pageRequest);
        } else if(sort==1){ // 오래된순
            userNFTList= nftRepository.findAllByUserSortOldest(targetUser,pageRequest);
        } else { // 티어순
            userNFTList= nftRepository.findAllByUserSortTier(targetUser,pageRequest);
        }

        List<NFTResDto> userNFTResDtoList = new ArrayList<>();
        for(NFT targetNFT : userNFTList) {
            userNFTResDtoList.add(NFTResDto.builder()
                    .count(userNFTList.getTotalElements())
                    .total_page(userNFTList.getTotalPages())
                    .nft_id(targetNFT.getNft_id())
                    .nft_address(targetNFT.getNft_address())
                    .token_id(targetNFT.getToken_id())
                    .user_id(targetUser.getUser_id())
                    .jav_code(targetNFT.getJav_code())
                    .img_address(targetNFT.getImg_address())
                    .build());
        }

        return userNFTResDtoList;
    }
}

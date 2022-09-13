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
    public List<NFTResDto> getUserNFTList(long user_id) {
        User targetUser = userRepository.findById(user_id)
                .orElseThrow(IllegalArgumentException::new);
        List<NFT> userNFTList = nftRepository.findAllByUserId(targetUser);

        List<NFTResDto> userNFTResDtoList = new ArrayList<>();
        for(int i=0;i<userNFTList.size();i++) {
            NFT targetNFT = userNFTList.get(i);

            userNFTResDtoList.add(NFTResDto.builder()
                    .nft_id(targetNFT.getNft_id())
                    .nft_address(targetNFT.getNft_address())
                    .build());
        }

        return userNFTResDtoList;
    }
}

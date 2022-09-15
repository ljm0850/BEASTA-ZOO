package com.nft.jav.service;

import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.UserCollection;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.UserCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCollectionServiceImpl implements UserCollectionService {

    private final UserCollectionRepository userCollectionRepository;
    private final NFTRepository nftRepository;
    @Override
    public String getNFTAddress(long user_collection_id) {
        UserCollection userCollection = userCollectionRepository.findById(user_collection_id)
                .orElseThrow(IllegalArgumentException::new);

        NFT targetNFT = nftRepository.findById(userCollection.getNft_id())
                .orElseThrow(IllegalArgumentException::new);

        return targetNFT.getNft_address();
    }
}

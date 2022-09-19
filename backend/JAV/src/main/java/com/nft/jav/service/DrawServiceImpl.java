package com.nft.jav.service;

import com.nft.jav.data.dto.DrawReqDto;
import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.entity.UserCollection;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.ServiceCollectionRepository;
import com.nft.jav.data.repository.UserCollectionRepository;
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
    private final ServiceCollectionRepository serviceCollectionRepository;
    private final UserCollectionRepository userCollectionRepository;

    @Override
    public boolean saveDrawNft(DrawReqDto drawReqDto) {
        logger.info("saveDrawNft serviceImpl - 호출");

        // 뽑은 NFT 저장
        User targetUser = userRepository.findById(drawReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        NFT savedNFT = nftRepository.save(NFT.builder()
                .user(targetUser)
                .nft_address(drawReqDto.getNft_address())
                .jav_code(drawReqDto.getJav_code())
                .img_address(drawReqDto.getImg_address())
                .build());

        // 서비스 전체 도감에서 최초 발견자인지 확인
        ServiceCollection serviceTarget = serviceCollectionRepository.findByJav_code(drawReqDto.getJav_code());

        long userCount = targetUser.getFirst_discover_count();
        if(userCount==0){

            // user정보에 최초 발견 추가
            targetUser.updateFirstDiscoverCount(userCount+1);

            // serviceTarget에 최초 발견자 추가
            serviceTarget.updateUser(targetUser);
        }

        // 전체 도감 발견자 수 추가
        int serviceCount = serviceTarget.getDiscover_user_count();
        serviceTarget.updateDiscoverUserCount(serviceCount+1);

        // 유저 도감에 추가
        UserCollection userCollection = UserCollection.builder()
                .user(targetUser)
                .nft_address(drawReqDto.getNft_address())
                .jav(serviceTarget)
                .build();

        UserCollection savedUserCollection = userCollectionRepository.save(userCollection);

        if(savedNFT !=null && savedUserCollection != null)
            return true;
        return false;
    }
}

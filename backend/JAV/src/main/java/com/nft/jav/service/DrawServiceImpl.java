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
        User targetUser = userRepository.findByWalletAddress(drawReqDto.getWallet_address());

        // 전체 도감에 있는 자브종이 아닐 때 전체 도감에 자브종 저장
        if(!serviceCollectionRepository.existsByJav_code(drawReqDto.getJav_code())){
            serviceCollectionRepository.save(ServiceCollection.builder()
                            .discover_user_count(0)
                            .jav_code(drawReqDto.getJav_code())
                            .jav_img_path(drawReqDto.getImg_address())
                            .level(drawReqDto.getTier())
                            .user(targetUser)
                            .build());

            // user정보에 최초 발견 추가
            long userCount = targetUser.getFirst_discover_count();
            targetUser.updateFirstDiscoverCount(userCount+1);
        }

        ServiceCollection serviceTarget = serviceCollectionRepository.findByJav_code(drawReqDto.getJav_code());

        // 뽑은 NFT 저장
        NFT savedNFT = nftRepository.save(NFT.builder()
                .user(targetUser)
                .nft_address(drawReqDto.getNft_address())
                .jav_code(drawReqDto.getJav_code())
                .serviceCollection(serviceTarget)
                .img_address(drawReqDto.getImg_address())
                .build());

        // 전체 도감 발견자 수 추가
        int serviceCount = serviceTarget.getDiscover_user_count();
        serviceTarget.updateDiscoverUserCount(serviceCount+1);

        // 유저 도감에 없는 자브종일 때 추가
        if(userCollectionRepository.countByWalletAndJav(targetUser.getWallet_address(), serviceTarget.getJav_id())==0){
            UserCollection userCollection = UserCollection.builder()
                    .user(targetUser)
                    .nft_address(drawReqDto.getNft_address())
                    .img_address(serviceTarget.getJav_img_path())
                    .jav(serviceTarget)
                    .build();

            userCollectionRepository.save(userCollection);
        }


        if(savedNFT !=null) return true;
        return false;
    }
}

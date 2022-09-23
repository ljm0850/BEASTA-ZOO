package com.nft.jav.service;

import com.nft.jav.data.dto.CombiReqDto;
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

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class CombiServiceImpl implements CombiService{

    private final Logger logger = LoggerFactory.getLogger(CombiServiceImpl.class);
    private final NFTRepository nftRepository;
    private final UserRepository userRepository;
    private final ServiceCollectionRepository serviceCollectionRepository;
    private final UserCollectionRepository userCollectionRepository;

    @Override
    public boolean saveCombiNft(CombiReqDto combiReqDto) {
        logger.info("saveCombiNft serviceImpl - 호출");

        User targetUser = userRepository.findById(combiReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        NFT savedNFT = nftRepository.save(NFT.builder()
                .user(targetUser)
                .nft_address(combiReqDto.getNft_address())
                .jav_code(combiReqDto.getJav_code())
                .img_address(combiReqDto.getImg_address())
                .build());

        // 조합으로 쓰인 NFT 삭제
        NFT targetNft1 = nftRepository.findById(combiReqDto.getNft_id_1())
                .orElseThrow(IllegalArgumentException::new);
        nftRepository.delete(targetNft1);

        NFT targetNft2 = nftRepository.findById(combiReqDto.getNft_id_1())
                .orElseThrow(IllegalArgumentException::new);
        nftRepository.delete(targetNft2);

        // 서비스 전체 도감에서 최초 발견자인지 확인
        ServiceCollection serviceTarget = serviceCollectionRepository.findByJav_code(combiReqDto.getJav_code());

        long userCount = targetUser.getFirst_discover_count();
        int serviceCount = serviceTarget.getDiscover_user_count();

        if(serviceCount==0){

            // user정보에 최초 발견 추가
            targetUser.updateFirstDiscoverCount(userCount+1);

            // serviceTarget에 최초 발견자 추가
            serviceTarget.updateUser(targetUser);

            // 최초 발견시간 저장
            serviceTarget.updateDiscoverTime(LocalDateTime.now());
        }

        // 전체 도감 발견자 수 추가
        serviceTarget.updateDiscoverUserCount(serviceCount+1);

        // 유저 도감에 추가
        UserCollection userCollection = UserCollection.builder()
                .user(targetUser)
                .nft_address(combiReqDto.getNft_address())
                .img_address(savedNFT.getImg_address())
                .jav(serviceTarget)
                .build();

        UserCollection savedUserCollection = userCollectionRepository.save(userCollection);

        if(savedNFT !=null && savedUserCollection !=null) return true;

        return false;
    }
}
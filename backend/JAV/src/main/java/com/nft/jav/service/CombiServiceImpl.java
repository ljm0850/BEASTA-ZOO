package com.nft.jav.service;

import com.nft.jav.data.dto.CombiReqDto;
import com.nft.jav.data.dto.NFTAbleResDto;
import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.entity.UserCollection;
import com.nft.jav.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CombiServiceImpl implements CombiService{

    private final Logger logger = LoggerFactory.getLogger(CombiServiceImpl.class);
    private final NFTRepository nftRepository;
    private final UserRepository userRepository;
    private final SalesRepository salesRepository;
    private final ServiceCollectionRepository serviceCollectionRepository;
    private final UserCollectionRepository userCollectionRepository;

    @Override
    public boolean saveCombiNft(CombiReqDto combiReqDto) {
        logger.info("saveCombiNft serviceImpl - 호출");

        User targetUser = userRepository.findByWalletAddress(combiReqDto.getWallet_address());
        logger.info(combiReqDto.getJav_code().substring(0,3));
        String gene = combiReqDto.getJav_code().substring(0,3);

        // 전체 도감에 있는 자브종이 아닐 때 전체 도감에 자브종 저장
        if(!serviceCollectionRepository.existsByJav_code(gene)){
            serviceCollectionRepository.save(ServiceCollection.builder()
                    .discover_user_count(0)
                    .jav_code(gene)
                    .jav_img_path(combiReqDto.getImg_address())
                    .tier(combiReqDto.getTier())
                    .user(targetUser)
                    .build());

            // user정보에 최초 발견 추가
            long userCount = targetUser.getFirst_discover_count();
            targetUser.updateFirstDiscoverCount(userCount+1);
        }

        ServiceCollection serviceTarget = serviceCollectionRepository.findByJav_code(gene);

        // 뽑은 NFT 저장
        NFT savedNFT = nftRepository.save(NFT.builder()
                .user(targetUser)
                .nft_address(combiReqDto.getNft_address())
                .token_id(combiReqDto.getToken_id())
                .jav_code(combiReqDto.getJav_code())
                .serviceCollection(serviceTarget)
                .img_address(combiReqDto.getImg_address())
                .isDeleted(false)
                .build());

        // 조합으로 쓰인 NFT 삭제
        NFT targetNft1 = nftRepository.findById(combiReqDto.getNft_id_1())
                .orElseThrow(IllegalArgumentException::new);
        targetNft1.updateState(true);

        NFT targetNft2 = nftRepository.findById(combiReqDto.getNft_id_2())
                .orElseThrow(IllegalArgumentException::new);
        targetNft2.updateState(true);

        // 전체 도감 발견자 수 추가
        int serviceCount = serviceTarget.getDiscover_user_count();
        serviceTarget.updateDiscoverUserCount(serviceCount+1);

        // 유저 도감에 없는 자브종일 때 추가
        if(userCollectionRepository.countByWalletAndJav(targetUser.getWallet_address(), serviceTarget.getJav_id())==0){
            UserCollection userCollection = UserCollection.builder()
                    .user(targetUser)
                    .jav(serviceTarget)
                    .build();

            userCollectionRepository.save(userCollection);
        }

        if(savedNFT !=null) return true;

        return false;
    }

    @Override
    public List<NFTAbleResDto> availableNFT(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);
        List<NFT> userNFT = nftRepository.findAllByUserId(targetUser);
        List<NFT> salesNFT = salesRepository.findNFTByUser(targetUser);

        List<NFTAbleResDto> nftList = new ArrayList<>();

        for(int i=0; i<userNFT.size(); i++){
            NFT targetNFT = userNFT.get(i);
            if(!salesNFT.contains(userNFT.get(i))) {
                NFTAbleResDto nftAbleResDto = NFTAbleResDto.builder()
                        .img_address(targetNFT.getImg_address())
                        .nft_id(targetNFT.getNft_id())
                        .jav_code(targetNFT.getJav_code())
                        .nft_address(targetNFT.getNft_address())
                        .token_id(targetNFT.getToken_id())
                        .user_id(targetNFT.getUser().getUser_id())
                        .build();

                nftList.add(nftAbleResDto);
            }
        }

        return nftList;
    }
}

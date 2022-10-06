package com.nft.jav.service;

import com.nft.jav.data.dto.*;
import com.nft.jav.data.entity.Community;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.CommunityRepository;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.UserCollectionRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{

    private final Logger logger = LoggerFactory.getLogger(CommunityServiceImpl.class);
    private final CommunityRepository communityRepository;
    private final UserCollectionRepository userCollectionRepository;
    private final UserRepository userRepository;
    private final NFTRepository nftRepository;

    @Override
    public List<CommunityResDto> communityList() {
        logger.info("communityList service - 호출");
        List<Community> findAll = communityRepository.findByType(0);

        List<CommunityResDto> findAllDto = new ArrayList<>();
        for(int i=0;i<findAll.size();i++) {
            Community community = findAll.get(i);
            CommunityResDto communityDto = CommunityResDto.builder()
                    .community_id(community.getCommunity_id())
                    .content(community.getContent())
                    .hit(community.getHit())
                    .type(community.getType())
                    .title(community.getTitle())
                    .user_id(community.getUser().getUser_id())
                    .createdTime(community.getCreate_date())
                    .build();

            findAllDto.add(communityDto);
        }
        return findAllDto;
    }

    @Override
    public List<CommunityResDto> noticeList() {
        logger.info("noticeList service - 호출");
        List<Community> noticeList = communityRepository.findByType(1);

        List<CommunityResDto> findNoticeDto = new ArrayList<>();
        for(int i=0;i<noticeList.size();i++) {
            Community community = noticeList.get(i);
            CommunityResDto communityDto = CommunityResDto.builder()
                    .community_id(community.getCommunity_id())
                    .content(community.getContent())
                    .hit(community.getHit())
                    .type(community.getType())
                    .title(community.getTitle())
                    .user_id(community.getUser().getUser_id())
                    .createdTime(community.getCreate_date())
                    .build();

            findNoticeDto.add(communityDto);
        }
        return findNoticeDto;
    }

    @Override
    public CommunityResDto detailCommunity(long communityId) {
        logger.info("detailCommunity service - 호출");
        Community community = communityRepository.findById(communityId)
                .orElseThrow(IllegalArgumentException::new);

        community.updateHit(community.getHit());

        CommunityResDto communityDto = CommunityResDto.builder()
                .community_id(community.getCommunity_id())
                .content(community.getContent())
                .hit(community.getHit())
                .type(community.getType())
                .title(community.getTitle())
                .user_id(community.getUser().getUser_id())
                .createdTime(community.getCreate_date())
                .build();

        return communityDto;
    }

    @Override
    public boolean saveCommunity(CommunityReqDto communityReqDto) {
        logger.info("saveCommunity service - 호출");
        User targetUser = userRepository.findById(communityReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        Community savedCommunity = communityRepository.save(Community.builder()
                .content(communityReqDto.getContent())
                .title(communityReqDto.getTitle())
                .type(communityReqDto.getType())
                .hit(0)
                .user(targetUser)
                .build());

        if(savedCommunity != null)
            return true;
        return false;
    }

    @Override
    public boolean updateCommunity(CommunityModiReqDto communityModiReqDto) {
        logger.info("updateCommunity service - 호출");
        Community target = communityRepository.findById(communityModiReqDto.getCommunity_id())
                .orElseThrow(IllegalArgumentException::new);

        target.updateContent(communityModiReqDto.getContent());
        target.updateTitle(communityModiReqDto.getTitle());

        return target.getContent().equals(communityModiReqDto.getContent()) && target.getTitle().equals(communityModiReqDto.getTitle());
    }

    @Override
    public boolean deleteCommunity(long communityId) {
        logger.info("deleteCommunity service - 호출");
        Community target = communityRepository.findById(communityId)
                .orElseThrow(IllegalArgumentException::new);

        communityRepository.delete(target);

        return !communityRepository.existsById(communityId);
    }

    @Override
    public List<RankResDto> rankUser() {
        logger.info("rankUser service - 호출");

        List<RankRes> target = userCollectionRepository.countByUser();

        List<RankResDto> rankDtoList = new ArrayList<>();

        for(int i=0; i<target.size(); i++){
            RankRes rankRes = target.get(i);
            rankRes.getUser().updateTier(i+1);
            RankResDto rankResDto = RankResDto.builder()
                    .nickname(rankRes.getUser().getNickname())
                    .user_id(rankRes.getUser().getUser_id())
                    .wallet_address(rankRes.getUser().getWallet_address())
                    .grade(rankRes.getCount())
                    .countNFT(nftRepository.countNFTByUser(rankRes.getUser()))
                    .build();
            logger.info(rankResDto.toString());
            rankDtoList.add(rankResDto);
        }

        return rankDtoList;
    }
}

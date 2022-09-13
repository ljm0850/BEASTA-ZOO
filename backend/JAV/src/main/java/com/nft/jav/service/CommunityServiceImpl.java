package com.nft.jav.service;

import com.nft.jav.data.dto.CommunityDto;
import com.nft.jav.data.entity.Community;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.CommunityRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{

    private final Logger logger = LoggerFactory.getLogger(CommunityServiceImpl.class);
    private final CommunityRepository communityRepository;

    private final UserRepository userRepository;

    @Override
    public List<CommunityDto> communityList() {
        List<Community> findAll = communityRepository.findByType(0);

        List<CommunityDto> findAllDto = new ArrayList<>();
        for(int i=0;i<findAll.size();i++) {
            Community community = findAll.get(i);
            CommunityDto communityDto = CommunityDto.builder()
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
    public List<CommunityDto> noticeList() {
        List<Community> noticeList = communityRepository.findByType(1);

        List<CommunityDto> findNoticeDto = new ArrayList<>();
        for(int i=0;i<noticeList.size();i++) {
            Community community = noticeList.get(i);
            CommunityDto communityDto = CommunityDto.builder()
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
    public CommunityDto detailCommunity(long communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(IllegalArgumentException::new);

        CommunityDto communityDto = CommunityDto.builder()
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
    public boolean saveCommunity(CommunityDto communityDto) {

        User targetUser = userRepository.findById(communityDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        Community savedCommunity = communityRepository.save(Community.builder()
                .content(communityDto.getContent())
                .title(communityDto.getTitle())
                .type(communityDto.getType())
                .hit(0)
                .user(targetUser)
                .build());

        if(savedCommunity != null)
            return true;
        return false;
    }
}

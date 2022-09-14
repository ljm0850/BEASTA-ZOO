package com.nft.jav.service;


import com.nft.jav.data.dto.CommunityModiReqDto;
import com.nft.jav.data.dto.CommunityReqDto;
import com.nft.jav.data.dto.CommunityResDto;
import com.nft.jav.data.dto.UserResDto;

import java.util.List;

public interface CommunityService {
    List<CommunityResDto> communityList();

    List<CommunityResDto> noticeList();

    CommunityResDto detailCommunity(long communityId);

    boolean saveCommunity(CommunityReqDto communityReqDto);

    boolean updateCommunity(CommunityModiReqDto communityModiReqDto);

    boolean deleteCommunity(long communityId);

    List<UserResDto> rankUser();
}

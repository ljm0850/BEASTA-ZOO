package com.nft.jav.service;


import com.nft.jav.data.dto.CommunityDto;

import java.util.List;

public interface CommunityService {
    List<CommunityDto> communityList();

    List<CommunityDto> noticeList();

    CommunityDto detailCommunity(long communityId);

    boolean saveCommunity(CommunityDto communityDto);
}

package com.nft.jav.service;


import com.nft.jav.data.dto.*;

import java.util.List;

public interface CommunityService {
    List<CommunityResDto> communityList();

    List<CommunityResDto> noticeList();

    CommunityResDto detailCommunity(long communityId);

    boolean saveCommunity(CommunityReqDto communityReqDto);

    boolean updateCommunity(CommunityModiReqDto communityModiReqDto);

    boolean deleteCommunity(long communityId);

    List<RankResDto> rankUser();
}

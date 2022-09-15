package com.nft.jav.service;

import com.nft.jav.data.dto.UserReqDto;
import com.nft.jav.data.dto.UserResDto;

public interface UserService {
    UserResDto login(String wallet_address);

    UserResDto userInfo(long user_id);

    Double getUserTier(long user_id);

    Double getUserToken(long user_id);

    UserResDto updateUserInfo(long user_id, UserReqDto userReqDto);
}

package com.nft.jav.service;

import com.nft.jav.data.dto.UserReqDto;
import com.nft.jav.data.dto.UserResDto;

public interface UserService {
    UserResDto login(String wallet_address);

    UserResDto userInfo(String wallet_address);

    Double getUserTier(String wallet_address);

    Double getUserToken(String wallet_address);

    UserResDto updateUserInfo(String wallet_address, UserReqDto userReqDto);
}

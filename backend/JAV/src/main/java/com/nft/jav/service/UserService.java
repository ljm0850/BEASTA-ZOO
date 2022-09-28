package com.nft.jav.service;

import com.nft.jav.data.dto.NicknameResDto;
import com.nft.jav.data.dto.UserRankResDto;
import com.nft.jav.data.dto.UserReqDto;
import com.nft.jav.data.dto.UserResDto;

public interface UserService {
    UserResDto login(String wallet_address);

    UserResDto userInfo(String wallet_address);

    NicknameResDto getNickname(String wallet_address);

    UserRankResDto getUserTier(String wallet_address);

    Double getUserToken(String wallet_address);

    UserResDto updateUserInfo(String wallet_address, UserReqDto userReqDto);
}

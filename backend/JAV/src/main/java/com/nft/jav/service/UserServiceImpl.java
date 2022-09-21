package com.nft.jav.service;

import com.nft.jav.data.dto.UserReqDto;
import com.nft.jav.data.dto.UserResDto;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(CommunityServiceImpl.class);

    private final UserRepository userRepository;

    @Override
    public UserResDto login(String wallet_address) {

        User targetUser = userRepository.findByWalletAddress(wallet_address);

        if(targetUser != null) {
            UserResDto userResDto = UserResDto.builder()
                    .user_id(targetUser.getUser_id())
                    .wallet_address(targetUser.getWallet_address())
                    .nickname(targetUser.getNickname())
                    .profile_img_path(targetUser.getProfile_img_path())
                    .banner_img_path(targetUser.getBanner_img_path())
                    .profile_description(targetUser.getProfile_description())
                    .create_date(targetUser.getCreate_date())
                    .first_discover_count(targetUser.getFirst_discover_count())
                    .tier(targetUser.getTier())
                    .token(targetUser.getToken())
                    .build();
            return userResDto;
        } else {
            User newUser = User.builder()
                .wallet_address(wallet_address)
                .build();

            targetUser = userRepository.save(newUser);

            UserResDto userResDto = UserResDto.builder()
                    .user_id(targetUser.getUser_id())
                    .wallet_address(targetUser.getWallet_address())
                    .build();
            return userResDto;
        }
    }

    @Override
    public UserResDto userInfo(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        UserResDto userResDto = UserResDto.builder()
                .user_id(targetUser.getUser_id())
                .wallet_address(targetUser.getWallet_address())
                .nickname(targetUser.getNickname())
                .profile_img_path(targetUser.getProfile_img_path())
                .banner_img_path(targetUser.getBanner_img_path())
                .profile_description(targetUser.getProfile_description())
                .create_date(targetUser.getCreate_date())
                .first_discover_count(targetUser.getFirst_discover_count())
                .tier(targetUser.getTier())
                .token(targetUser.getToken())
                .build();
        return userResDto;
    }

    @Override
    public Double getUserTier(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        return targetUser.getTier();
    }

    @Override
    public Double getUserToken(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        return targetUser.getToken();
    }

    @Override
    public UserResDto updateUserInfo(String wallet_address, UserReqDto userReqDto) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        targetUser.updateTier(userReqDto.getTier());
        targetUser.updateNickname(userReqDto.getNickname());
        targetUser.updateToken(userReqDto.getToken());
        targetUser.updateProfileDescription(userReqDto.getProfile_description());
        targetUser.updateWalletAddress(userReqDto.getWallet_address());
        targetUser.updateBannerImgPath(userReqDto.getBanner_img_path());
        targetUser.updateFirstDiscoverCount(userReqDto.getFirst_discover_count());
        targetUser.updateProfileImgPath(userReqDto.getProfile_img_path());

        UserResDto userResDto = UserResDto.builder()
                .user_id(targetUser.getUser_id())
                .tier(targetUser.getTier())
                .wallet_address(targetUser.getWallet_address())
                .create_date(targetUser.getCreate_date())
                .first_discover_count(targetUser.getFirst_discover_count())
                .banner_img_path(targetUser.getBanner_img_path())
                .nickname(targetUser.getNickname())
                .token(targetUser.getToken())
                .profile_img_path(targetUser.getProfile_img_path())
                .profile_description(targetUser.getProfile_description())
                .build();

        return userResDto;
    }
}

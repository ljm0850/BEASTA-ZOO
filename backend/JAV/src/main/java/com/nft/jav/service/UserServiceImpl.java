package com.nft.jav.service;

import com.nft.jav.data.dto.NicknameResDto;
import com.nft.jav.data.dto.UserRankResDto;
import com.nft.jav.data.dto.UserReqDto;
import com.nft.jav.data.dto.UserResDto;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.NFTRepository;
import com.nft.jav.data.repository.UserCollectionRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(CommunityServiceImpl.class);

    private final UserRepository userRepository;
    private final NFTRepository nftRepository;
    private final UserCollectionRepository userCollectionRepository;

    @Override
    public UserResDto login(String wallet_address) {

        User targetUser = userRepository.findByWalletAddress(wallet_address);

        if(targetUser != null) {
            UserResDto userResDto = UserResDto.builder()
                    .nickname(targetUser.getNickname())
                    .profile_img_path(targetUser.getProfile_img_path())
                    .banner_img_path(targetUser.getBanner_img_path())
                    .profile_description(targetUser.getProfile_description())
                    .first_discover_count(targetUser.getFirst_discover_count())
                    .tier(targetUser.getTier())
                    .token(targetUser.getToken())
                    .build();
            return userResDto;
        } else {
            User newUser = User.builder()
                .wallet_address(wallet_address)
                .build();

            // 랜덤 닉네임 생성
            String randomNick = null;
            try {
                randomNick = makeRandomNickname();
            } catch (Exception e) {
                e.printStackTrace();
            }

            while(userRepository.existsByNickname(randomNick)){
                logger.info("중복 닉네임");
                try {
                    randomNick = makeRandomNickname();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            newUser.updateNickname(randomNick);

            targetUser = userRepository.save(newUser);

            UserResDto userResDto = UserResDto.builder()
                    .nickname(targetUser.getNickname())
                    .profile_img_path(targetUser.getProfile_img_path())
                    .banner_img_path(targetUser.getBanner_img_path())
                    .profile_description(targetUser.getProfile_description())
                    .first_discover_count(targetUser.getFirst_discover_count())
                    .tier(targetUser.getTier())
                    .token(targetUser.getToken())
                    .build();
            return userResDto;
        }
    }

    @Override
    public UserResDto userInfo(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        UserResDto userResDto = UserResDto.builder()
                .nickname(targetUser.getNickname())
                .profile_img_path(targetUser.getProfile_img_path())
                .banner_img_path(targetUser.getBanner_img_path())
                .profile_description(targetUser.getProfile_description())
                .first_discover_count(targetUser.getFirst_discover_count())
                .tier(targetUser.getTier())
                .token(targetUser.getToken())
                .build();
        return userResDto;
    }

    @Override
    public NicknameResDto getNickname(String wallet_address) {
        NicknameResDto nicknameResDto = NicknameResDto.builder()
                .nickname(userRepository.findNicknameByWalletAddress(wallet_address))
                .build();
        return nicknameResDto;
    }

    @Override
    public UserRankResDto getUserTier(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);
        UserRankResDto userRankResDto = UserRankResDto.builder()
                .rank(targetUser.getTier())
                .grade(userCollectionRepository.countByWallet(wallet_address))
                .countNFT(nftRepository.countNFTByUser(targetUser))
                .build();

        return userRankResDto;
    }

    @Override
    public Double getUserToken(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        return targetUser.getToken();
    }

    @Override
    public UserResDto updateUserInfo(String wallet_address, UserReqDto userReqDto) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);
        logger.info(userReqDto.toString());
        targetUser.updateTier(userReqDto.getTier());

        targetUser.updateNickname(userReqDto.getNickname());
        targetUser.updateToken(userReqDto.getToken());
        targetUser.updateProfileDescription(userReqDto.getProfile_description());
        targetUser.updateBannerImgPath(userReqDto.getBanner_img_path());
        targetUser.updateFirstDiscoverCount(userReqDto.getFirst_discover_count());
        targetUser.updateProfileImgPath(userReqDto.getProfile_img_path());

        UserResDto userResDto = UserResDto.builder()
                .tier(targetUser.getTier())
                .first_discover_count(targetUser.getFirst_discover_count())
                .banner_img_path(targetUser.getBanner_img_path())
                .nickname(targetUser.getNickname())
                .token(targetUser.getToken())
                .profile_img_path(targetUser.getProfile_img_path())
                .profile_description(targetUser.getProfile_description())
                .build();

        return userResDto;
    }

    public String makeRandomNickname() throws Exception {
        // REST API 호출
        URL url = new URL("https://nickname.hwanmoo.kr/?format=json&count=1&max_length=8");
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/json"); // Content-Type 지정
        conn.setDoOutput(true); // 출력 가능 상태로 변경
        conn.connect();

        // 데이터  읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        StringBuilder sb = new StringBuilder();
        String line = "";
        while((line = br.readLine()) != null) {
            sb.append(line); // StringBuilder 사용시 객체를 계속 생성하지 않고 하나의 객체릂 수정하므로 더 빠름.
        }
        conn.disconnect();

        // JSON Parsing
        JSONObject jsonObj = (JSONObject) new JSONParser().parse(sb.toString());

        // 이런 방식으로 데이터 꺼낼 수 있음.
        System.out.println(jsonObj.get("words"));
        String nickname = jsonObj.get("words").toString();

        nickname=nickname.replaceAll("\\[", "");
        nickname=nickname.replaceAll("\\]", "");
        nickname=nickname.replaceAll("\"", "");

        return nickname;
    }
}

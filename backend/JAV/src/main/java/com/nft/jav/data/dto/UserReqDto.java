package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;

@Data
@NoArgsConstructor
@ToString
public class UserReqDto {
    private String nickname;

    private String profile_img_path;

    private String banner_img_path;

    private String profile_description;

    private long first_discover_count;

    private double tier;

    private double token;

    @Builder
    public UserReqDto(String nickname,
                      String profile_img_path, String banner_img_path, String profile_description, long first_discover_count, double tier, double token) {
        this.nickname = nickname;
        this.profile_img_path = profile_img_path;
        this.banner_img_path = banner_img_path;
        this.profile_description = profile_description;
        this.first_discover_count = first_discover_count;
        this.tier = tier;
        this.token = token;
    }
}

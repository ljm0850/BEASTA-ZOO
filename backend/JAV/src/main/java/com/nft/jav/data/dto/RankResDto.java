package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class RankResDto {

    long user_id;
    String wallet_address;
    String nickname;
    long grade;
    long countNFT;

    @Builder
    public RankResDto(long user_id, String wallet_address, String nickname, long grade, long countNFT) {
        this.user_id = user_id;
        this.wallet_address = wallet_address;
        this.nickname = nickname;
        this.grade = grade;
        this.countNFT = countNFT;
    }
}

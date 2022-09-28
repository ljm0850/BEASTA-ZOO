package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class UserRankResDto {
    double rank;
    long grade;
    long countNFT;

    @Builder
    public UserRankResDto(double rank, long grade, long countNFT) {
        this.rank = rank;
        this.grade = grade;
        this.countNFT = countNFT;
    }
}

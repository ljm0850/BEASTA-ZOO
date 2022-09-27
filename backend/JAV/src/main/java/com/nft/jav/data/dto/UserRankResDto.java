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

    @Builder
    public UserRankResDto(double rank, long grade) {
        this.rank = rank;
        this.grade = grade;
    }
}

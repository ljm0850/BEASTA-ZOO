package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class NicknameResDto {
    String nickname;

    @Builder
    public NicknameResDto(String nickname) {
        this.nickname = nickname;
    }
}

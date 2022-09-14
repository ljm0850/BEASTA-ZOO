package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class CommunityReqDto {

    private long user_id;

    private String title;

    private String content;

    private int type;

    @Builder
    public CommunityReqDto(long user_id, String title, String content, int type) {
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.type = type;
    }
}

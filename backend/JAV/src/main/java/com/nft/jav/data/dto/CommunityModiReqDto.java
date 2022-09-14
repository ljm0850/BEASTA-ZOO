package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class CommunityModiReqDto {

    private long community_id;
    private long user_id;
    private String title;
    private String content;

    @Builder
    public CommunityModiReqDto(long community_id, long user_id, String title, String content) {
        this.community_id = community_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
    }
}

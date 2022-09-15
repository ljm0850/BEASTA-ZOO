package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@NoArgsConstructor
@ToString
public class CommentModiReqDto {
    private long comment_id;

    private long user_id;

    private String content;

    @Builder
    public CommentModiReqDto(long comment_id, long user_id, String content) {
        this.comment_id = comment_id;
        this.user_id = user_id;
        this.content = content;
    }
}

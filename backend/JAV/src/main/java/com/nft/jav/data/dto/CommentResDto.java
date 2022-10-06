package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class CommentResDto {
    private long comment_id;
    private long user_id;
    private String user_nickname;
    private String content;
    private LocalDateTime createdTime;

    @Builder

    public CommentResDto(long comment_id, long user_id, String user_nickname, String content, LocalDateTime createdTime) {
        this.comment_id = comment_id;
        this.user_id = user_id;
        this.user_nickname = user_nickname;
        this.content = content;
        this.createdTime = createdTime;
    }
}

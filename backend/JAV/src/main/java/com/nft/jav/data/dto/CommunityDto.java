package com.nft.jav.data.dto;

import com.nft.jav.data.entity.BaseTimeEntity;
import com.nft.jav.data.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class CommunityDto{

    private long community_id;

    private long user_id;

    private String title;

    private String content;

    private int hit;

    private int type;

    private LocalDateTime createdTime;

    @Builder
    public CommunityDto(long community_id, long user_id, String title, String content, int hit, int type, LocalDateTime createdTime) {
        this.community_id = community_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.hit = hit;
        this.type = type;
        this.createdTime = createdTime;
    }
}

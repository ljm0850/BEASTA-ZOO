package com.nft.jav.data.dto;

import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@NoArgsConstructor
@ToString
public class LikedResDto {
    private long like_id;

    private long user_id;

    private long sale_id;

    @Builder
    public LikedResDto(long like_id, long user_id, long sale_id) {
        this.like_id = like_id;
        this.user_id = user_id;
        this.sale_id = sale_id;
    }
}

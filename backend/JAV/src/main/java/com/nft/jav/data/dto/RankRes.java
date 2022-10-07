package com.nft.jav.data.dto;

import com.nft.jav.data.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class RankRes {

    User user;
    Long count;

    @Builder
    public RankRes(User user, Long count) {
        this.user = user;
        this.count = count;
    }
}

package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class PurchaseResDto {

    private long nft_id;

    private long user_id;

    private String nft_address;

    private long user_collection_id;

    private long jav_id;

    @Builder
    public PurchaseResDto(long nft_id, long user_id, String nft_address, long user_collection_id, long jav_id) {
        this.nft_id = nft_id;
        this.user_id = user_id;
        this.nft_address = nft_address;
        this.user_collection_id = user_collection_id;
        this.jav_id = jav_id;
    }
}

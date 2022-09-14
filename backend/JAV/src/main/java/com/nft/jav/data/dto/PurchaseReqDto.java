package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class PurchaseReqDto {

    private long user_id;

    private long nft_id;

    private long service_collection_id;

    private long sale_id;

    @Builder
    public PurchaseReqDto(long user_id, long nft_id, long service_collection_id, long sale_id) {
        this.user_id = user_id;
        this.nft_id = nft_id;
        this.service_collection_id = service_collection_id;
        this.sale_id = sale_id;
    }
}

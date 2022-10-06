package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class PurchaseReqDto {

    private String buyer_wallet_address;

    private long nft_id;

    private long sale_id;

    @Builder
    public PurchaseReqDto(String buyer_wallet_address, long nft_id, long sale_id) {
        this.buyer_wallet_address = buyer_wallet_address;
        this.nft_id = nft_id;
        this.sale_id = sale_id;
    }
}

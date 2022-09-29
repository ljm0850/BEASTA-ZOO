package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class PurchaseReqDto {

    private String wallet_address;

    private long nft_id;

    private long sale_id;

    @Builder
    public PurchaseReqDto(String wallet_address, long nft_id, long sale_id) {
        this.wallet_address = wallet_address;
        this.nft_id = nft_id;
        this.sale_id = sale_id;
    }
}

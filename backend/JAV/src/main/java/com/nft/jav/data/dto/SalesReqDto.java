package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class SalesReqDto {
    private long nft_id;

    private double price;

    private String contract_address;

    private String seller_wallet;


    @Builder
    public SalesReqDto(long nft_id, double price,
                       String contract_address, String seller_wallet) {
        this.nft_id = nft_id;
        this.price = price;
        this.contract_address = contract_address;
        this.seller_wallet = seller_wallet;
    }
}

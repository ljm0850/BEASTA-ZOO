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
    private long user_id;

    private long nft_id;

    private double price;

    private String contract_address;

    private String seller_wallet;


    private LocalDateTime sale_start_date;

    private LocalDateTime sale_completed_date;

    @Builder

    public SalesReqDto(long user_id, long nft_id, double price,
                       String contract_address, String seller_wallet, LocalDateTime sale_start_date, LocalDateTime sale_completed_date) {
        this.user_id = user_id;
        this.nft_id = nft_id;
        this.price = price;
        this.contract_address = contract_address;
        this.seller_wallet = seller_wallet;
        this.sale_start_date = sale_start_date;
        this.sale_completed_date = sale_completed_date;
    }
}

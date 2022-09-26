package com.nft.jav.data.dto;

import com.nft.jav.data.entity.Liked;
import com.nft.jav.data.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class SalesResDto {
    private int total_page;

    private long sale_id;
    private long nft_id;
    private int state;
    private String img_address;

    private double price;

    private String contract_address;

    private String seller_wallet;

    private String buyer_wallet;

    private LocalDateTime sale_start_date;

    private LocalDateTime sale_completed_date;

    @Builder

    public SalesResDto(int total_page, long sale_id, long nft_id, String img_address, int state, double price, String contract_address,
                       String seller_wallet, String buyer_wallet, LocalDateTime sale_start_date, LocalDateTime sale_completed_date) {
        this.total_page = total_page;
        this.sale_id = sale_id;
        this.nft_id = nft_id;
        this.img_address = img_address;
        this.state = state;
        this.price = price;
        this.contract_address = contract_address;
        this.seller_wallet = seller_wallet;
        this.buyer_wallet = buyer_wallet;
        this.sale_start_date = sale_start_date;
        this.sale_completed_date = sale_completed_date;
    }
}

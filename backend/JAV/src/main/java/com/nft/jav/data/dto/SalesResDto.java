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

    private long sale_id;
    private long nft_id;
    private int state;
    private String img_address;
    private String jav_code;
    private double price;

    private String contract_address;

    private String seller_wallet;
    private String seller_nickname;

    private String buyer_wallet;
    private String buyer_nickname;

    private LocalDateTime sale_start_date;

    private LocalDateTime sale_completed_date;

    @Builder

    public SalesResDto(long sale_id, long nft_id, String img_address, String jav_code, int state, double price, String contract_address,
                       String seller_wallet, String buyer_wallet, String seller_nickname, String buyer_nickname, LocalDateTime sale_start_date, LocalDateTime sale_completed_date) {
        this.sale_id = sale_id;
        this.nft_id = nft_id;
        this.img_address = img_address;
        this.jav_code = jav_code;
        this.state = state;
        this.price = price;
        this.contract_address = contract_address;
        this.seller_wallet = seller_wallet;
        this.seller_nickname = seller_nickname;
        this.buyer_wallet = buyer_wallet;
        this.buyer_nickname = buyer_nickname;
        this.sale_start_date = sale_start_date;
        this.sale_completed_date = sale_completed_date;
    }
}

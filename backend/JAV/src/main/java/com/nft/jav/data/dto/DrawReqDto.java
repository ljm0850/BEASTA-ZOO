package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class DrawReqDto {
    private String wallet_address;
    private String nft_address;
    private String token_id;
    private String jav_code;
    private int tier;
    private String img_address;

    @Builder
    public DrawReqDto(String wallet_address, String nft_address, String token_id, String jav_code, int tier, String img_address) {
        this.wallet_address = wallet_address;
        this.nft_address = nft_address;
        this.token_id = token_id;
        this.jav_code = jav_code;
        this.tier = tier;
        this.img_address = img_address;
    }
}

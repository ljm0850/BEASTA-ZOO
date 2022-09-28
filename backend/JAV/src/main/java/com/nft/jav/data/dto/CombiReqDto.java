package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class CombiReqDto {

    private String wallet_address;
    private String nft_address;
    private String img_address;
    private String jav_code;
    private int tier;
    private long nft_id_1;
    private long nft_id_2;

    @Builder
    public CombiReqDto(String wallet_address, String nft_address, String img_address, String jav_code, int tier, long nft_id_1, long nft_id_2) {
        this.wallet_address = wallet_address;
        this.nft_address = nft_address;
        this.img_address = img_address;
        this.jav_code = jav_code;
        this.tier = tier;
        this.nft_id_1 = nft_id_1;
        this.nft_id_2 = nft_id_2;
    }
}

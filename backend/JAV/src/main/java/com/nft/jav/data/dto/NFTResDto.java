package com.nft.jav.data.dto;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@ToString
public class NFTResDto {
    private long nft_id;
    private String nft_address;
    private String img_address;
    private long user_id;
    private String jav_code;

    @Builder
    public NFTResDto(long nft_id, String nft_address, String img_address, long user_id, String jav_code) {
        this.nft_id = nft_id;
        this.nft_address = nft_address;
        this.img_address = img_address;
        this.user_id = user_id;
        this.jav_code = jav_code;
    }
}

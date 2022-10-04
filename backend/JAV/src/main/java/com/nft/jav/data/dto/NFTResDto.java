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
    private int total_page;
    private long count;
    private boolean isSale;
    private String nft_address;
    private String token_id;
    private String img_address;
    private long user_id;
    private String jav_code;

    @Builder
    public NFTResDto(long nft_id, int total_page, boolean isSale, long count, String nft_address, String token_id, String img_address, long user_id, String jav_code) {
        this.nft_id = nft_id;
        this.total_page = total_page;
        this.count = count;
        this.isSale = isSale;
        this.nft_address = nft_address;
        this.img_address = img_address;
        this.token_id = token_id;
        this.user_id = user_id;
        this.jav_code = jav_code;
    }
}

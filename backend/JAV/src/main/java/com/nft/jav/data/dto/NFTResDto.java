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

    @Builder
    public NFTResDto(long nft_id, String nft_address) {
        this.nft_id = nft_id;
        this.nft_address = nft_address;
    }
}

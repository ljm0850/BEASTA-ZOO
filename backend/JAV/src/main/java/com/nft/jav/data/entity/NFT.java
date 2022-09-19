package com.nft.jav.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class NFT extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long nft_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String nft_address;

    @Column
    private String img_address;

    @Column
    private String jav_code;

    @Builder
    public NFT(long nft_id, User user, String nft_address, String img_address, String jav_code) {
        this.nft_id = nft_id;
        this.user = user;
        this.nft_address = nft_address;
        this.img_address = img_address;
        this.jav_code = jav_code;
    }
}

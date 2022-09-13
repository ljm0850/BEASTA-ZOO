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

    @Builder
    public NFT(long nft_id, User user, String nft_address) {
        this.nft_id = nft_id;
        this.user = user;
        this.nft_address = nft_address;
    }
}

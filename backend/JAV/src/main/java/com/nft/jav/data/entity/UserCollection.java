package com.nft.jav.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class UserCollection extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_collection_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nft_id")
    private NFT nft_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "jav_id")
    private ServiceCollection jav;
}

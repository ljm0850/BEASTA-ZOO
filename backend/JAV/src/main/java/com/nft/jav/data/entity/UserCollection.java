package com.nft.jav.data.entity;

import lombok.Builder;
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

    @Column
    private String nft_address;

    @Column
    private String img_address;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "jav_id")
    private ServiceCollection jav;

    @Builder
    public UserCollection(long user_collection_id, String nft_address, String img_address, User user, ServiceCollection jav) {
        this.user_collection_id = user_collection_id;
        this.nft_address = nft_address;
        this.img_address = img_address;
        this.user = user;
        this.jav = jav;
    }
}

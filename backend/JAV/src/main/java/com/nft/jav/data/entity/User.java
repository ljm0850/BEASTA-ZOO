package com.nft.jav.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    @Column
    private String wallet_addres;

    @Column
    private String nickname;

    @Column
    private String profile_img_path;

    @Column
    private String banner_img_path;

    @Column(length = 1000)
    private String profile_description;

    @Column
    private long first_discover_count;

    @Column
    private double tier;

    @Column
    private double token;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Sales> sales_list;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Liked> like_list;

    @Builder
    public User(long user_id, String wallet_addres, String nickname, String profile_img_path, String banner_img_path, String profile_description, long first_discover_count, double tier, double token) {
        this.user_id = user_id;
        this.wallet_addres = wallet_addres;
        this.nickname = nickname;
        this.profile_img_path = profile_img_path;
        this.banner_img_path = banner_img_path;
        this.profile_description = profile_description;
        this.first_discover_count = first_discover_count;
        this.tier = tier;
        this.token = token;
    }
}

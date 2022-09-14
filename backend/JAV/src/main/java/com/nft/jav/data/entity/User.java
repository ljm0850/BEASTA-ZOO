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
    private String wallet_address;

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
    private List<Community> community_list;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Sales> sales_list;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Liked> like_list;

    @Builder
    public User(long user_id, String wallet_address, String nickname, String profile_img_path, String banner_img_path, String profile_description, long first_discover_count, double tier, double token) {
        this.user_id = user_id;
        this.wallet_address = wallet_address;
        this.nickname = nickname;
        this.profile_img_path = profile_img_path;
        this.banner_img_path = banner_img_path;
        this.profile_description = profile_description;
        this.first_discover_count = first_discover_count;
        this.tier = tier;
        this.token = token;
    }

    public void updateWalletAddress(String wallet_address) {
        this.wallet_address = wallet_address;
    }
    public void updateNickname(String Nickname) {
        this.nickname = nickname;
    }
    public void updateProfileImgPath(String profile_img_path) {
        this.profile_img_path = profile_img_path;
    }

    public void updateBannerImgPath(String banner_img_path) {
        this.banner_img_path = banner_img_path;
    }

    public void updateProfileDescription(String profile_description) {
        this.profile_description = profile_description;
    }

    public void updateFirstDiscoverCount(long first_discover_count) {
        this.first_discover_count = first_discover_count;
    }
    public void updateTier(double tier) {
        this.tier = tier;
    }

    public void updateToken(double token) {
        this.token = token;
    }
}

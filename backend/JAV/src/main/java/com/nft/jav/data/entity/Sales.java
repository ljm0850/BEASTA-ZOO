package com.nft.jav.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long sale_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private int state;

    @Column
    private double price;

    @Column
    private String contract_address;

    @Column
    private String seller_wallet;

    @Column
    private String buyer_wallet;

    @Column
    private LocalDateTime sale_start_date;

    @Column
    private LocalDateTime sale_completed_date;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<Liked> like_list;

    @Builder
    public Sales(long sale_id, User user, int state, double price, String contract_address, String seller_wallet, String buyer_wallet, LocalDateTime sale_start_date, LocalDateTime sale_completed_date) {
        this.sale_id = sale_id;
        this.user = user;
        this.state = state;
        this.price = price;
        this.contract_address = contract_address;
        this.seller_wallet = seller_wallet;
        this.buyer_wallet = buyer_wallet;
        this.sale_start_date = sale_start_date;
        this.sale_completed_date = sale_completed_date;
    }
}

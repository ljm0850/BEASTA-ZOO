package com.nft.jav.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Community extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long community_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String title;

    @Column(length = 1000)
    private String content;

    @Column
    private int hit;

    @Column
    private int type;

    @Builder
    public Community(long community_id, User user, String title, String content, int hit, int type) {
        this.community_id = community_id;
        this.user = user;
        this.title = title;
        this.content = content;
        this.hit = hit;
        this.type = type;
    }
}

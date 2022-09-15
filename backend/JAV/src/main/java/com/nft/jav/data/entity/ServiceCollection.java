package com.nft.jav.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.nft.jav.data.entity.User;
import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class ServiceCollection extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long jav_id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String jav_code;

    @Column
    private int level;

    @Column
    private String jav_img_path;

    @Column
    private int discover_user_count;

    @Builder
    public ServiceCollection(long jav_id, User user, String jav_code, int level, String jav_img_path, int discover_user_count) {
        this.jav_id = jav_id;
        this.user = user;
        this.jav_code = jav_code;
        this.level = level;
        this.jav_img_path = jav_img_path;
        this.discover_user_count = discover_user_count;
    }
}

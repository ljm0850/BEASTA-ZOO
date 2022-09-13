package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class serviceCollectionResDto {

    private long jav_id;
    private long user_id;
    private String jav_code;
    private int level;
    private String jav_img_path;

    private LocalDateTime discover_time;
    private int discover_user_count;

    @Builder
    public serviceCollectionResDto(long jav_id, long user_id, String jav_code, int level, String jav_img_path, LocalDateTime discover_time, int discover_user_count) {
        this.jav_id = jav_id;
        this.user_id = user_id;
        this.jav_code = jav_code;
        this.level = level;
        this.jav_img_path = jav_img_path;
        this.discover_time = discover_time;
        this.discover_user_count = discover_user_count;
    }
}

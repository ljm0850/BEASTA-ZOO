package com.nft.jav.service;

import com.nft.jav.data.dto.LikedResDto;

import java.util.List;

public interface LikedService {
    List<LikedResDto> getUserLikedList(long user_id);
}

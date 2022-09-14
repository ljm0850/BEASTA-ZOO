package com.nft.jav.service;

import com.nft.jav.data.dto.LikedResDto;
import com.nft.jav.data.entity.Liked;
import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.LikedRepository;
import com.nft.jav.data.repository.SalesRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LikedServiceImpl implements LikedService{

    private final UserRepository userRepository;
    private final LikedRepository likedRepository;
    private final SalesRepository salesRepository;
    @Override
    public List<LikedResDto> getUserLikedList(long user_id) {
        User targetUser = userRepository.findById(user_id)
                .orElseThrow(IllegalArgumentException::new);

        System.out.println("here!! " + targetUser.getUser_id());

        List<Liked> userLikedList = likedRepository.findAllByUser(targetUser);
        List<LikedResDto> userLikedResDtoList = new ArrayList<>();

        for(int i=0;i<userLikedList.size();i++) {
            Liked targetLiked = userLikedList.get(i);

            userLikedResDtoList.add(LikedResDto.builder()
                    .like_id(targetLiked.getLike_id())
                    .sale_id(targetLiked.getSale().getSale_id())
                    .build());
        }
        return userLikedResDtoList;
    }

    @Override
    public LikedResDto addLiked(long user_id, long sale_id) {
        User targetUser = userRepository.findById(user_id)
                .orElseThrow(IllegalArgumentException::new);

        Sales targetSale = salesRepository.findById(sale_id)
                .orElseThrow(IllegalArgumentException::new);

        Liked newLiked = Liked.builder()
                    .user(targetUser)
                    .sale(targetSale)
                    .build();

        Liked savedLiked = likedRepository.save(newLiked);

        LikedResDto likedResDto = LikedResDto.builder()
                .like_id(savedLiked.getLike_id())
                .sale_id(savedLiked.getSale().getSale_id())
                .user_id(savedLiked.getUser().getUser_id())
                .build();

        return likedResDto;
    }
}

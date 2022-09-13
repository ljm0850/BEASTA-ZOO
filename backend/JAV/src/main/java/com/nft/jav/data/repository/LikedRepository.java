package com.nft.jav.data.repository;

import com.nft.jav.data.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedRepository extends JpaRepository<Liked, Long> {
}

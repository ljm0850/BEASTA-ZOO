package com.nft.jav.data.repository;


import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NFTRepository extends JpaRepository<NFT, Long> {

    @Query("select N from NFT N where N.user=:user")
    List<NFT> findAllByUserId(@Param("user") User user);
}

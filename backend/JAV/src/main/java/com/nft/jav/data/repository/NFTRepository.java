package com.nft.jav.data.repository;


import com.nft.jav.data.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NFTRepository extends JpaRepository<NFT, Long> {
}

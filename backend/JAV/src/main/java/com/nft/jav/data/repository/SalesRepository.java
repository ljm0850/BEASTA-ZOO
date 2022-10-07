package com.nft.jav.data.repository;

import com.nft.jav.data.entity.NFT;
import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long>, JpaSpecificationExecutor<Sales> {

    @Query("select S from Sales S where S.user=:user")
    List<Sales> findAllByUserId(@Param("user") User user);

    @Query("select S.nft from Sales S where S.user=:user and S.nft.isDeleted = false and S.state=0")
    List<NFT> findNFTByUser(@Param("user") User user);

    @Query("select S from Sales S where S.buyer_wallet=:user_wallet_address and S.state=1")
    List<Sales> findAllByUser_Wallet_address(@Param("user_wallet_address") String user_wallet_address);

    @Query(value = "select S from Sales S where S.state=0")
    Page<Sales> findAllDoSale(Pageable pageable);

    @Query(value = "select S from Sales S")
    Page<Sales> findAllSale(Pageable pageable);

    @Query("select S from Sales S where S.nft.jav_code like CONCAT(:jav_code,'%') and S.state=1")
    List<Sales> findAllByJavCodeComplete(@Param("jav_code") String jav_code);

    @Query("select S from Sales S where S.nft.jav_code like CONCAT(:jav_code,'%') and S.state=0")
    List<Sales> findAllByJavCode(@Param("jav_code") String jav_code);

    List<Sales> findAll(Specification<Sales> spec);

    @Query("select S from Sales S where S.contract_address=:contract_address")
    Sales findByContractAddress(@Param("contract_address") String contract_address);

    @Query(value = "select S from Sales S where S.user =:user and S.nft =:nft")
    List<Sales> findByWalletAndJav(@Param("user") User user, @Param("nft") NFT nft);
}

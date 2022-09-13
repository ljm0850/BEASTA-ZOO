package com.nft.jav.data.repository;

import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {

    @Query("select S from Sales S where S.user=:user")
    List<Sales> findAllByUserId(@Param("user") User user);

    @Query("select S from Sales S where S.user=:user and S.buyer_wallet=:wallet_address")
    List<Sales> findAllByUserAndBuyerWallet(@Param("user") User user, @Param("wallet_address") String wallet_address);
}

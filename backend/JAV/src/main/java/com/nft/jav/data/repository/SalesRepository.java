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

    @Query("select S from Sales S where S.buyer_wallet=:user_wallet_address and S.state=1")
    List<Sales> findAllByUser_Wallet_address(@Param("user_wallet_address") String user_wallet_address);
}

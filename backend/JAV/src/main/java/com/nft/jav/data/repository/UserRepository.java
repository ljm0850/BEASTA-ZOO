package com.nft.jav.data.repository;

import com.nft.jav.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.wallet_address=:wallet_address")
    User findByWalletAddress(@Param("wallet_address") String wallet_address);

    @Query("select u.nickname from User u where u.wallet_address=:wallet_address")
    String findNicknameByWalletAddress(@Param("wallet_address") String wallet_address);

}

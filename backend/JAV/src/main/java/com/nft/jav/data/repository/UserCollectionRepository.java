package com.nft.jav.data.repository;


import com.nft.jav.data.dto.RankRes;
import com.nft.jav.data.entity.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {

    @Query(value = "select " +
            "new com.nft.jav.data.dto.RankRes(U.user, count(U.user)) " +
            "from UserCollection U " +
            "group by U.user order by 2 desc")
    List<RankRes> countByUser();

    @Query(value = "select count(U.user) from UserCollection U where U.user.wallet_address =:wallet_address")
    Long countByWallet(@Param("wallet_address") String wallet_address);
}

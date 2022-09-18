package com.nft.jav.data.repository;


import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceCollectionRepository extends JpaRepository<ServiceCollection, Long> {
    @Query("select S from ServiceCollection S where S.jav_code=:jav_code")
    ServiceCollection findByJav_code(@Param("jav_code") String jav_code);
}

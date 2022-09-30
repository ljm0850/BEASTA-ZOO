package com.nft.jav.data.repository;


import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceCollectionRepository extends JpaRepository<ServiceCollection, Long> {
    @Query("select S from ServiceCollection S where S.jav_code like  CONCAT(:jav_code,'%')")
    ServiceCollection findByJav_code(@Param("jav_code") String jav_code);

    @Query("select S from ServiceCollection S order by S.create_date")
    Page<ServiceCollection> findDiscoverJav(PageRequest pageRequest);

    @Query("select S from ServiceCollection S order by S.create_date desc")
    Page<ServiceCollection> findLatest(PageRequest pageRequest);

    @Query("select case when count(S.jav_code)> 0 THEN true ELSE false END from ServiceCollection S where S.jav_code =:jav_code")
    boolean existsByJav_code(@Param("jav_code") String jav_code);
}

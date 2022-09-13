package com.nft.jav.data.repository;


import com.nft.jav.data.entity.ServiceCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceCollectionRepository extends JpaRepository<ServiceCollection, Long> {
}

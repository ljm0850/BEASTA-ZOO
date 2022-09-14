package com.nft.jav.data.repository;

import com.nft.jav.data.entity.Comment;
import com.nft.jav.data.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select S from Comment S where S.community=:community")
    List<Comment> findAllByCommunity(@Param("community") Community community);

}

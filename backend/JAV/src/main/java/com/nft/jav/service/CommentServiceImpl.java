package com.nft.jav.service;

import com.nft.jav.data.dto.CommentModiReqDto;
import com.nft.jav.data.dto.CommentReqDto;
import com.nft.jav.data.dto.CommentResDto;
import com.nft.jav.data.entity.Comment;
import com.nft.jav.data.entity.Community;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.CommentRepository;
import com.nft.jav.data.repository.CommunityRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final Logger logger = LoggerFactory.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepository;
    private final CommunityRepository communityRepository;

    private final UserRepository userRepository;

    @Override
    public List<CommentResDto> commentList(long community_id) {
        logger.info("commentList service - 호출");

        Community community = communityRepository.findById(community_id)
                .orElseThrow(IllegalArgumentException::new);

        List<Comment> findAll = commentRepository.findAllByCommunity(community);

        List<CommentResDto> ResDto = new ArrayList<>();

        for(int i=0; i<findAll.size(); i++){
            Comment comment = findAll.get(i);

            CommentResDto commentResDto = CommentResDto.builder()
                    .comment_id(comment.getComment_id())
                    .content(comment.getContent())
                    .user_id(comment.getUser().getUser_id())
                    .user_nickname(comment.getUser().getNickname())
                    .createdTime(comment.getCreate_date())
                    .build();

            ResDto.add(commentResDto);
        }

        return ResDto;
    }

    @Override
    public boolean saveComment(CommentReqDto commentReqDto) {
        logger.info("saveComment service - 호출");
        User targetUser = userRepository.findById(commentReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        Community targetCommunity = communityRepository.findById(commentReqDto.getCommunity_id())
                .orElseThrow(IllegalArgumentException::new);

        Comment savedComment = commentRepository.save(Comment.builder()
                .content(commentReqDto.getContent())
                .community(targetCommunity)
                .user(targetUser)
                .build());

        if(savedComment != null)
            return true;
        return false;
    }

    @Override
    public boolean updateComment(CommentModiReqDto commentModiReqDto) {
        logger.info("updateComment service - 호출");
        Comment target = commentRepository.findById(commentModiReqDto.getComment_id())
                .orElseThrow(IllegalArgumentException::new);

        target.updateContent(commentModiReqDto.getContent());

        return target.getContent().equals(commentModiReqDto.getContent());
    }

    @Override
    public boolean deleteComment(long comment_id) {
        logger.info("deleteComment service - 호출");
        Comment target = commentRepository.findById(comment_id)
                .orElseThrow(IllegalArgumentException::new);

        commentRepository.delete(target);

        return !commentRepository.existsById(comment_id);
    }
}

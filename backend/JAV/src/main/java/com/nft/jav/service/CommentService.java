package com.nft.jav.service;

import com.nft.jav.data.dto.CommentModiReqDto;
import com.nft.jav.data.dto.CommentReqDto;
import com.nft.jav.data.dto.CommentResDto;

import java.util.List;

public interface CommentService {
    List<CommentResDto> commentList(long community_id);

    boolean saveComment(CommentReqDto commentReqDto);

    boolean updateComment(CommentModiReqDto commentModiReqDto);

    boolean deleteComment(long comment_id);
}

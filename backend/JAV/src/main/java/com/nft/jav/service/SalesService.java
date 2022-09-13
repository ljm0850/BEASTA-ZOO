package com.nft.jav.service;

import com.nft.jav.data.dto.SalesResDto;

import java.util.List;

public interface SalesService {
    List<SalesResDto> getUserSalesList(long user_id);

    List<SalesResDto> getUserPurchaseList(long user_id);
}

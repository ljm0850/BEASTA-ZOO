package com.nft.jav.service;

import com.nft.jav.data.dto.*;

import java.util.List;

public interface SalesService {
    List<SalesResDto> getUserSalesList(String wallet_address);

    List<SalesResDto> getUserPurchaseList(String wallet_address);

    PurchaseResDto purchaseNFT(PurchaseReqDto purchaseReqDto);

    SalesResDto saleNFT(SalesReqDto salesReqDto);
}

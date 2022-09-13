package com.nft.jav.service;

import com.nft.jav.data.dto.SalesResDto;
import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.User;
import com.nft.jav.data.repository.SalesRepository;
import com.nft.jav.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SalesServiceImpl implements SalesService {
    private final UserRepository userRepository;
    private final SalesRepository salesRepository;

    @Override
    public List<SalesResDto> getUserSalesList(long user_id) {
        User targetUser = userRepository.findById(user_id)
                .orElseThrow(IllegalArgumentException::new);

        List<Sales> userSalesList = salesRepository.findAllByUserId(targetUser);
        List<SalesResDto> userSalesResDtoList = new ArrayList<>();

        for(int i=0;i<userSalesList.size();i++) {
            Sales targetSale = userSalesList.get(i);

            userSalesResDtoList.add(SalesResDto.builder()
                    .sale_id(targetSale.getSale_id())
                    .price(targetSale.getPrice())
                    .state(targetSale.getState())
                    .sale_completed_date(targetSale.getSale_completed_date())
                    .sale_start_date(targetSale.getSale_start_date())
                    .buyer_wallet(targetSale.getBuyer_wallet())
                    .contract_address(targetSale.getContract_address())
                    .seller_wallet(targetSale.getSeller_wallet())
                    .build());
        }

        return userSalesResDtoList;
    }

    @Override
    public List<SalesResDto> getUserPurchaseList(long user_id) {
        User targetUser = userRepository.findById(user_id)
                .orElseThrow(IllegalArgumentException::new);

        List<Sales> userPurchaseList = salesRepository.findAllByUserAndBuyerWallet(targetUser, targetUser.getWallet_address());
        List<SalesResDto> userSalesResDtoList = new ArrayList<>();

        for(int i=0;i<userPurchaseList.size();i++) {
            Sales targetSale = userPurchaseList.get(i);

            userSalesResDtoList.add(SalesResDto.builder()
                    .sale_id(targetSale.getSale_id())
                    .price(targetSale.getPrice())
                    .state(targetSale.getState())
                    .sale_completed_date(targetSale.getSale_completed_date())
                    .sale_start_date(targetSale.getSale_start_date())
                    .buyer_wallet(targetSale.getBuyer_wallet())
                    .contract_address(targetSale.getContract_address())
                    .seller_wallet(targetSale.getSeller_wallet())
                    .build());
        }

        return userSalesResDtoList;
    }
}

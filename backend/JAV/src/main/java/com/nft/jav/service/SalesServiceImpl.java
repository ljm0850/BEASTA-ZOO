package com.nft.jav.service;

import com.nft.jav.data.dto.*;
import com.nft.jav.data.entity.*;
import com.nft.jav.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final NFTRepository nftRepository;
    private final UserCollectionRepository userCollectionRepository;
    private final ServiceCollectionRepository serviceCollectionRepository;
    private final Logger logger = LoggerFactory.getLogger(SalesServiceImpl.class);

    @Override
    public List<SalesResDto> getSales(int page, int size) {
        logger.info("getSales - 호출");
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Sales> findAll = salesRepository.findAllSale(pageRequest);

        List<SalesResDto> findAllDto = new ArrayList<>();
        for(Sales targetSale : findAll){

            SalesResDto salesResDto = SalesResDto.builder()
                    .total_page(findAll.getTotalPages())
                    .sale_id(targetSale.getSale_id())
                    .price(targetSale.getPrice())
                    .state(targetSale.getState())
                    .sale_completed_date(targetSale.getSale_completed_date())
                    .sale_start_date(targetSale.getSale_start_date())
                    .buyer_wallet(targetSale.getBuyer_wallet())
                    .contract_address(targetSale.getContract_address())
                    .seller_wallet(targetSale.getSeller_wallet())
                    .build();

            findAllDto.add(salesResDto);
        }

        return findAllDto;
    }

    @Override
    public List<SalesResDto> getUserSalesList(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

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
    public List<SalesResDto> getUserPurchaseList(String wallet_address) {
        User targetUser = userRepository.findByWalletAddress(wallet_address);

        List<Sales> userPurchaseList = salesRepository.findAllByUser_Wallet_address(targetUser.getWallet_address());
        System.out.println("구매한 거 : "+userPurchaseList.size());
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

    @Override
    public PurchaseResDto purchaseNFT(PurchaseReqDto purchaseReqDto) {
        NFT targetNFT = nftRepository.findById(purchaseReqDto.getNft_id())
                .orElseThrow(IllegalArgumentException::new);

        User targetUser = userRepository.findById(purchaseReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);

        ServiceCollection targetServiceCollection = serviceCollectionRepository.findById(purchaseReqDto.getService_collection_id())
                .orElseThrow(IllegalArgumentException::new);

        Sales targetSale = salesRepository.findById(purchaseReqDto.getSale_id())
                .orElseThrow(IllegalArgumentException::new);

        targetSale.updateBuyerWallet(targetUser.getWallet_address());
        targetSale.updateState();

        UserCollection userCollection = UserCollection.builder()
                        .user(targetUser)
                        .nft_address(targetNFT.getNft_address())
                        .jav(targetServiceCollection)
                        .build();

        UserCollection savedUserCollection = userCollectionRepository.save(userCollection);

        PurchaseResDto purchaseResDto = PurchaseResDto.builder()
                .nft_id(targetNFT.getNft_id())
                .nft_address(targetNFT.getNft_address())
                .jav_id(savedUserCollection.getJav().getJav_id())
                .user_collection_id(savedUserCollection.getUser_collection_id())
                .user_id(savedUserCollection.getUser().getUser_id())
                .build();

        return purchaseResDto;
    }

    @Override
    public SalesResDto saleNFT(SalesReqDto salesReqDto) {
        User seller = userRepository.findById(salesReqDto.getUser_id())
                .orElseThrow(IllegalArgumentException::new);
        NFT sellNFT = nftRepository.findById(salesReqDto.getNft_id())
                .orElseThrow(IllegalArgumentException::new);

        Sales sales = Sales.builder()
                .user(seller)
                .contract_address(salesReqDto.getContract_address())
                .sale_start_date(salesReqDto.getSale_start_date())
                .price(salesReqDto.getPrice())
                .seller_wallet(salesReqDto.getSeller_wallet())
                .state(0)
                .nft(sellNFT)
                .sale_completed_date(salesReqDto.getSale_completed_date())
                .build();

        salesRepository.save(sales);

        SalesResDto salesResDto = SalesResDto.builder()
                .nft_id(sales.getNft().getNft_id())
                .buyer_wallet(sales.getBuyer_wallet())
                .contract_address(sales.getContract_address())
                .sale_completed_date(sales.getSale_completed_date())
                .state(sales.getState())
                .sale_start_date(sales.getSale_start_date())
                .price(sales.getPrice())
                .sale_id(sales.getSale_id())
                .seller_wallet(sales.getSeller_wallet())
                .user_id(sales.getUser().getUser_id())
                .build();
        return salesResDto;
    }

    @Override
    public SalesResDto getSale(long sale_id) {

        Sales sales = salesRepository.findById(sale_id)
                .orElseThrow(IllegalArgumentException::new);

        SalesResDto salesResDto = SalesResDto.builder()
                .nft_id(sales.getNft().getNft_id())
                .buyer_wallet(sales.getBuyer_wallet())
                .contract_address(sales.getContract_address())
                .sale_completed_date(sales.getSale_completed_date())
                .state(sales.getState())
                .sale_start_date(sales.getSale_start_date())
                .price(sales.getPrice())
                .sale_id(sales.getSale_id())
                .seller_wallet(sales.getSeller_wallet())
                .user_id(sales.getUser().getUser_id())
                .build();

        return salesResDto;
    }
}

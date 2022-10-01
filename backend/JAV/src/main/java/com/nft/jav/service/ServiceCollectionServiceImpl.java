package com.nft.jav.service;

import com.nft.jav.data.dto.SalesResDto;
import com.nft.jav.data.dto.ServiceCollectionResDto;
import com.nft.jav.data.entity.Sales;
import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.repository.SalesRepository;
import com.nft.jav.data.repository.ServiceCollectionRepository;
import com.nft.jav.data.repository.UserCollectionRepository;
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
public class ServiceCollectionServiceImpl implements ServiceCollectionService{

    private final Logger logger = LoggerFactory.getLogger(ServiceCollectionServiceImpl.class);
    private final ServiceCollectionRepository serviceCollectionRepository;
    private final UserCollectionRepository userCollectionRepository;
    private final SalesRepository salesRepository;

    @Override
    public List<ServiceCollectionResDto> serviceCollectionList(int page, int size, String wallet_address) {
        logger.info("serviceCollectionList - 호출");
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<ServiceCollection> findAll = serviceCollectionRepository.findDiscoverJav(pageRequest);

        List<ServiceCollectionResDto> findAllDto = new ArrayList<>();
        for(ServiceCollection serviceCollection : findAll){
            ServiceCollectionResDto resDto = ServiceCollectionResDto.builder()
                    .total_page(findAll.getTotalPages())
                    .jav_id(serviceCollection.getJav_id())
                    .user_id(serviceCollection.getUser().getUser_id())
                    .nickname(serviceCollection.getUser().getNickname())
                    .jav_code(serviceCollection.getJav_code())
                    .level(serviceCollection.getLevel())
                    .jav_img_path(serviceCollection.getJav_img_path())
                    .discover_time(serviceCollection.getCreate_date())
                    .discover_user_count(serviceCollection.getDiscover_user_count())
                    .build();

            if(wallet_address !=null){
                if(userCollectionRepository.countByWalletAndJav(wallet_address, serviceCollection.getJav_id())>0){
                    resDto.setOwner(true);
                } else resDto.setOwner(false);
            } else resDto.setOwner(false);

            findAllDto.add(resDto);
        }

        return findAllDto;
    }

    @Override
    public List<ServiceCollectionResDto> firstUserCollectionList(int page, int size, String wallet_address) {
        logger.info("firstUserCollectionList - 호출");
        List<ServiceCollection> findAll = serviceCollectionRepository.findAll();

        List<ServiceCollectionResDto> found = new ArrayList<>();
        List<ServiceCollectionResDto> notFound = new ArrayList<>();

        int totalSize = findAll.size();
        int totalPage = totalSize/size+1;

        for(ServiceCollection serviceCollection : findAll){

            ServiceCollectionResDto resDto = ServiceCollectionResDto.builder()
                    .total_page(totalPage)
                    .jav_id(serviceCollection.getJav_id())
                    .user_id(serviceCollection.getUser().getUser_id())
                    .nickname(serviceCollection.getUser().getNickname())
                    .jav_code(serviceCollection.getJav_code())
                    .level(serviceCollection.getLevel())
                    .jav_img_path(serviceCollection.getJav_img_path())
                    .discover_time(serviceCollection.getCreate_date())
                    .discover_user_count(serviceCollection.getDiscover_user_count())
                    .build();

            if(userCollectionRepository.countByWalletAndJav(wallet_address, serviceCollection.getJav_id())>0){
                resDto.setOwner(true);
                found.add(resDto);
            } else {
                resDto.setOwner(false);
                notFound.add(resDto);
            }
        }

        List<ServiceCollectionResDto> joined = new ArrayList<>();
        joined.addAll(found);
        joined.addAll(notFound);

        if(page*size+size>= totalSize) return joined.subList(page*size, totalSize);
        return joined.subList(page*size, page*size+size);
    }

    @Override
    public List<SalesResDto> getSaleByJavCode(String jav_code) {
        List<Sales> salesLit = salesRepository.findAllByJavCode(jav_code);

        List<SalesResDto> userSalesResDtoList = new ArrayList<>();

        for(int i=0;i<salesLit.size();i++) {
            Sales targetSale = salesLit.get(i);

            userSalesResDtoList.add(SalesResDto.builder()
                    .sale_id(targetSale.getSale_id())
                    .price(targetSale.getPrice())
                    .nft_id(targetSale.getNft().getNft_id())
                    .img_address(targetSale.getNft().getImg_address())
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
    public List<ServiceCollectionResDto> latestJav(int size) {
        logger.info("latestJavList - 호출");
        PageRequest pageRequest = PageRequest.of(0, size);
        Page<ServiceCollection> findAll = serviceCollectionRepository.findLatest(pageRequest);

        List<ServiceCollectionResDto> findAllDto = new ArrayList<>();
        for(ServiceCollection serviceCollection : findAll){
            ServiceCollectionResDto resDto = ServiceCollectionResDto.builder()
                    .total_page(findAll.getTotalPages())
                    .jav_id(serviceCollection.getJav_id())
                    .user_id(serviceCollection.getUser().getUser_id())
                    .nickname(serviceCollection.getUser().getNickname())
                    .jav_code(serviceCollection.getJav_code())
                    .level(serviceCollection.getLevel())
                    .jav_img_path(serviceCollection.getJav_img_path())
                    .discover_time(serviceCollection.getCreate_date())
                    .discover_user_count(serviceCollection.getDiscover_user_count())
                    .build();

            findAllDto.add(resDto);
        }

        return findAllDto;
    }

    @Override
    public ServiceCollectionResDto detailJav(long javId) {
        logger.info("detailJav - 호출");
        ServiceCollection serviceCollection = serviceCollectionRepository.findById(javId)
                .orElseThrow(IllegalArgumentException::new);

        ServiceCollectionResDto resDto = ServiceCollectionResDto.builder()
                .jav_id(serviceCollection.getJav_id())
                .user_id(serviceCollection.getUser().getUser_id())
                .nickname(serviceCollection.getUser().getNickname())
                .jav_code(serviceCollection.getJav_code())
                .level(serviceCollection.getLevel())
                .jav_img_path(serviceCollection.getJav_img_path())
                .discover_time(serviceCollection.getCreate_date())
                .discover_user_count(serviceCollection.getDiscover_user_count())
                .build();

        return resDto;
    }

    @Override
    public Long countJav() {
        logger.info("전체 카운트 - 호출");
        return serviceCollectionRepository.count();
    }
}

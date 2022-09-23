package com.nft.jav.service;

import com.nft.jav.data.dto.ServiceCollectionResDto;
import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.repository.ServiceCollectionRepository;
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

    @Override
    public List<ServiceCollectionResDto> serviceCollectionList(int page, int size) {
        logger.info("serviceCollectionList - 호출");
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<ServiceCollection> findAll = serviceCollectionRepository.findAll(pageRequest);

        List<ServiceCollectionResDto> findAllDto = new ArrayList<>();
        for(ServiceCollection serviceCollection : findAll){

//            ServiceCollection serviceCollection = serviceCollectionRepository.findById(scr.getJav_id())
//                    .orElseThrow(IllegalArgumentException::new);

            ServiceCollectionResDto resDto = ServiceCollectionResDto.builder()
                    .total_page(findAll.getTotalPages())
                    .jav_id(serviceCollection.getJav_id())
                    .user_id(serviceCollection.getUser().getUser_id())
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
                .jav_code(serviceCollection.getJav_code())
                .level(serviceCollection.getLevel())
                .jav_img_path(serviceCollection.getJav_img_path())
                .discover_time(serviceCollection.getCreate_date())
                .discover_user_count(serviceCollection.getDiscover_user_count())
                .build();

        return resDto;
    }
}

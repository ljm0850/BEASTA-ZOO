package com.nft.jav.service;

import com.nft.jav.data.dto.serviceCollectionResDto;
import com.nft.jav.data.entity.ServiceCollection;
import com.nft.jav.data.repository.ServiceCollectionRepository;
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
public class ServiceCollectionServiceImpl implements ServiceCollectionService{

    private final Logger logger = LoggerFactory.getLogger(ServiceCollectionServiceImpl.class);
    private final ServiceCollectionRepository serviceCollectionRepository;

    @Override
    public List<serviceCollectionResDto> serviceCollectionList() {
        logger.info("serviceCollectionList - 호출");
        List<ServiceCollection> findAll = serviceCollectionRepository.findAll();

        List<serviceCollectionResDto> findAllDto = new ArrayList<>();
        for(int i=0; i<findAll.size(); i++){
            ServiceCollection serviceCollection = findAll.get(i);
            serviceCollectionResDto resDto = serviceCollectionResDto.builder()
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
    public serviceCollectionResDto detailJav(long javId) {
        logger.info("detailJav - 호출");
        ServiceCollection serviceCollection = serviceCollectionRepository.findById(javId)
                .orElseThrow(IllegalArgumentException::new);

        serviceCollectionResDto resDto = serviceCollectionResDto.builder()
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

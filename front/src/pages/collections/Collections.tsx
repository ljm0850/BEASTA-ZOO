import React, { useEffect, useState } from 'react';
import { Collection } from "../../api/collections";
import SeasonAccordian from './SeasonAccordian';
import Pagination from '@mui/material/Pagination';
import styles from './Collections.module.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import locked from "../../image/collections/locked.png"

const Collections = () => {
  interface Coll {
    discover_time: string;
    discover_user_count: number;
    jav_code: string;
    jav_id: number;
    jav_img_path: string;
    level: number;
    total_page: number;
    user_id: number;
    owner: boolean;
  }

  const [collList, setCollList] = useState<Coll[]>([]);
  const [page, setPage] = useState(1);
  const [sortMethod, setSortMethod] = useState(0)
  const handleChange = (event: React.ChangeEvent<unknown>, value:number) => {
    setPage(value);
  }
  const handleChangeSortMethod = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    var sortType = 0;
    if (newAlignment === '번호') {
      sortType = 0;
    } else {
      sortType = 1;
    }
    setSortMethod(sortType);
  };

  useEffect(() => {
    Collection(page - 1, 24, sortMethod, '0xc8e19b765dca7382f2b334f2cfae1525c0015ab5').then((res :Coll[]) => {
      setCollList(res)
    })
  }, [page, sortMethod])

  return (
    <div className={styles.CollBody}>
      <SeasonAccordian />
      <ToggleButtonGroup
        color="primary"
        value={sortMethod === 0 ? '번호' : '발견'}
        exclusive
        onChange={handleChangeSortMethod}
        aria-label="Platform"
        sx={{ mt: "3%"}}
      >
        <ToggleButton value="번호">번호</ToggleButton>
        <ToggleButton value="발견">발견</ToggleButton>
      </ToggleButtonGroup>
      <div>
        <div className={styles.JAVS}>
          {collList.map((item, idx) => {
            return (
              <div className={styles.collCard}>
                {item.owner ?
                <img key={item.discover_time} className={styles.JAVImg} src={item.jav_img_path} alt="" /> :
                <div className={styles.lockCard}><img key={item.discover_time} className={styles.JAVImgFalse} src={item.jav_img_path} alt="" />
                <img className={styles.lockImg} src={locked} alt="" /></div>
                }
                <p className={styles.javId}>{item.jav_id}</p>
              </div>
            )
          })}
        </div>
      </div>
      {collList.length !== 0 &&
      <Pagination
      sx={{ display:"flex", justifyContent:"center" }}
      count={collList[0].total_page}
      page={page}
      color="primary"
      onChange={handleChange}
      />}
    </div>
  )
}

export default Collections;
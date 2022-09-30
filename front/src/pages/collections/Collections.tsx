import React, { useEffect, useState } from 'react';
import { Collection, totalCount, myCollCount } from "../../api/collections";
import SeasonAccordian from './SeasonAccordian';
import CollJavModal from './CollJavModal';
import Pagination from '@mui/material/Pagination';
import styles from './Collections.module.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import locked from "../../image/collections/locked.png"

export interface Coll {
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

export interface Wallet {
  countNFT: number;
  grade: number;
  rank: number;
}

const Collections = () => {

  const [collList, setCollList] = useState<Coll[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [sortMethod, setSortMethod] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState<Coll>();
  const [myWall, setMyWall] = useState<Wallet>();
  const [walletAddress, setWalletAddress] = useState("");

  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setWalletAddress(accounts[0]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    if (sessionStorage.getItem("isLogined") === "true") {
      getAccount()

    }

    if (walletAddress) {
      myCollCount(walletAddress).then((res :Wallet) => {
        setMyWall(res)
      })
    }

    Collection(page - 1, 24, sortMethod, walletAddress).then((res :Coll[]) => {
      setCollList(res)
    })

    totalCount().then((res) => {
      setTotal(res)
    })
  }, [page, sortMethod, walletAddress])


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div className={styles.CollBody}>
      <SeasonAccordian />
      <div className={styles.toggleCounterDiv}>
        <ToggleButtonGroup
          color="primary"
          value={sortMethod === 0 ? '번호' : '발견'}
          exclusive
          onChange={handleChangeSortMethod}
          aria-label="Platform"
        >
          <ToggleButton value="번호">번호</ToggleButton>
          <ToggleButton value="발견">발견</ToggleButton>
        </ToggleButtonGroup>
        {myWall && <p className={styles.collCounter}>{myWall.grade}/{total}</p>}
      </div>
      <div>
        <div className={styles.JAVS}>
          {collList.map((item, idx) => {
            return (
              <div key={item.discover_time} className={styles.collCard} onClick={() => {
                handleOpen()
                setModalData(item)
              }}>
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
      <CollJavModal open={open} onClose={handleClose} name={"123"} data={modalData}></CollJavModal>
    </div>
  )
}

export default Collections;
import { useState, useEffect, useRef, useCallback } from "react";
import { getMyNFTs } from "../../api/connect";
import JavModal from "../../layouts/modal/JavModal";
import SaleModal from "../../layouts/modal/SaleModal";

import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";


import styles from "./MyJavs.module.scss";

interface Props {
  account: string | undefined;
}

export interface NFT {
  count: number;
  nft_id: number;
  nft_address: string;
  img_address: string;
  user_id: number;
  jav_code: string | number | null;
  total_page: number;
}

interface NFTs extends Array<NFT> {}

const MyJavs = (props: Props) => {
  const account = props.account;

  const [sortOption, setSortOption] = useState("0");
  const sortHandleChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  useEffect(() => {
    // MyNFTs()
    setList([]);
    setPage(0);
    endRef.current = false;
  }, [sortOption]);

  // infinity scroll
  const obsRef = useRef(null); //observer Element
  const [list, setList] = useState<NFTs>([]); //Post List
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(0); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getPost();
  }, [page]);


  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getPost = useCallback(async () => {
    //글 불러오기
    setLoad(true); //로딩 시작
    getMyNFTs(account, page, 6, Number(sortOption))
      .then((res) => {
        console.log(res)
        setItemCount(res[0].count)
        setList((prev) => [...prev, ...res]); //리스트 추가
        preventRef.current = true;
        setLoad(false);
        if (page === res[0].total_page) {
          endRef.current = true;
          setLoad(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoad(false)
        endRef.current = true;
      });
  }, [page]);


  // JAV info modal 
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const [ modalData, setModalData ] = useState<NFT>();

  // JAV sale modal
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const saleModalOpenHandler = () => { setSaleModalOpen(true)};
  const saleModalClose = () => setSaleModalOpen(false);
  const [saleJavImg, setSaleJavImg] = useState("");
  const [saleJavData, setSaleJavData] = useState(''); 


  return (
    <div>
        <div className={styles.sort}>
          <div className={styles.sortContainer}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortOption}
            // label="Newest"
            onChange={sortHandleChange}
            sx= {{height: "48px", width: "170px", border: "2px solid #E5E8EB",
            backgroundColor: "#fff",
            color: "black", opacity: "1", fontWeight: "700",
            "&& fieldset" : { 
              border: "0px",
            },
            "&:hover": {
              filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.25))",
              transition: "all 0.5s"
            },
            "&:not(:hover)": {
              transition: "all 0.5s",
            }
            
          }}
          >
            <MenuItem sx={{color: "black", opacity: "1", fontWeight: "700"}} value={0}>최신 순</MenuItem>
            <MenuItem sx={{color: "black", opacity: "1", fontWeight: "700"}} value={1}>오래된 순</MenuItem>
            <MenuItem sx={{color: "black", opacity: "1", fontWeight: "700"}} value={2}>티어 순</MenuItem>
          </Select>
          <div className={styles.countColor}>소유 NFT {itemCount}</div>
          </div>
        </div>
      {list.length !== 0 ? (
        <div>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 9, md: 12, lg: 12, xl: 12 }}
          >
            {list.map((contact, index) => (
              <Grid item xs={2} sm={3} md={4} lg={3} xl={2} key={index}>
                <div className={styles.javs}>
                  <img src={contact.img_address} onClick={() => {
                    handleOpen()
                    setModalData(contact)
                  }} alt="" />
                  <div className={styles.sale} onClick={() => {
                    saleModalOpenHandler()
                    setSaleJavImg(contact.img_address)
                    setSaleJavData(contact.nft_address)
                  }}>판매하기</div>
                </div>

              </Grid>
            ))}
          </Grid>
          {load ? <div className={styles.loading}><CircularProgress /></div> : <></>}
        </div>
      ) : (
        <div>no item</div>
      )}
      <div ref={obsRef}></div>
      {/* modal */}
      <JavModal open={open} onClose={handleClose} name={"123"} data={modalData}></JavModal>
      <SaleModal open={saleModalOpen} onClose={saleModalClose} jav={saleJavData} imgAddr={saleJavImg}/>
    </div>
  );
};

export default MyJavs;

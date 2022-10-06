import { useState, useEffect, useRef, useCallback } from "react";
import { getMyNFTs } from "../../api/connect";
import JavModal from "../../layouts/modal/JavModal";
import SaleModal from "../../layouts/modal/SaleModal";
import { Link as RouterLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";

import styles from "./MyJavs.module.scss";
import { Link } from "@mui/material";
import { getWalletAddress } from "../../common/ABI";

interface Props {
  account: string | undefined;
}

export interface NFT {
  nft_id?: number;
  nft_address: string;
  img_address: string;
  user_id?: number;
  jav_code: string | number | null;
  tier?: number;
  token_id?: number;
  sale?: boolean;
  sale_id?: number | null;
}

interface NFTs extends Array<NFT> {}

const MyJavs = ({ account }: Props) => {
  const [sortOption, setSortOption] = useState("0");
  const [myWalletAddress, SetMyWalletAddress] = useState("");
  // infinity scroll
  const obsRef = useRef(null); //observer Element
  const [list, setList] = useState<NFTs>([]); //Post List
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(0); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인
  const mounted = useRef(false);
  const size = 36;

  // JAV info modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState<NFT>();

  // JAV sale modal
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const saleModalOpenHandler = () => {
    setSaleModalOpen(true);
  };
  const saleModalClose = () => setSaleModalOpen(false);
  const [saleJavImg, setSaleJavImg] = useState("");
  const [saleNftId, setSaleNftId] = useState<number>(0);
  const [saleTokenId, setSaleTokenId] = useState<number>(0);
  const [saleJavCode, setSaleJavCode] = useState<string | number | null>();

  // 정렬 변경
  const sortHandleChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
    setList([]);
    setPage(0);
  };

  // 정렬이 바뀌면 첫페이지로
  useEffect(() => {
    // 마운트 될 땐 실행되지 않도록 설정
    // if (mounted.current) {
    // MyNFTs()
    getMyNFTs(account, page, size, Number(sortOption))
      .then((res) => {
        setItemCount(res[0].count);
        setList((prev) => [...prev, ...res]); //리스트 추가
        preventRef.current = true;
        if (page === res[0].total_page - 1) {
          endRef.current = true;
        }
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        endRef.current = true;
      });
    endRef.current = false;
    getWalletAddress().then((res) => {
      SetMyWalletAddress(res);
    });
  }, [sortOption, page, account]);

  // 옵저버가 바뀔 때마다 실행되니 콜백함수로 선언 반복을 줄인다.
  const obsHandler = useCallback((entries: any) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false;
      if (mounted.current) {
        //옵저버 콜백함수
        setPage((prev) => prev + 1); //페이지 값 증가
      } else {
        mounted.current = true;
      }
    }
  }, []);

  // 옵저버 등록(스크롤 내릴 때마다 바뀐다.)
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [obsHandler]);

  return (
    <div style={{ minHeight: "50vh" }}>
      <div className={styles.sort}>
        <div className={styles.sortContainer}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortOption}
            // label="Newest"
            onChange={sortHandleChange}
            sx={{
              height: "48px",
              width: "170px",
              border: "2px solid #E5E8EB",
              backgroundColor: "#fff",
              color: "black",
              opacity: "1",
              fontWeight: "700",
              "&& fieldset": {
                border: "0px",
              },
              "&:hover": {
                filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.25))",
                transition: "all 0.5s",
              },
              "&:not(:hover)": {
                transition: "all 0.5s",
              },
            }}
          >
            <MenuItem
              sx={{ color: "black", opacity: "1", fontWeight: "700" }}
              value={0}
            >
              최신 순
            </MenuItem>
            <MenuItem
              sx={{ color: "black", opacity: "1", fontWeight: "700" }}
              value={1}
            >
              오래된 순
            </MenuItem>
            <MenuItem
              sx={{ color: "black", opacity: "1", fontWeight: "700" }}
              value={2}
            >
              티어 순
            </MenuItem>
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
                  <img
                    src={contact.img_address}
                    onClick={() => {
                      handleOpen();
                      setModalData(contact);
                    }}
                    alt=""
                  />
                  {!contact.sale ? (
                    <div
                      className={account === myWalletAddress ? styles.sale : ""}
                      onClick={() => {
                        saleModalOpenHandler();
                        setSaleJavImg(contact.img_address);
                        setSaleNftId(contact.nft_id!);
                        setSaleTokenId(contact.token_id!);
                        setSaleJavCode(contact.jav_code!);
                      }}
                    >
                      판매하기
                    </div>
                  ) : (
                    <Link
                      to={`/market/buy/${contact.sale_id}`}
                      color="inherit"
                      underline="none"
                      component={RouterLink}
                    >
                      <div
                        className={styles.sale}
                        style={{ background: "#47B5FF" }}
                      >
                        판매 페이지로
                      </div>
                    </Link>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
          {load ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className={styles.noItem}>가지고 있는 자브종이 없습니다.</div>
      )}
      <div ref={obsRef}></div>
      {/* modal */}
      <JavModal open={open} onClose={handleClose} data={modalData}></JavModal>
      <SaleModal
        open={saleModalOpen}
        onClose={saleModalClose}
        tokenId={saleTokenId}
        nftId={saleNftId}
        imgAddr={saleJavImg}
        jav_code={saleJavCode}
      />
    </div>
  );
};

export default MyJavs;

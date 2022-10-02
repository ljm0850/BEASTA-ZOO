import { useState, useCallback, useEffect, useRef } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import styles from "./ItemCombine.module.scss";
import HOS from "../../image/HOS.svg";
import { getMyNFTs } from "../../api/connect";
import { NFT } from "../profile/MyJavs";
import { Divider } from "@mui/material";
import { fusion, javsData } from "../../api/solidity";
import { ABI } from "../../common/ABI";
import { fusionNFT } from "../../api/market";
import JavModal from "../../layouts/modal/JavModal";

interface NFTs extends Array<NFT> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemCombine = () => {
  /**
    프로젝트 구현    
     * 1. 조합 승인 모달창에 개인키를 입력하면 getAddressFrom() 함수를 이용해 공개키를 반환 받습니다.
     * 2. 공개키가 유효한 경우 Combine Factory 컨트랙트의 Combination() 함수를 호출하여 새로운 Combine 컨트랙트를 생성합니다.
     * 3. 컨트랙트 정상 호출 후 새로운 Combine 컨트랙트의 주소를 반환 받습니다.
     * 4. 생성된 Conbine 컨트랙트가 판매자를 대신하여 NFT 소유권을 소각할 수 있도록 Combine에게 NFT를 전송합니다. (transferFrom())
     * 5. Combine 컨트랙트는 해당 NFT를 소각합니다.
     * 6. 소각과 함께 유전 알고리즘에 의해 새로운 형태의 이미지가 생성됩니다.
     * 7.  해당 NFT를 IPFS에 업로드합니다.
     * 8. 업로드 완료 후 얻은 정보롤 해당 NFT의 메타데이터(Metadata)를 구성하여 IPFS에 업로드합니다.
     * 9. 메타데이터 업로드 완료 후 얻은 정보를 tokenURI로 하여 NFT 생성을 위한 스마트 컨트랙트의 함수를 호출합니다.
     * 10. 정상적으로 트랜잭션이 완결된 후 token Id가 반환됩니다.
     * 11. 백엔드에 token Id와 owner_address를 포함한 정보를 등록 요청합니다.  
    */

  const [myAccount, setMyAccount] = useState("");
  const [myJAVList, setMyJAVList] = useState<NFTs>([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(-1);
  const obsRef = useRef(null); //observer Element
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  // 내 지갑정보 가져오기
  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setMyAccount(accounts[0]);
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (myAccount) {
      getPost();
    }
  }, [myAccount, page]);

  // 내 소유 자브종 가져오기 + 무한 스크롤

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

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
    getMyNFTs(sessionStorage.getItem("account"), page, 10, 0)
      .then((res) => {
        console.log(res)
        setMyJAVList((prev) => [...prev, ...res]); //리스트 추가
        preventRef.current = true;
        setLoad(false);
        if (page === res[0].total_page) {
          endRef.current = true;
          setLoad(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        endRef.current = true;
      });
  }, [page]);


  // 백엔드, solidity에서 요구하는게 달라서 쓰는게 많아졌음.
  const [material1Img, setMaterial1Img] = useState("");
  const [material2Img, setMaterial2Img] = useState("");
  const [material1ID, setMaterial1ID] = useState(0);
  const [material2ID, setMaterial2ID] = useState(0);
  const [material1NFTID, setMaterial1NFTID] = useState(0);
  const [material2NFTID, setMaterial2NFTID] = useState(0);

  ////////////////////////////////////////////////////////////////////////
  // NFT 미선택, 자브종 2종 이상 선택 시 경고창
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  ////////////////////////////////////////////////////////////////////////

  // 뽑기 모달
  const [openItem, setOpenItem] = useState(false);
  const handleOpenItem = () => setOpenItem(true);
  const handleCloseItem = () => setOpenItem(false);

  ///
  const [img, setImg] = useState("");
  const [genes, setGenes] = useState("");

  const Combine = async () => {
    if (!!material1Img === false || !!material2Img == false) {
      setNotice("자브종이 충분히 선택되지 않았습니다.");
      handleClick();
    } else {
      const fusionData = await fusion(material1ID, material2ID);
      const javData = await javsData(fusionData)
      // console.log(javData)
      const NFTData = {
        img_address: javData.URI,
        jav_code: javData.created_at,
        nft_address: ABI.CONTRACT_ADDRESS.NFT_ADDRESS,
        nft_id_1: material1NFTID,
        nft_id_2: material2NFTID,
        tier: 0,
        token_id: fusionData,
        wallet_address: javData.owner,
      }
      console.log(NFTData)
      // 백엔드 통신
      await fusionNFT(NFTData);
      await setImg(NFTData.img_address);
      await setGenes(NFTData.jav_code);
      setOpenItem(true)
    } 
  };

  // 체크박스

  const [checkedImgInputs, setCheckedImgInputs] = useState([""]);
  const [checkedIDInputs, setCheckedIDInputs] = useState<Array<number>>([]);
  const [checkedNFTIDInputs, setCheckedNFTIDInputs] = useState<Array<number>>([]);

  const check = (event: any, id: any, token_id: number, nft_id: number) => {
    console.log(id);

    if (event.currentTarget.checked) {
      setCheckedImgInputs([...checkedImgInputs, id]);
      setCheckedIDInputs([...checkedIDInputs, token_id]);
      setCheckedNFTIDInputs([...checkedNFTIDInputs, nft_id]);
    } else if (!event.currentTarget.checked) {
      setCheckedImgInputs(checkedImgInputs.filter((el) => el !== id));
      setCheckedIDInputs(checkedIDInputs.filter((el) => el !== token_id));
      setCheckedNFTIDInputs(checkedNFTIDInputs.filter((el) => el !== nft_id));
      return;
    }
    if (checkedImgInputs.length > 2) {
      setNotice("조합은 2개의 자브종이 사용됩니다.");
      handleClick();
      setCheckedImgInputs(checkedImgInputs.filter((el) => el !== id));
      setCheckedIDInputs(checkedIDInputs.filter((el) => el !== token_id));
      setCheckedNFTIDInputs(checkedNFTIDInputs.filter((el) => el !== nft_id));
      event.target.checked = false;
    }
  };

  useEffect(() => {
    setMaterial1Img(checkedImgInputs[1]);
    setMaterial2Img(checkedImgInputs[2]);
    setMaterial1ID(checkedIDInputs[0]);
    setMaterial2ID(checkedIDInputs[1]);
    setMaterial1NFTID(checkedNFTIDInputs[0]);
    setMaterial2NFTID(checkedNFTIDInputs[1]);
  }, [checkedImgInputs, checkedIDInputs, checkedNFTIDInputs]);

  return (
    <div>
      <div>{material1NFTID}</div>
      <div>{material2NFTID}</div>

      <div className={styles.mainContainer}>
        <div className={styles.space}>
          <div>
            <div className={styles.combineLogo}>
              <img src={HOS} alt="" className={styles.hos} />
              <div>조합</div>
            </div>

            <div className={styles.material}>
              <div className={styles.container}>
                {material1Img ? (
                  <img style={{objectFit: "cover"}} src={material1Img} alt="" />
                ) : (
                  <div className={styles.container}>
                    <div className={styles.centerPosition}>
                      <div>자브종이</div>
                      <div>선택되지 않았습니다.</div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.container}>
                {material2Img ? (
                  <img style={{objectFit: "cover"}} src={material2Img} alt="" />
                ) : (
                  <div className={styles.container}>
                    <div className={styles.centerPosition}>
                      <div>자브종이</div>
                      <div>선택되지 않았습니다.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.mdSubmitBtn}>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={Combine}
              >
                조합하기
              </Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {notice}
              </Alert>
            </Snackbar>
          </div>
        </div>
        <div className={styles.space}>
          <div>
            <div className={styles.javsHeader}>나의 자브종</div>
            <div className={styles.javList}>
              {myJAVList.map((contact, index) => (
                <label className={styles.javLabel} key={index} htmlFor={contact.img_address}>
                  <img src={contact.img_address} alt="" />
                  <input
                    onChange={(e) => {
                      check(e, contact.img_address, Number(contact.token_id), Number(contact.nft_id));
                    }}
                    className={styles.jav}
                    id={contact.img_address}
                    type="checkbox"
                  />
                  <div></div>
                </label>
              ))}
              <div ref={obsRef} style={{ height: "10px" }}></div>
              {myJAVList.length === 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "430px", height: "750px", fontWeight: "700", color: "#DCDCDC"}}><div>소유한 자브종이 없습니다.</div></div> }
            </div>
          </div>
        </div>
        <div className={styles.xsSubmitBtn}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={Combine}
          >
            조합하기
          </Button>
        </div>
      </div>
      <div className={styles.cautionContainer}>
        <Divider />
        <div className={styles.caution}>
          <div>주의 사항!</div>
          <ul>
            <li>
              자브종은 BEASTAZOO에서 뽑기, 조합을 통해 얻을 수 있는 모든
              캐릭터를 의미합니다.
            </li>
            <li>조합에 사용되는 2개의 자브종은 조합 이후 소멸합니다.</li>
            <li>
              중간에 홈페이지를 끄꺼나 이탈할 경우 자브종은 인벤토리로 들어가지
              않으며, 이때 소모된 JAV, 자브종은 환불되지 않습니다.{" "}
            </li>
            <li>조합의 결과는 BEASTAZOO의 유전 알고리즘으로 이루어집니다.</li>
            <li>
              BEASTAZOO는 시즌제로 운영됩니다. 현재 시즌은 OOZ Project이며 이번
              시즌이 지나면 해당 자브종은 얻을 수 없습니다.
            </li>
          </ul>
        </div>
      </div>
      <JavModal
        open={openItem}
        onClose={handleCloseItem}
        name="이잼민"
        data={{
          nft_id: 123,
          nft_address:
            "https://mblogthumb-phinf.pstatic.net/MjAyMTA1MTNfMjkz/MDAxNjIwOTEwNDQ3MjQ1.RjpPwu8qenTvn6uEdct9lXaDu6a-eaubruR2i06SjtUg.5izLqsFxNagkeTGMbhf6sGBbNE4adeUKdELQ-H4vozMg.PNG.ysg3355/image.png?type=w800",
          img_address: img,
          user_id: 123,
          jav_code: 1231,
          token_id: "123123",
        }}
      />
    </div>
  );
};

export default ItemCombine;

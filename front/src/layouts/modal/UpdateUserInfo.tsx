import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getUserInfo, updateUserInfo, UserInfo } from "../../api/connect";

import styles from "./UpdateUserInfo.module.scss";
import { useNavigate } from "react-router-dom";

// modal style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

interface Props {
  openModal: boolean;
  modalHandleClose: () => void;
  drawerClose: () => void;
  customValue?: UserInfo;
  customFuntion?: Dispatch<SetStateAction<UserInfo>>;
}

const UpdateUserInfo = (props: Props) => {
  const navigate = useNavigate();
  const {
    openModal,
    modalHandleClose,
    drawerClose,
    customFuntion,
    customValue,
  } = props;

  const [myNickname, setMyNickname] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [userData, setUserData] = useState<UserInfo>();

  useEffect(() => {
    getUserInfo(sessionStorage.getItem("account")).then((res) => {
      setUserData(res);
      setMyNickname(res.nickname);
      setMyDescription(res.profile_description);
    });
  }, [openModal]);

  const updatesubmit = async () => {
    sessionStorage.setItem("profileDescription", myDescription);
    sessionStorage.setItem("nickname", myNickname);
    const option: UserInfo = {
      ...userData!,
      nickname: myNickname,
      profile_description: myDescription,
    };
    await updateUserInfo(sessionStorage.getItem("account")!, option);
    drawerClose();
    customFuntion!({
      ...customValue!,
      nickname: myNickname,
      profile_description: myDescription,
    });
    modalHandleClose();
    navigate(`/user/${sessionStorage.getItem("account")}`);
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={modalHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Box sx={style}>
          <div>
            <div className={styles.title}>회원정보 수정</div>
            <div className={styles.nickname}>
              <label className={styles.updateLabel} htmlFor="nickname">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                value={myNickname}
                spellCheck={false}
                onChange={(e) => {
                  setMyNickname(e.target.value);
                }}
              />
            </div>
            <div className={styles.description}>
              <label className={styles.updateLabel} htmlFor="description">
                자기소개
              </label>
              <textarea
                id="description"
                onChange={(e) => {
                  setMyDescription(e.target.value);
                }}
                defaultValue={myDescription}
              ></textarea>
            </div>
            <div className={styles.updateBtn}>
              <button onClick={updatesubmit}>저장하기</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateUserInfo;

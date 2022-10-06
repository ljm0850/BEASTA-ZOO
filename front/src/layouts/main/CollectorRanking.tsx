import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import { userRank } from "../../api/collections";
import styles from "./CollectorRanking.module.scss";
import { Link as RouterLink } from "react-router-dom";

const Marketplace = () => {
  interface Ranking {
    user_id: number;
    nickname: string;
    grade: number;
    countNFT: number;
    wallet_address: number;
  }

  const [rankList, setRankList] = useState<Ranking[]>([]);

  useEffect(() => {
    userRank().then((res: Ranking[]) => {
      setRankList(res);
    });
  }, []);

  return (
    <div className={styles.page_leaderboard}>
      <div className={styles.collectionsTitle}>Collector Ranking</div>
      <section className={styles.ranking}>
        <div className={styles.contain}>
          <div className={styles.ranking_table}>
            <div className={styles.ranking_table_header_row}>
              <div className={styles.ranking_table_header_data}>순위</div>

              <div className={styles.ranking_table_header_data}>닉네임</div>
              <div className={styles.ranking_table_header_data}>도감</div>
              <div className={styles.ranking_table_header_data}>소유 JAV</div>
            </div>
            {rankList.slice(0, 3).map((item, index) => {
              return (
                <Link
                  underline="none"
                  to={`/user/${item.wallet_address}`}
                  component={RouterLink}
                  key={item.user_id}
                >
                  <div
                    className={`${
                      styles["ranking_table_row_leader_" + [index + 1]]
                    }`}
                  >
                    <div
                      className={
                        styles["ranking_table_data_leader_" + [index + 1]]
                      }
                    >
                      <div
                        className={`${index === 0 && styles.medal_gold} ${
                          index === 1 && styles.medal_silver
                        } ${index === 2 && styles.medal_bronze}`}
                      ></div>
                    </div>
                    <div className={styles.ranking_table_data}>
                      {item.nickname}
                    </div>
                    <div className={styles.ranking_table_data}>
                      {item.grade}
                    </div>
                    <div className={styles.ranking_table_data}>
                      {item.countNFT}
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className={styles.ranking_table_body}>
              {rankList.slice(3, 10).map((item, index) => {
                return (
                  <Link
                    underline="none"
                    to={`/user/${item.wallet_address}`}
                    component={RouterLink}
                    key={item.user_id}
                  >
                    <div className={styles.ranking_table_row}>
                      <div
                        className={`${styles.ranking_table_data} ${styles.rankingIndex}`}
                      >
                        {index + 4}
                      </div>
                      <div
                        className={`${styles.ranking_table_data} ${styles.ranking}`}
                      >
                        {item.nickname}
                      </div>
                      <div
                        className={`${styles.ranking_table_data} ${styles.ranking}`}
                      >
                        {item.grade}
                      </div>
                      <div
                        className={`${styles.ranking_table_data} ${styles.ranking}`}
                      >
                        {item.countNFT}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;

// <div className={styles.CRBody}>
//   <p className={styles.CRTitle}>Collector Ranking</p>
//   <table>
//     <thead>
//       <tr>
//         <th>순위</th>
//         <th>user_id</th>
//         <th>도감</th>
//         <th>보유 NFT</th>
//       </tr>
//     </thead>
//     <tbody>
//       {rankList.map((item, idx) => {
//         return (
//           <tr key={item.user_id}>
//             <td>{idx + 1}</td>
//             <td>{item.user_id}</td>
//             <td>{item.grade}</td>
//             <td>{item.countNFT}</td>
//           </tr>
//         );
//       })}
//     </tbody>
//   </table>
//   <p className={styles.discription}>* 랭킹은 도감 발견 수에 따름</p>
// </div>

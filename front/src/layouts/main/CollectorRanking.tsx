import { useEffect, useState } from "react";
import { userRank } from "../../api/collections";
import styles from "./CollectorRanking.module.scss";

const Marketplace = () => {
  interface Ranking {
    user_id: number;
    nickname: string;
    grade: number;
    countNFT: number;
  }

  const [rankList, setRankList] = useState<Ranking[]>([]);

  useEffect(() => {
    userRank().then((res: Ranking[]) => {
      setRankList(res);
    });
  }, []);

  return (
    <div className={styles.CRBody}>
      <p className={styles.CRTitle}>Collector Ranking</p>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>user_id</th>
            <th>도감</th>
            <th>보유 NFT</th>
          </tr>
        </thead>
        <tbody>
          {rankList.map((item, idx) => {
            return (
              <tr key={item.user_id}>
                <td>{idx + 1}</td>
                <td>{item.user_id}</td>
                <td>{item.grade}</td>
                <td>{item.countNFT}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className={styles.discription}>* 랭킹은 도감 발견 수에 따름</p>
    </div>
  );
};

export default Marketplace;

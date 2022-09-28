import { useEffect, useState } from "react";
import { userRank } from "../../api/collections";
import "./CollectorRanking.module.scss";

const Marketplace = () => {
  interface Ranking {
    user_id: number;
    nickname: string;
    grade: number;
  }

  const [rankList, setRankList] = useState<Ranking[]>([]);

  useEffect(() => {
    userRank().then((res :Ranking[]) => {
      setRankList(res)
    })
  }, [])

  return (
    <div>
      <h1>Collector Ranking</h1>
      <table>
      <thead>
        <tr>
          <th>rank</th>
          <th>user_id</th>
          <th>grade</th>
        </tr>
      </thead>
      <tbody>
        {rankList.map((item, idx) => {
          return (
            <tr>
              <td>{idx + 1}</td>
              <td>{item.user_id}</td>
              <td>{item.grade}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default Marketplace;
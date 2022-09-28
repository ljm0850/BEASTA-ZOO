import { useEffect, useState } from "react";
import { recentCollection } from "../../api/collections";
import styles from "./RecentlyCollections.module.scss";

const RecentlyCollections = () => {
  interface recentJAV {
    discover_time: string;
    discover_user_count: number;
    jav_code: string;
    jav_id: number;
    jav_img_path: string;
    level: number;
    total_page: number;
    user_id: number;
  }
  const [collectionsUrl, setCollectionsUrl] = useState<recentJAV[]>([]);

  useEffect(() => {
    recentCollection(5).then((res :recentJAV[]) => {
      setCollectionsUrl(res)
    })
  }, [])

  return (
    <div className={styles.RCBody}>
      <p className={styles.RCTitle}>Recently added collections</p>
      <p className={styles.RCDetail}>방금 도감에 추가된 JAV를 구경하세요.</p>
      <div className={styles.RCContainer}>
        {collectionsUrl.map((item, idx) => {
          return <img src={item.jav_img_path} alt="" className={styles.recentColl}/>
        })}
      </div>
    </div>
  );
};

export default RecentlyCollections;
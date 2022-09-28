import { useEffect, useState } from "react";
import { recentCollection } from "../../api/collections";
import dragon from "../../image/mainPage/dragon.png"

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
    <div>
      <h2>Recently added collections</h2>
      <p>방금 도감에 추가된 JAV를 구경하세요.</p>
      <img src={dragon} alt="dragon" />
      <img src={dragon} alt="dragon" />
      <img src={dragon} alt="dragon" />
      <img src={dragon} alt="dragon" />
      <img src={dragon} alt="dragon" />
      {collectionsUrl.map((item, idx) => {
        return (item.jav_img_path)
      })}
    </div>
  );
};

export default RecentlyCollections;
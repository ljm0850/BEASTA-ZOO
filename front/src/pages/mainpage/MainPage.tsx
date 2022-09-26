import RecentlyCollections from "../../layouts/main/RecentlyCollections";
import Marketplace from "../../layouts/main/Marketplace";
import CollectorRanking from "../../layouts/main/CollectorRanking";
import SeasonCarousel from "../../layouts/main/SeasonCarousel";
import FAQ from "../../layouts/main/FAQ";

import banner from "../../image/mainPage/banner.png";
import guide from "../../image/mainPage/guide.png";

const MainPage = () => {
  return (
    <div>
      <p>Welcome, unknown Javjong.</p>
      <img src={banner} alt="banner" />
      <img src={guide} alt="banner" />
      <RecentlyCollections />
      <Marketplace />
      <CollectorRanking />
      <SeasonCarousel />
      <FAQ />
    </div>
  );
};

export default MainPage;

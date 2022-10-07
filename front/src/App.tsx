import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './layouts/Footer';

import styles from "./App.module.scss"

function App() {

  return (
    <div style={{height: "100%"}}>
      <DashboardNavbar/>
      <div className={styles.wrap}><Router /></div>
      <Footer />
    </div>
  );
}
export default App;
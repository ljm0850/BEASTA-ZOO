import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './layouts/Footer';

function App() {

  return (
    <div className="App">
      <DashboardNavbar/>
      <Router />
      {/* <Footer /> */}
    </div>
  );
}
export default App;
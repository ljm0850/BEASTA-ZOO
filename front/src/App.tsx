import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <div className="App">
      <DashboardNavbar/>
      <Router />
    </div>
  );
}
export default App;
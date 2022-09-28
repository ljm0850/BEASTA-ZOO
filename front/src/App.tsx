import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    // <AppProvider>
      <div className="App">
        <DashboardNavbar/>
        <Router />
      </div>
    // </AppProvider>
  );
}
export default App;
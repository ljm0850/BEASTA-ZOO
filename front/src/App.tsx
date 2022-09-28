import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';

function App() {

  return (
    <div className="App">
      <DashboardNavbar/>
      <Router />
    </div>
  );
}
export default App;
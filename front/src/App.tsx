import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';

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
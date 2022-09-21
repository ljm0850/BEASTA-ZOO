import Router from './routes';
import DashboardNavbar from './layouts/main/DashboardNavbar';
import { AppContext, AppProvider } from './utils/Context'
import { useContext, useEffect } from 'react';

function App() {

  return (
    <AppProvider>
      <div className="App">
        <DashboardNavbar/>
        <Router />
      </div>
    </AppProvider>
  );
}
export default App;
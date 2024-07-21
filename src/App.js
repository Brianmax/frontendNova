import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import DashboardUser from './pages/DashboardUser';
import SignUp from './pages/SignUp';
import UpdateProfile from "./pages/UpdateProfile";
import UserList from "./pages/UserList";
function App() {
  return (
      <Router>
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/login' Component={ Login }/>
            <Route path='/dashboard' Component={ DashboardUser }/>
            <Route path='/signup' Component={ SignUp }/>
            <Route path='/updateUser' Component={ UpdateProfile }/>
            <Route path='/users' Component={ UserList }/>
            <Route path='/' Component={ Login }/>
        </Routes>
      </Router>
  );
}

export default App;

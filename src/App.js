import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';


function App() {
  return (
    <div> 
    <Routes>
      <Route path="/" element={<HomePage />} exact></Route>
      <Route path="/dashboard" element={<Dashboard />} exact></Route>
      <Route path="/profile" element={<Profile />} exact></Route>
      </Routes>

    </div>
  );
}

export default App;

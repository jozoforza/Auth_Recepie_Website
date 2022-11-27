import './App.css';

import MainScreen from './main_screen/MainScreen';
import ProfileScreen from './profile_screen/ProfileScreen';
import LogIn from './log_in/LogIn'

import {BrowserRouter as Router, Route,Routes,useNavigate,Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route exact path='/' element={<MainScreen/>}/>
            <Route exact path='/profile' element={<ProfileScreen/>}/>
            <Route exact path='/logIn' element={<LogIn/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

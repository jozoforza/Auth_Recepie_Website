import './App.css';
import { useEffect } from 'react'

import MainScreen from './main_screen/MainScreen';
import ProfileScreen from './profile_screen/ProfileScreen';
import LogIn from './log_in/LogIn'
import TopBar from './top_bar/TopBar';
import axios from 'axios'

import {BrowserRouter as Router, Route,Routes,useNavigate,Link} from 'react-router-dom';
import SignUp from './log_in/SignUp';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from './redux/slicerReducers'




function App() {
  const ax = axios.create({
    withCredentials: true
});
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  /* async function getUserInfo(){
    try{
      const response = await ax.get('http://localhost:4000/getProfileInfo')
      dispatch(fetchUser(response.data))
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
    
  }
  //useEffect(()=>{getUserInfo()},[]) */

  return (
    <div className="App">
      
      <Router>
      <TopBar/>
        <Routes>
            <Route exact path='/' element={<MainScreen/>}/>
            <Route exact path='/profile' element={<ProfileScreen/>}/>
            <Route exact path='/logIn' element={<LogIn/>}/>
            <Route exact path='/signUp' element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

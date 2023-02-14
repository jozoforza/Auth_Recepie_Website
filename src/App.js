import './App.css';
import { useEffect } from 'react'

import MainScreen from './screens/main_screen/MainScreen';
import ProfileScreen from './screens/profile_screen/ProfileScreen';
import LogIn from './screens/auth_screens/LogIn'
import TopBar from './screens/top_bar/TopBar';
import Recipe from './screens/main_screen/Recipe';
import Create from './screens/create_screen/Create';

import axios from 'axios'

import {BrowserRouter as Router, Route,Routes,useNavigate,Link} from 'react-router-dom';
import SignUp from './screens/auth_screens/SignUp';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from './redux/slicerReducers'




function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  async function getUserInfo(){
    try{
      const response = await axios.get('http://localhost:4000/getProfileInfo')
      if(response.data.email){
      dispatch(fetchUser(response.data))
    }
    }catch(err){
      console.log(err)
    }
    
  }
  useEffect(()=>{getUserInfo()
  },[]) 

  return (
    <div className="App">
      
      <Router>
      <TopBar/>
        <Routes>
            <Route exact path='/' element={<MainScreen/>}/>
            <Route exact path='/profile' element={<ProfileScreen/>}/>
            <Route exact path='/create' element={<Create/>}/>
            <Route exact path='/logIn' element={<LogIn/>}/>
            <Route exact path='/signUp' element={<SignUp/>}/>
            <Route exact path='/recipe/:id' element={<Recipe/>}></Route>
            <Route exact path='*' element={<MainScreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

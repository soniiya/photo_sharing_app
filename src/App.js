import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Createpost from './components/Posts/Createpost';
import {Routes,Route} from 'react-router-dom';
import Feed from './components/Posts/Feed';
import Auth from './components/Auth/Auth';
import Pindetail from './components/Pindetail';
import { useSelector,useDispatch } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch();

  //console.log(localStorage);


  useEffect(() => {      //so that user don't get logged out on refreshing the page
    const userProfile = localStorage.getItem('Profile');
    if(userProfile){
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: JSON.parse(userProfile)
      })
    }
  },[dispatch])

  return (
    <div>
      {!isAuthenticated ? (
        <Routes>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      ) : (
        <div className='app_wrapper'>
        <Sidebar />
        
        <div className='app_content'>
        <Navbar />
        <Routes>
        <Route path='/createpost' element={<Createpost />} />
        <Route path='/' element={<Feed />} />
        <Route path='/category/:categoryName' element={<Feed />} />
        <Route path='/pin-detail/:postid' element={<Pindetail pin={posts} />} />
        </Routes>  
        </div>
        </div>
      )}
        
    </div>
  );
}

export default App;

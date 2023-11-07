import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import './Navbar.css';
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar(){
const dispatch = useDispatch(); 
const navigate = useNavigate();
  
const User = useSelector((state) => state.currUser)
const isAuthenticated = useSelector((state) => state.isAuthenticated)

const handleLogout =()=>{
  if(isAuthenticated){
    dispatch({type: 'LOGOUT'})
    navigate('/auth')
  }
}

    return (
      <div className="navbar">
        <div className="navbar_search">
          <SearchIcon fontSize='large' sx={{marginLeft: '0.5rem'}} />

          <input
            type="text"
            onChange={(e)=>e.target.value}
            placeholder="Search"
            value="value"
            className="navbar_input"
          />
        </div>


        <div className='navbar_others'>
          {/* <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user-pic" style={{width: '3rem', height:'3rem',borderRadius:'0.5rem'}} />
          </Link> */}
        {User === null ? (
          <Link to="/auth" className="login_btn">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
            backgroundColor="#009dff"
            width="30px"
            height="30px"
            borderRadius="100%"
            color="white"
          >
            <Link
              to={`/User/${User?.userid}`}
              style={{color: "white", textDecoration: "none" }}
            >
              {User?.username?.charAt(0).toUpperCase()}
            </Link>
          </Avatar>

            <button className="logout_btn" onClick={handleLogout}>
              Log out
            </button> 
          </>
        )}
        
      {isAuthenticated && (  
      <Link to='/createpost' className='navbar_addbtn'>     
        <button><AddIcon fontSize='large' /></button>
      </Link>
      )}
      </div>

    </div>
    )
}

export default Navbar
import React,{useState} from 'react'
// import {Routes, Route} from 'react-router-dom';
// import Home from './Home';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


function Auth() {
  const [isSignup,setIssignup] = useState(false);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if (!email && !password) {
      alert('Enter email and password');
      return;
    }

    let authData = {
      email,
      password,
    };

    if (isSignup) {
      if (!name) {
        alert('Enter your name');
        return;
      }
      authData = {
        ...authData,
        name,
      };
    }

    try {
        if (isSignup) {
          // Signup logic
          const response = await Axios.post('http://localhost:3001/user/signup', authData);
          dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
        } else {
          // Login logic
          const response = await Axios.post('http://localhost:3001/user/login', authData);
          dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
        }

        navigate('/');
      } catch (error) {
        console.log(error);
    }
  }

  const handleSwitch = ()=>{
    setIssignup(!isSignup);
  }

  return (
    <div>
      <section className='auth-section'>
        <div className='auth-container-2'>
          { !isSignup && <img className='login-logo' />}

          <form onSubmit={handleSubmit}>
          {
            isSignup && (
              <label htmlFor='name'>
              <h4>Display Name</h4>
              <input type='text' id='name' name='name' 
              onChange={(e) => {
                setName(e.target.value)
              }} />
            </label>
            )
          }

            <label htmlFor='email'>
              <h4>Email</h4>
              <input type='email' name='email' id='email'
               onChange={(e) => {
                setEmail(e.target.value)
              }} />
            </label>

            <label htmlFor='password'>
              <div style={{display:'flex', justifyContent:'space-between'}}>
              <h4>Password</h4>
              { !isSignup && <p style={{fontSize:'13px', color: '#007ac6'}}>Forgot Password?</p>} 
              {/* only show while login  */}
              </div>
              
              <input type='password' name='password' id='password'
               onChange={(e) => {
                setPassword(e.target.value)
              }} />
            </label>


          <button type='submit' className='auth-btn'>{isSignup ? "Sign-up" : "Login"}</button>
          </form>

          <p>
            {isSignup ? "already have an account?" : "Don't have an account?"}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Login" : "Sign up"}</button>
          </p>

        </div>
      </section>
    </div>
  )
}

export default Auth
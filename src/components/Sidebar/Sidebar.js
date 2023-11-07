import React, { useState } from 'react'
import {NavLink,Link, useParams} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {categories} from '../Categories';
import { useSelector,useDispatch } from 'react-redux';
import './Sidebar.css';

const isNotActiveStyle='flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitialize'
const isActiveStyle='flex items-center px-5 gap-3 font-extrabold border-r-2 transition-all duration-200 ease-in-out capitialize'

function Sidebar() {
  const posts = useSelector((state) => state.posts);
  const [selectedCategory,setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) =>{
    setSelectedCategory(categoryName)
  }

  // const handlecloseSidebar=()=>{
  //   if(closeToggle) closeToggle(false);
  // } 

  return (
    <>
      <div className='sidebar_section'>
      <div className='sidebar'>
      <h1 className='sidebar_logo'>Sharepix</h1>  
      <div style={{display: 'flex',flexDirection: 'column', gap: '1.25rem'}}>
              <NavLink to='/' 
              className='sidebar_home'>
                <RiHomeFill />
                Home
              </NavLink> 

              <h3 style={{fontSize:'1rem',lineHeight:'1.5rem',padding:'0 1.25rem'}}>Discover Categories</h3>

         {categories.slice(0, categories.length-1).map((category) => (
            <NavLink to={`/category/${category.name}`}
                // className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
                //onClick={handlecloseSidebar}
                key={category.name}
                style={{paddingLeft: '1.25rem'}}
                >
                <img src={category.image} style={{width:'2rem',height:'2rem',borderRadius: '100%'}} />
                {category.name}
            </NavLink>
              )
          )}
    </div>
    </div>
      </div>  
    </>
  )
}

export default Sidebar
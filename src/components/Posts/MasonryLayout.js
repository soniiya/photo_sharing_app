import React from 'react';
import Masonry from 'react-masonry-css';
import './Masonry.css'
import Post from './Post';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,  //3000px <= mein 6 col
  2000: 5,  
  1200: 3,
  1000: 2,
  500: 1,  //500px <= x <=1000px mein 1col
};

function MasonryLayout({posts}) {
  //console.log(posts)
  return (
    <Masonry className='masonry_layout' breakpointCols={breakpointColumnsObj}>
    {posts?.map((post) => <Post key={post.postid} pin={post} style={{maxWidth:'100%'}} />)}
  </Masonry>
  )
}

export default MasonryLayout
import React, { useEffect, useState } from 'react'
import {Container,Grid,Card, CardMedia, CardContent,CardActions,Button,Link,Typography } from '@mui/material';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from './style.js';
import MasonryLayout from './MasonryLayout.js';

function Feed(){
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)

  const {categoryName} = useParams();

  useEffect(() => {
    if (!categoryName) { //if no category choosen
      // Fetch all stored posts when no specific category is selected
      Axios.get('http://localhost:3001/posts')
        .then((response) => {
          //console.log('Fetched all data:', response.data);
          dispatch({ type: 'SET_POSTS', payload: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
      }
      else {
      // Fetch data for the specific category
      Axios.get('http://localhost:3001/posts')
        .then((response) => {
          const filteredPosts = response.data.filter((post) => post.postcategory === categoryName);
          //console.log('Fetched data for specific category:', filteredPosts); // Log the fetched data
          dispatch({ type: 'SET_POSTS', payload: filteredPosts });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoryName]);
  
  //console.log('Redux State in Feed.js:', posts);

  return(
  <>
  {posts && <MasonryLayout posts={posts} />}
  </>
  )

  //   <Container sx={{display:'flex',animation: 'slide-fwd .45s cubic-bezier(.25,.46,.45,.94) both;'}} maxWidth="md"> 
    
  //   <Grid container spacing={4}>
  //     {posts.map((post,id)=>{
  //       return (
  //       <>
  //       <Grid key={id} item xs={12} sm={6} md={4}>
  //       <Card key={post.postid} className={classes.cardGrid}
  //         // onClick={()=>
  //         // handleCardClick(id)  
  //       >
  //         <CardMedia className={classes.cardMedia} component='img' image={post.postimg} sx={{ height:'226px' }} 
  //             onError={(e) => console.error('Image load error:', e)}
  //         />
  //             <CardContent className={classes.cardcontent}>
  //               <Typography variant='h5'>
  //                   {post.posttitle}
  //                 </Typography>
  //                 <Typography sx={{fontFamily: 'var(--font-alt)'}}>
  //                   {post.postabout}
  //                 </Typography>
  //               </CardContent>

  //               <CardActions>
  //               <Link to={`/view/${post.postid}`}>
  //                 <Button
  //                 size='small'
  //                sx={{ textAlign: 'center' }}
  //               color='primary'
  //                 >
  //                 View
  //              </Button>
  //              <Button
  //               type="button"
  //               className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
  //               onClick={() => {handleDeletepost(post.postid)}}
  //               >
  //               <MdDelete />
  //              </Button>
  //             </Link>
  //               </CardActions>

  //               </Card>
  //            </Grid>
  //          </>
  //      )})}

  // </Grid>
  // </Container>
  //)
}

export default Feed
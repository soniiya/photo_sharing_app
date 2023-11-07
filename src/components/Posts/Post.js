import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import {MdDownloadForOffline} from 'react-icons/md';
import {AiTwotoneDelete} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import './Post.css'

function Post({pin}) {
  const dispatch=useDispatch();

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
 
  const { postedBy, postimg, postid, postdestination } = pin;
  //const user=fetchUser();
  
  const navigate = useNavigate();
 
  const handleDeletepost = (postid) =>{
    //console.log(postid);

    Axios.delete(`http://localhost:3001/posts/delete/${postid}`)
    .then((response)=>{
      //console.log(response)
      if(response.status===200){
        dispatch({type: 'DELETE_POST', payload: postid})
      }else{
        console.error('Failed:',response.data)
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }


  return (
    <div style={{margin: '0.5rem'}}>
    <div className="post"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick ={()=> navigate(`/pin-detail/${postid}`)}
    >
    <img src={postimg} alt='post-image' />
    {
        postHovered && (
            <div className='post_download'
            style={{ height: '100%' }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{display:'flex', gap: '1.5rem'}}>
                <a
                href={postimg} 
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                <MdDownloadForOffline />
                </a>
                </div>
                
                {/* {alreadySaved?.length !== 0 ? (
                    <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                       {pin?.save?.length} saved
                    </button>
                ): (
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                  </button>
                )
                } */}
            </div>

            <div className="post_dest_delete">
            {postdestination?.slice(8).length > 0 ? (
            <a
              href={postdestination}
              target="_blank"
              className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
              rel="noreferrer"
            >
              {' '}
              <BsFillArrowUpRightCircleFill />
              {postdestination?.slice(8, 17)}...
            </a>
          ) : undefined}

      {/* {
       postedBy?._id === user?.googleId && ( */}
       <button
         type="button"
         onClick={(e) => {
           e.stopPropagation();
           handleDeletepost(postid);
         }}
         className="postdelete_icon"
       >
         <AiTwotoneDelete />
       </button>
       {/* )
    } */}

            </div>
        </div>    
        )
    }
</div>

{/* <Link to={`/user-profile/${postedBy?._id}`} className="post_username">
    <img
      className="w-8 h-8 rounded-full object-cover"
      src={postedBy?.image}
      alt="user-profile"
    />
    <p className="font-semibold capitalize">{postedBy?.userName}</p>
  </Link> */}
  
</div>
  )
}

export default Post
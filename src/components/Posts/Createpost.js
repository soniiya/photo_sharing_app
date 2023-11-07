import React,{useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import Axios from 'axios';
import {categories} from '../Categories';
import './Createpost.css'
import { useDispatch } from 'react-redux';


function Createpost() {
    const dispatch = useDispatch();

    const [selectedImage,setSelectedImage]=useState(null)
    const [title,setTitle] = useState('');
    const [about,setAbout] = useState('');
    const [destination,setDestination] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState();
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);

    const [postSaved,setPostSaved]=useState(false);
      
    const user=null;

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    
    const isFormValid = () => {
      return title.trim() !== '' && about.trim() !== '' && destination.trim() !== '' && categories !== 'other';
    };

    
  const handleImageUpload = (e) =>{
    const file=e.target.files[0];
    setSelectedImage(file);
  }
  const handleAddPix =()=>{
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
    if(selectedImage){
    const imageReference = URL.createObjectURL(selectedImage);
    setImageAsset(imageReference);
    }
  }

  const handleSavebtn= async() => {
    if (isFormValid()) {
      setLoading(true);
      
    // if (!imageAsset) {
    //   // Handle the case where no image is selected
    //   console.error('No image asset');
    //   setLoading(false);
    //   return;
    // }

    if (!selectedImage) { // Check if an image is selected
      console.error('No image selected');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('posttitle',title);
    formData.append('postabout',about);
    formData.append('postdestination',destination);
    formData.append('postcategory',selectedCategory);
    formData.append('postimg', selectedImage);
    
    console.log(selectedCategory)
      // Send the post data to the server
      try{
        const response = await Axios.post('http://localhost:3001/posts/create', formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          })
        
          console.log('success');
          setLoading(false);
          setPostSaved(true);
          dispatch({type: 'ADD_POST', payload: response.data})

          const fetchData = async () => {
            const response = await Axios.get('http://localhost:3001/posts');    
            return response.data;
          };
          // After successfully adding a new post, it fetches the updated list of posts from the server. 
          // This ensures that the newly added post is immediately visible to the user without requiring a page refresh.
         
        fetchData().then((updatedData)=>{
          console.log(updatedData);
          navigate('/');
        })  

      }
      catch(error) {
          console.error('Error adding post:', error);
          setLoading(false);
        };
    } else {
      setFields(true);
    }
  }

      
  return (
  <>
    <div className="createpost">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
      )}
      <div className="upload_container">
        <div className="upload_leftcontainer">
          <div className="upload_cloud">
          {/* {loading && (
            <Spinner />
          )} */}
          {/* {wrongImageType && <p>Wrong image type</p>} */}

            {/* {!imageAsset ? ( */}
              <label>
                <div className='upload_lable'>
                  <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p style={{marginTop:'8rem', opacity: '1',color: 'rgb(156 163 175 / var(--tw-text-opacity))'}}>
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p>
                    <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                      onClick={handleAddPix}
                    />
                  </div>
                  </div>
                </label>
                {/* ) :
                 (
              <div className="relative h-full">
              <img
                src={imageAsset?.url}
                alt="uploaded-pic"
                className="h-full w-full"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                onClick={() => setImageAsset(null)}
              >
                <MdDelete />
              </button>
            </div>
            )
          } */}
          </div>
        </div>

        <div className="upload_content">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="upload_title"
          />
            {user && (
            <div className="upload_user">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="upload_about"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="upload_about"
          />

          <div style={{display:'flex',flexDirection:"column"}}>
              <div>
                <p style={{fontWeight: '600', marginBottom: '0.5rem'}}>Choose Pin category</p>
              <select
               onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              className="upload_category"
              value={selectedCategory}
              >
              <option value='other' className='sm:text-bg bg-white'>select category</option>
              {categories.map((category,id) =>(
                  <option 
                  key={id}
                  className="text-base border-0 outline-none capitalize bg-white text-black " 
                  value={category.name}>
                    {category.name}  
                </option>
              )
              )}
              </select>
              </div>

              <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginTop:'1.25rem'}}>
              <button
                type="button"
                onClick={handleSavebtn}
                className="save_btn"
              >
                Save Pin
              </button>
              </div>

          </div>
        </div>
      </div>
    </div>


  </>
  )
}

export default Createpost
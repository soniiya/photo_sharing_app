import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({

  heading: {
    fontFamily: 'var(--font-base)',
    color:'black',
     textAlign: 'center',
     marginBottom: '1rem',
     textDecoration: '2px underline linear-gradient(to right, #ff00cc, #3333ff)'
  }, 

  card:{
    width:'100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    // transition: 'transform 11s ease',
    // backgroundColor: '#f0f0f0',
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    // filter: 'blur(0)',
    //   transform: 'scale(1)', // Add the initial scale transformation

    '&:hover': {
      transform: 'scale(1.025)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },

    '&.active': {
      width: '250px',
      height: '250px',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      filter: 'blur(4px)',
    },
  },

  cardMedia:{
    //paddingTop: '45.25%', //16:9
    maxHeight:'50%'
  },

  cardcontent:{
    flexGrow: 1,
    marginTop:'20px',
  },

  container:{
    display: 'flex',
    flexDirection: 'row',
  
  },
  
  content: {
    width: '100%',
    maxWidth: '1140px',
    margin: '1rem 1rem',  
  },
 
}));

export {useStyles}

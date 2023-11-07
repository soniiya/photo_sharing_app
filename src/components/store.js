import {createStore} from 'redux';

const initialState = {
    posts: [],
    users: [],
    currUser: null,
    isAuthenticated: false,
}

const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'ADD_USER':
            return{
                ...state,
                users: [...state.users, action.payload]
            }
        case 'GET_USER':
            return{
                ...state,
                users: action.payload
            }
        case 'AUTH_SUCCESS':
        //console.log(action.payload)
        localStorage.setItem('Profile', JSON.stringify(action.payload));    
        return { 
            ...state,
            currUser: action.payload,
            isAuthenticated: true,
        }

        case 'AUTH_FAILURE':
        //console.log(action.payload)
        localStorage.removeItem('Profile');
        return {
            ...state,
            currUser: null,
            isAuthenticated: false,
        }

        case 'LOGOUT':
        //console.log(action.payload)    
        localStorage.removeItem('Profile');
        return {
            ...state, 
            currUser: null,
            isAuthenticated: false
        } 
    
            

        case 'ADD_POST':
            return{
                ...state,
                posts: [...state.posts, action.payload]
            }
        case 'SET_POSTS':
            return{
                ...state,
                posts: action.payload,
            }
        case 'DELETE_POST':
            console.log(action.payload)
            const postIdToDelete = action.payload;
            const newPosts = state.posts.filter((post)=>post.postid !== postIdToDelete);
            return {
                ...state,
                posts: newPosts
            }  

        default:
            return state;
    }
};

const store = createStore(rootReducer)

export default store;
import * as  actionTypes from '../actions/types'
import {combineReducers} from 'redux'

const initialUserState  = {
    currentUser: null,
    isLoading: true,
    userPosts:null
}

const user_reducer = (state = initialUserState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return{
                ...state,
                isLoading: false
            }
            default:
                return state
    }
}

const initialChannelState  = {
    currentChannel: null,
    isPrivateChannel: false,
}

const channel_reducer = (state = initialChannelState, action) =>{
    switch(action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
               ...state,
               currentChannel: action.payload.currentChannel
            }
        case actionTypes.SET_PRIVATE_CHANNEL: 
            return{
            ...state,
            isPrivateChannel: action.payload.isPrivateChannel,
        }          
        case actionTypes.SET_USER_POSTS: 
            return{
            ...state,
            userPosts: action.payload.userPosts,
        }          
        default:
            return state
    }
}

const initialColorsState = {
    primaryColor:'linear-gradient(rgba(63,71,111,1) 27%, rgba(252,70,107,1) 100%)',
    secondaryColor:'#eee'
}

const colors_reducer = (state = initialColorsState, action) =>{
    switch(action.type) {
        case actionTypes.SET_COLORS:
            return {
                primaryColor: action.payload.primaryColor,
                secondaryColor:action.payload.secondaryColor
            }        
        default:
            return state
    }
}

export const roootReducer =  combineReducers({
    user: user_reducer,
    channel:channel_reducer,
    colors:colors_reducer
})


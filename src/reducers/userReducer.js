import {USERINFO} from './actionType'

// initial state
const initialState = {
    user: false,
    admin: false
};

// action reducer
function UserReducer(state = initialState, action) {
    switch(action.type) {
        case USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            }

    default:
       return state;
    }
}

export default UserReducer 
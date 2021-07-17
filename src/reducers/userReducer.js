import {USERINFO, INSTITUTE} from './actionType'

// initial state
const initialState = {
    
};

// action reducer
function UserReducer(state = initialState, action) {
    switch(action.type) {
        case USERINFO:
            console.log("USERINFO.Redux ", action.userInfo)

            return {
                ...state,
                userInfo: action.userInfo
            }

        case INSTITUTE:

            console.log('INSTITUTE.Redux ', action.institute)
            return {
                ...state,
                institute: action.institute
            }

    default:
       return state;
    }
}

export default UserReducer 
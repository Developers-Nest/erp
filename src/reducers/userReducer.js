import {USERINFO, INSTITUTE, SETNOTICATIONS, NOTREADNOTIFICATIONS, SETPRIVILEDGES} from './actionType'

// initial state
const initialState = {
    count: 0,
    priviledges: {}
};

// action reducer
function UserReducer(state = initialState, action) {
    switch(action.type) {
        case USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            }

        case INSTITUTE:
            return {
                ...state,
                institute: action.institute
            }

        case SETNOTICATIONS:
            console.log('Notifications.Redux ', action.notificatons)
            return {
                ... state,
                notificatons: action.notificatons
            }
        case NOTREADNOTIFICATIONS:
            console.log('Not Read Notification count ', action.count)
            return {
                ... state,
                count: action.count
            }
        
        case SETPRIVILEDGES:
            return {
                ... state,
                priviledges: action.priviledges
            }

    default:
       return state;
    }
}

export default UserReducer 
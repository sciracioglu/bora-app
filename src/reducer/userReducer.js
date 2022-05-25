const UserReducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE": {
            console.log('user list reducer')
            return {
                ...state,
                users: action.payload
            }
        }
        case "UPDATE_USER": {
            console.log('user update reducer')
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user )
            }
        }
        case "ADD_USER":{
            return {
                ...state,
                users:[...state.users,action.payload]
            }
        }
        case "DELETE_USER":{
            return {
                ...state,
                users:state.users.filter(user=>user.id != action.payload)
            }
        }
        default:
            return state
    }
}

export default UserReducer
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
        default:
            return state
    }
}

export default UserReducer
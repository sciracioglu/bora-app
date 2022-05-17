const UserReducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE": {
            console.log('user list reducer')
            return {
                ...state,
                users: action.payload
            }
        }
        default:
            return state
    }
}

export default UserReducer
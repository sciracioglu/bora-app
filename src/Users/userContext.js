import React, {useEffect, useState} from "react";
import UserReducer from "../reducer/userReducer";
import {HttpGet2, HttpGlobalGet, UrlEnum} from "../service/coreService";

const UserContext = React.createContext()
const initialState = {
    users:[]
}

// const getUser = async() =>{
//     let response = await HttpGet2('person')
//     if(response.status == 200){
//
//         return response.data
//     } else return []
// }
const getUser = async() =>{
    let response = await HttpGlobalGet(UrlEnum.userUrl,'person')
    if(response.status == 200){

        return response.data
    } else return []
}
const UserProvider =({children}) => {
    const [state,dispatch] = React.useReducer(UserReducer, initialState)
    useEffect(() =>{
        getUser().then(response => {
            console.log(response)
            dispatch({
                type:"INITIALIZE",
                payload:response
            })
        }).catch(error => {
            console.log("Get user error:"+error)
        })
    },[])
    return(
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}
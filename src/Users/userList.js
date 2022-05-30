import React, {useContext, useEffect, useState} from 'react';
import UserForm from "./UserForm";
import User from "./user";
import {UserContext} from "./userContext";
import {Compare, HttpGet} from "../service/coreService";

function UserList(props) {
    const [userId, setUserId] = useState()
    const [state, dispatch] = useContext(UserContext)
    const [allProductList, setAllProductList] = useState()

    useEffect(() => {
        HttpGet(`products`).then(response => {
            if (response.status == 200) {
                console.table(response.data)
                response.data.forEach(prod => {
                    prod.name = prod.name ? prod.name : "No Name"
                    prod.price = prod.price ? prod.price : "50"
                })
                let data = response.data.sort(Compare)
                setAllProductList(data)
            }
        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <div>
            <UserForm  onIdChange={e=>{
                setUserId(e)
            }} id={userId} dispatch={dispatch}/>
            {
                state.users.map(item => (
                    <User
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        surname={item.surname}
                        age={item.age}
                        products={item.products}
                        dispatch={dispatch}
                        allProductList={allProductList}
                        onIdChange={e=>{
                            setUserId(e)
                        }}
                        setAllProductList={e=>setAllProductList(e)}
                    />
                ))

            }
        </div>
    );
}

export default UserList;
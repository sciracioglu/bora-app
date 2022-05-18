import React, {useContext, useEffect, useState} from 'react';
import UserForm from "./UserForm";
import User from "./user";
import {UserContext} from "./userContext";
import {HttpGet} from "../service/coreService";

function UserList(props) {
    const [state, dispatch] = useContext(UserContext)
    const [allProductList, setAllProductList] = useState()
    useEffect(() => {
        HttpGet(`products`).then(response => {
            if (response.status == 200) {
                console.table(response.data)
                setAllProductList(response.data)
            }
        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <div>
            <UserForm/>
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
                    />
                ))

            }
        </div>
    );
}

export default UserList;
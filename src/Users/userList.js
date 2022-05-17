import React, {useContext} from 'react';
import UserForm from "./UserForm";
import User from "./user";
import {UserContext} from "./userContext";

function UserList(props) {
    const [state, dispatch] = useContext(UserContext)
    return (
        <div>
            <UserForm />
            {
                state.users.map(item => (
                    <User
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        surname={item.surname}
                        age={item.age}
                        dispatch={dispatch}
                    />
                ))

            }
        </div>
    );
}

export default UserList;
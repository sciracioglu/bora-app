import React from 'react';

function User(props) {
    const {
        name,
        surname,
        id,
        age,
        dispatch
    } = props

    return (
        <div className="col-mid-8 mb-4">
            <div className="card" style={{backgroundColor:"#62848d",color:"white"}}>
                <div className="card-header d-flex justify-content-between">
                    <h4 className="d-inline">{name}</h4>
                    <h4 className="d-inline">{surname}</h4>
                    <h4 className="d-inline">{age}</h4>
                </div>
            </div>
        </div>
    )
}

export default User;
import React from 'react';

const Product = (props) => {
    const {name, category, price, id, onIdChange} = props
    const editUser = () => {
        onIdChange(id)
    }

    return (
        <div className="col-mid-8 mb-4">
            <div className="card" style={{backgroundColor:"#62848d", color:"white"}}>
                <div className="card-header d-flex justify-content-between">
                    <h4 className="d-line">{name}</h4>
                    <div>
                        <i className="fas fa-edit" style={{cursor:"pointer",padding:"10px"}} onClick={()=> editUser()}></i>
                        <i className="far fa-trash-alt" style={{cursor:"pointer",padding:"10px"}}></i>

                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">Fiyat: {price}</p>
                <p className="card-text">Kategori: {category}</p>
            </div>
        </div>
    );
};

export default Product;
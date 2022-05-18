import React, {useEffect, useRef, useState} from 'react';
import ProductListModal from "../products/productListModal";

function User(props) {
    const {
        name,
        surname,
        id,
        age,
        dispatch,
        products,
        allProductList
    } = props

    const userModel = useRef({
        name: name,
        surname: surname,
        age: age,
        id: id,
        products: products
    })
    const [productList, setProductList] = useState([])

    const [productListModal, setProductListModal] = useState(false)
    let UserProducts = []

    const editUser = () => {

    }

    useEffect(() => {
        UserProducts = []
        products.forEach(item => {
            let product = allProductList.filter(prd => prd.id === item.id)[0]
            if (product != null) {
                UserProducts.push(product)
            }
        })

        setProductList(UserProducts)
    }, [products.length])
    return (

            <div className="col-mid-8 mb-4">
                <div className="card" style={{backgroundColor: "#62848d", color: "white"}}>
                    <div className="card-header d-flex justify-content-between">
                        <h4 className="d-inline">{name}</h4>
                        <h4 className="d-inline">{surname}</h4>
                        <h4 className="d-inline">{age}</h4>
                        <h6 className="d-inline">
                            <i className="fas fa-edit" style={{cursor: "pointer", padding: "10px"}}
                               onClick={() => editUser()}/>
                            <i className="fas fa-list" style={{cursor: "pointer", padding: "10px"}}
                               onClick={() => setProductListModal(true)} />
                        </h6>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Kategori</th>
                                <th>Fiyat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                productList.map(item =>
                                    (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <ProductListModal
                    show={productListModal}
                    dispatch={dispatch}
                    handleCancel={e => {setProductListModal(false)}}
                    allProductList={allProductList}
                    userModel={userModel.current}
                />
            </div>
    )
}

export default User;
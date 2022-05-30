import React, {useEffect, useRef, useState} from 'react';
import ProductListModal from "../products/productListModal";
import {HttpDelete2} from "../service/coreService";
import Modal from "../modal";
import UserProductModal from "./userProductModal";

function User(props) {
    const {
        name,
        surname,
        id,
        age,
        dispatch,
        products,
        allProductList,
        setAllProductList,
        onIdChange
    } = props

    const userModel = useRef({
        name: name,
        surname: surname,
        age: age,
        id: id,
        products: products
    })
    const [show, setShow] = useState(false)
    const [productList, setProductList] = useState([])
    const [productModal, setProductModal] = useState(false)
    const [productListModal, setProductListModal] = useState(false)
    let UserProducts = []

    const editUser = () => {
        onIdChange(id)
    }
    const delUser = () => {
        if (id != null) {
            HttpDelete2(`person`, id).then(response => {
                dispatch({
                    type: "DELETE_USER",
                    payload: id
                })
            }).catch(err => {
                console.log(`delete user id: ${id} Error : ${err}`)
            })
        }
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
                           onClick={() => setProductListModal(true)}/>
                        <i className="fa fa-product-hunt" style={{cursor: "pointer", padding: "10px"}}
                           onClick={() => setProductModal(true)}/>

                        <i className="fas fa-trash-alt" style={{cursor: "pointer", padding: "10px"}}
                           onClick={() => setShow(true)}/>
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
            <UserProductModal
                show={productModal}
                handleCancel={e => {
                    setProductModal(false)
                }}
                dispatch={dispatch}
                setAllProductList={e=>{
                    setAllProductList(e)
                }}
                userModel={userModel.current}

            >

            </UserProductModal>
            <ProductListModal
                show={productListModal}
                dispatch={dispatch}
                handleCancel={e => {
                    setProductListModal(false)
                }}
                allProductList={allProductList}
                userModel={userModel.current}
            />
            <Modal show={show}
                   handleYes={e => {
                       delUser()
                       setShow(false)
                   }
                   }
                   handleNo={e => {
                       setShow(false)
                   }}
            >
                Kullanıcı bilgileri silinecek! Emin misiniz?
            </Modal>
        </div>
    )
}

export default User;
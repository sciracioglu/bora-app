import {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import './productListModal.css'
import {Compare, HttpUpdate2} from "../service/coreService";
import React from 'react';


function ProductListModal({show, handleCancel, allProductList, userModel,dispatch}){
    const[productList, setProductList] = useState([])
    const[checkedList, setCheckedList] = useState([])
    const updatedList = useRef([])
    useEffect(() => {
        let data = allProductList.sort(Compare)
        setProductList(data)

        userModel.products?.forEach(item => {
            updatedList.current.push(item.id)
        })
    },[allProductList])

    useEffect(() =>{
        setCheckedList(updatedList.current)
    },[show])

    const Cancel = () => {
        handleCancel()
    }
    const isChecked = (id) =>{
        return checkedList.includes(id)
    }
    const handleCheck = (e) => {
        let selectedList = [...checkedList]
        if(e.target.checked){
            selectedList=[...selectedList,Number(e.target.value)]
        } else {
            selectedList.splice(checkedList.indexOf(Number(e.target.value)))
        }
        setCheckedList(selectedList)
    }
    const UpdateUserProduct = async () => {
        userModel.products = []
        checkedList.forEach(item=> {
            let products= {
                id:item
            }
            userModel.products.push(products)
        })
        HttpUpdate2(`person/${userModel.id}`,userModel).then(result=>{
            dispatch({
                type:"UPDATE_USER",
                payload:userModel
            })
            updatedList.current = []
            userModel.products.forEach(item =>{
                updatedList.current.push(item.id)
            })
            Cancel()
        })
    }
    const showHideClassName = show ? "modal display-block" : "modal display-none"
    ReactDOM.createPortal(
        <div className={showHideClassName}>
            <section className="modalProduct-main">
                <div className="col-mid-8 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h4>{userModel.name} Urun Listesi Formu</h4>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Ad</th>
                                        <th>Kategori</th>
                                        <th>Fiyat</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        productList.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input value={item.id} type="checkbox" onClick={handleCheck} checked={isChecked(item.id)}/>
                                                </td>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.category}
                                                </td>
                                                <td>
                                                    {item.price}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className="btn btn-group btn-group-lg" role="group" aria-label="User Button Group">
                                <button type="button" className="btn btn-success btn-secondary" onClick={()=>{UpdateUserProduct()}}>Kaydet</button>
                                <button type="button" className="btn btn-danger btn-secondary" onClick={()=>Cancel()}>Iptal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>,
        document.getElementById("modal")
    )

    /*const isChecked = (id) => {
        return
    }*/
}

export default ProductListModal
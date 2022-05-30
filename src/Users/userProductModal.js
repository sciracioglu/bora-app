import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import {Compare, HttpGet, HttpInsert, HttpUpdate2} from "../service/coreService";

function UserProductModal({show, handleCancel, dispatch, userModel, setAllProductList}) {
    const [error, setError] = useState(false)
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const refInput = useRef()

    function handleChange(e){
        switch (e.target.name){
            case "name":{
                return setName(e.target.value)
            }
            case "category":{
                return setCategory(e.target.value)
            }
            case "price" :{
                return setPrice(e.target.value)
            }
            default: return
        }
    }

    useEffect(() => {
        refInput.current.focus();
    },[show])

    const valideteForm = () => {
        if (name === "" || category === "" || price === "") {
            return false
        } else {
            return true
        }
    }
    const updateProductUser = () =>{
        if(!valideteForm()){
            setError(true)
            return
        }
        setError(false)
        let productData={
            name:name,
            category:category,
            price:price
        }
        const result = HttpInsert(`products`, productData).then(response =>{
            if(response.status == 201){
                let product = {
                    id:response.data.id
                }
                userModel.products.push(product)
                HttpGet(`products`).then(response=>{
                    if(response.status==200){
                        let data = response.data.sort(Compare)
                        setAllProductList(data)
                        Cancel()
                    }
                })
                HttpUpdate2(`person/${userModel.id}`, userModel).then(response=>{
                    dispatch({
                        type:"UPDATE_USER",
                        payload:userModel
                    })


                })
            }
        })


    }
    const Cancel = () =>{
        setName("")
        setCategory("")
        setPrice("")
        handleCancel()
    }
    const showHideClassName = show ? "modal display-block" : "modal display-none"


    return ReactDOM.createPortal(
        <div className={showHideClassName}>
            <section className="modalProduct-main">
                <div className="col-mid-8 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h4>{userModel.name} Product Form</h4>
                            <div className="card-body">
                                {
                                    error ?
                                        <div className="alert alert-danger">Eksik urun bilgisi</div>
                                        : null

                                }
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Ad</label>
                                        <input type="text"
                                               name="name"
                                               value={name}
                                               id="name"
                                               ref={refInput}
                                               onChange={handleChange}
                                               placeholder="isim gir"
                                               className="form-control"
                                               required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Kategori</label>
                                        <input type="text"
                                               name="category"
                                               value={category}
                                               onChange={handleChange}
                                               placeholder="kategori gir"
                                               className="form-control"
                                               id="category"
                                               required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Fiyat</label>
                                        <input type="text"
                                               name="price"
                                               value={price}
                                               onChange={handleChange}
                                               placeholder="fiyat gir"
                                               id="price"
                                               className="form-control"
                                               required
                                        />
                                    </div>

                                    <div className="btn btn-group mt-3" role="group" aria-label="user button group">
                                        <button type="button" className="btn btn-success btn-secondary" onClick={updateProductUser}>Kaydet</button>
                                        <button type="button" className="btn btn-danger btn-secondary" onClick={Cancel}>Iptal</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>,
        document.getElementById("modal")
    )
}

export default UserProductModal
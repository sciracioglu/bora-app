import React, {useEffect, useRef, useState} from 'react';
import {HttpGet, HttpInsert, HttpUpdate} from "../service/coreService";

function ProductForm(props) {
    const id = props.id
    const dispatch = props.dispatch
    const onIdChange = props.onIdChange
    const [error, setError] = useState()
    const [nameValue, setNameValue] = useState('')
    const [priceValue, setPriceValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()

    }, [])

    useEffect(() => {
        if (id != null) {
            HttpGet(`products/${id}`).then(result => {
                const {name, price, category, id} = result.data
                setNameValue(name)
                setPriceValue(price)
                setCategoryValue(category)
            })
        }
    }, [id])

    const SaveProduct = () => {
        if (valideteForm()) {
            setError(false)
            let data = {
                name: nameValue,
                price: priceValue,
                category: categoryValue
            }
            if (id == null) {
                HttpInsert(`products`, data).then(response => {
                    dispatch({
                        type: "ADD_PRODUCT",
                        payload: response.data
                    })
                    console.log("inserted product id: " + response.data.id)
                    Cancel()
                })
            } else {
                HttpUpdate(`products/${id}`, data).then(response => {
                    dispatch({
                        type: "UPDATE_PRODUCT",
                        payload: response.data
                    });
                    Cancel()
                })
            }
        } else {
            setError(true)
        }
    }

    const valideteForm = () => {
        if (nameValue === "" || categoryValue === "" || priceValue === "") {
            return false
        } else {
            return true
        }
    }

    const Cancel = () => {
        setNameValue('')
        setPriceValue('')
        setCategoryValue('')
        inputRef.current.focus()
        onIdChange(null)
    }

    const handleChange = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case "name": {
                return setNameValue(value)
            }
            case "price": {
                return setPriceValue(value)
            }
            case "category": {
                return setCategoryValue(value)
            }
            default:
                return
        }
    }

    return (
        <div className="col-mid-8 mb-4">
            <div className="card">
                <div className="card-header">
                    <h4>Product Form</h4>
                    <div className="card-body">
                        {
                            error ?
                                <div className="alert alert-danger">
                                    Hatali urun girisi
                                </div>
                                : null
                        }
                        <form>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="name">Urun ismi</label>
                                </div>
                                <input type="text" id="name"
                                       name="name"
                                       value={nameValue}
                                       className="form-control"
                                       placeholder="urun ismi"
                                       ref={inputRef}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="category">Urun kategorisi</label>
                                </div>
                                <input type="text" id="name"
                                       name="category"
                                       value={categoryValue}
                                       className="form-control"
                                       placeholder="kategori ismi"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="price">Fiyat</label>
                                </div>
                                <input type="text" id="price"
                                       name="price"
                                       value={priceValue}
                                       className="form-control"
                                       placeholder="fiyat ismi"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="btn-group btn-group-lg" aria-label="ProductForm Group Button">
                                <button type="button" className="btn btn-danger btn-secondary"
                                        onClick={() => SaveProduct()}
                                >
                                    {
                                        id == null ? "Kaydet" : "Guncelle"
                                    }
                                </button>
                                <button type="button" className="btn btn-success btn-secondary"
                                        onClick={() => Cancel()}
                                >
                                    Iptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductForm;
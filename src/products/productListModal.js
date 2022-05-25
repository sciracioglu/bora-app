import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import './productListModal.css'
import {Compare, HttpUpdate2} from "../service/coreService";

const ProductListModal = ({show, handleCancel, allProductList, userModel, dispatch}) => {
    const showClassName = show ? 'modal display-block' : 'modal display-none'
    const [productList, setProductList] = useState([])
    const [checkedList, setCheckedList] = useState([])
    const updatedList = useRef([])

    useEffect(() => {
        let data = allProductList.sort((a, b) => Compare(a, b))
        setProductList(data)

        userModel.products?.forEach(item => {
            updatedList.current.push(item.id)
        })
    }, [allProductList])

    useEffect(() => {
        if (!show) {
            return
        }

        setCheckedList(updatedList.current)
    }, [show])

    const isChecked = id => {
        return checkedList.includes(id)
    }

    const handleCheck = e => {
        let selectedList = [...checkedList]

        debugger
        if (e.target.checked) {
            selectedList = [...selectedList, Number(e.target.value)]
        } else {
            selectedList.splice(selectedList.indexOf(Number(e.target.value)), 1)
        }

        setCheckedList(selectedList)
    }

    const updateUserProduct = async () => {
        userModel.products = []
        // userModel.products = userModel.products = checkedList.map(item => ({id: item.id}))
        checkedList.forEach(item => {
            let products = {
                id: item
            }
            userModel.products.push(products)
        })
        HttpUpdate2(`person/${userModel.id}`, userModel).then(response => {
            dispatch({
                type: 'UPDATE_USER',
                payload: response.data
            })
            updatedList.current = []
            userModel.products.forEach(item => {
                updatedList.current.push(item.id)
            })
            handleCancel(false)
        })
    }

    return ReactDOM.createPortal(
      <div className={showClassName}>
          <section className="modalProduct-main">
              <div className="col-mid-8 mb-4">
                  <div className="card">
                      <div className="card-header">
                          <h4>{userModel.name} Ürün Listesi Formu</h4>
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
                                  {productList.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <input value={item.id} type="checkbox" onChange={handleCheck}
                                                   checked={isChecked(item.id)}/>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                          <div className="btn-group btn-group-lg" role="group" aria-label="User Button Group">
                              <button type="button" className="btn btn-danger btn-secondary"
                                      onClick={() => handleCancel(false)}>
                                  İptal
                              </button>
                              <button type="button" className="btn btn-secondary" onClick={() => updateUserProduct()}>
                                  Kaydet
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>, document.getElementById('modal'))
};

export default ProductListModal;
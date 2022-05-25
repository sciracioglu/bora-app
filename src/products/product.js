import React, {useState} from 'react';
import Modal from "../modal";
import {HttpDelete, HttpGet2, HttpUpdate2} from "../service/coreService";

const Product = (props) => {
    const {name, category, price, id, onIdChange, dispatch} = props
    const editUser = () => {
        onIdChange(id)
    }
    const [show, setShow] = useState(false)
    const delProduct = (id) => {
        if (id != null) {
            let personList = []
            HttpGet2(`person`).then(response => {
                personList = response.data
                personList.forEach(person => {
                    person.products.forEach(product => {
                        if (product.id == id) {
                            person.products = person.products.filter(prod => prod.id != id)
                            HttpUpdate2(`person/${id}`, person).then(result => {
                                return
                            })
                        }
                    })
                })
            })
            HttpDelete(`products`, id).then(result => {
                dispatch({
                    type: "DELETE_PRODUCT",
                    payload: id
                })
            }). catch(exception => {
                console.log(exception)
            });
        }


    }
    return (
        <div className="col-mid-8 mb-4">
            <div className="card" style={{backgroundColor: "#62848d", color: "white"}}>
                <div className="card-header d-flex justify-content-between">
                    <h4 className="d-line">{name}</h4>
                    <div>
                        <i className="fas fa-edit" style={{cursor: "pointer", padding: "10px"}}
                           onClick={() => editUser()}/>
                        <i className="far fa-trash-alt" style={{cursor: "pointer", padding: "10px"}}
                           onClick={() => setShow(true)}/>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">Fiyat: {price}</p>
                <p className="card-text">Kategori: {category}</p>
            </div>
            <Modal show={show}
                   handleYes={e => {
                       setShow(false)
                       delProduct(id)
                   }}
                   handleNo={e => {
                       setShow(false)
                   }}>
                Silmek istediginize emin misiniz?
            </Modal>
        </div>
    );
};

export default Product;
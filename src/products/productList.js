import React, {useEffect, useState, useContext} from 'react';
import ProductForm from "./productForm";
import {HttpGet} from "../service/coreService";
import Product from "./product";
import {ProductContext} from "./productContext";

function ProductList(props) {
    //const [productList, setProductList] = useState([])
    const [productId, setProductId] = useState()
    const [state, dispatch] = useContext(ProductContext)
    /* const getProducts = async() =>{
         let response = await HttpGet(`products`)
         if(response.status === 200){
             return response.data
         } else return []
     }

     useEffect(()=>{
         getProducts().then(result => {
             setProductList(result)
             console.log('call getProduct')
         }).catch(error =>{
             console.log(error)
         })
     }, [])
 */

    return (
        <div>
            <ProductForm onIdChange={e => setProductId(e)}
                         id={productId}
                         dispatch={dispatch}/>
            {
                state.products.map(item => (
                    <Product
                        key={item.id}
                        name={item.name}
                        id={item.id}
                        price={item.price}
                        category={item.category}
                        onIdChange={e => setProductId(e)}
                        dispatch={dispatch}
                    >
                    </Product>
                ))
            }
        </div>
    );
}

export default ProductList;
import React, {useEffect} from "react";
import productReducer from "../reducer/productReducer";
import {HttpGet} from "../service/coreService";

const ProductContext = React.createContext()
const initialState = {
    products: []
}
const getProducts = async () => {
    let response = await HttpGet(`products`)
    if (response.status == 200) {
        return response.data
    } else return []
}

function ProductProvider({children}) {
    const [state, dispatch] = React.useReducer(productReducer, initialState)
    useEffect(() => {
        getProducts().then(result => {
            dispatch({
                type: "INITIALIZE",
                payload: result
            })
            console.log('call getProduct')
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        state.products.length > 0 ?
            <ProductContext.Provider value={[state, dispatch]}>
                {children}
            </ProductContext.Provider>
            : null
    )
}

export {ProductContext, ProductProvider}
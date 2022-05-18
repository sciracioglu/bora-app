import React from "react";

const productReducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE": {
            console.log('list_reducer')
            return {
                ...state,
                products: action.payload
            }
        }
        case "ADD_PRODUCT": {
            console.table(action.payload)
            console.log('add_product')
            return {
                products: [...state.products, action.payload]
            }
        }
        case "UPDATE_PRODUCT": {
            console.log('reducer update product')
            return {
                ...state,
                products: state.products.map(
                    product => product.id == action.payload.id ?
                        action.payload : product)
            }
        }
        case "DELETE_PRODUCT": {
            console.log('reducer delete product')
            return {
                ...state,
                products: state.products.filter(
                    product => product.id != action.payload
                )
            }
        }
        default:
            return state

    }
}

export default productReducer
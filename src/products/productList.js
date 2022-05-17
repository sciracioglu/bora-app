import React, { useState, useContext} from 'react';
import ProductForm from "./productForm";
import Product from "./product";
import {ProductContext} from "./productContext";

function ProductList(props) {
    const [productId, setProductId] = useState()
    const [state, dispatch] = useContext(ProductContext)

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
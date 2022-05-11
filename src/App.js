import logo from './logo.svg';
import './App.css';
import UserForm from "./Users/UserForm";
import {useState} from "react";
import ProductList from "./products/productList";
import {ProductProvider} from "./products/productContext";

function App() {

    return (
        <div className="container">
            {/*<UserForm />*/}
            <ProductProvider>
                <ProductList/>
            </ProductProvider>
        </div>
    );
}

export default App;

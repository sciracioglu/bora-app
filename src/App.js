import logo from './logo.svg';
import './App.css';
import UserForm from "./Users/UserForm";
import {useState} from "react";
import ProductList from "./products/productList";

function App() {

  return (
    <div className="container">
        {/*<UserForm />*/}
        <ProductList />
    </div>
  );
}

export default App;

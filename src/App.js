import logo from './logo.svg';
import './App.css';
import UserForm from "./Users/UserForm";
import {useState} from "react";
import ProductList from "./products/productList";
import {ProductProvider} from "./products/productContext";
import {Routes, Route} from "react-router-dom"
import UserList from "./Users/userList";
import {Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {UserProvider} from "./Users/userContext";

function App() {

    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Users</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {
                /*<UserForm />*/
            }
            <Routes>
                <Route path="/" element={
                    <UserProvider>
                        <UserList/>
                    </UserProvider>
                }
                />
                <Route path="products" element={
                    <ProductProvider>
                        <ProductList/>
                    </ProductProvider>
                }/>
            </Routes>
        </div>
    );
}

export default App;

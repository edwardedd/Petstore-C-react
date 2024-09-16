import React from "react";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.page';
import ProductsPage from "./pages/products/products.page";
import AddProductPage from "./pages/add-product/add-product.page";
import EditProductPage from "./pages/edit-product/EditProduct.page";
import DeleteProductPage from "./pages/deleteProduct/DeleteProduct.page";

const App: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products">
                        <Route index element={<ProductsPage/>}></Route>
                        <Route path="add" element={<AddProductPage/>}></Route>
                        <Route path="edit/:id" element={<AddProductPage/>}></Route>
                        <Route path="delete/:id" element={<DeleteProductPage/>}></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default App;
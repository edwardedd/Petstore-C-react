import React from "react";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.page';
import ProductsPage from "./pages/products/products.page";

const App: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products">
                        <Route index element={<ProductsPage/>}></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default App;
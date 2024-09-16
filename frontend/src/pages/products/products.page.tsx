import React, {useEffect, useState} from 'react';
import './products.scss'
import {IProduct} from "../../types/global.typing";
import axios from "axios";
import {baseUrl} from "../../constants/url.const";
import {Button} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import {red} from "@mui/material/colors";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const location = useLocation();
    const redirect = useNavigate();

    const redirectToEditPage = (id: string) => {
        redirect(`/products/edit/${id}`)
    }
    const redirectToDeletePage = (id: string) => {
        redirect(`/products/delete/${id}`)
    }


    const fetchProductsList = async () => {
        try {
            const response = await axios.get<IProduct[]>(baseUrl);
            setProducts(response.data);
            if(location?.state){
                Swal.fire({
                    icon: "success",
                    title: location?.state?.message
                });
                redirect(location.pathname, {replace: true});
            }
        } catch (error){
            alert('An error Happened!')
        }
    }

    useEffect(() => {
        fetchProductsList();
    }, [])

    return (
        <div className='products'>
            <h1>Product list</h1>
            {
                products.length === 0 ? (<h1>No Products</h1>) : (
                    <div className='table-wrapper'>
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Creation Time</th>
                                <th>Update Time</th>
                                <th>Operations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.brand}</td>
                                        <td>{moment(item.createdAt).fromNow()}</td>
                                        <td>{moment(item.updatedAt).fromNow()}</td>
                                        <td>
                                            <Button variant='outlined' color='warning' sx={{mx: 3}} onClick={() => redirectToEditPage(item.id)}><Edit/></Button>
                                            <Button variant='outlined' color='error' onClick={() => redirectToDeletePage(item.id)}><Delete/></Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}

export default ProductsPage;
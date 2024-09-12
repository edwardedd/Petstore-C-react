import React, {useEffect, useState} from 'react';
import './products.scss'
import {IProduct} from "../../types/global.typing";
import axios from "axios";
import {baseUrl} from "../../constants/url.const";
import {Button} from "@mui/material";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    const fetchProductsList = async () => {
        try {
            const response = await axios.get<IProduct[]>(baseUrl);
            setProducts(response.data);
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
                                    <tr>
                                        <td>{item.title}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <Button variant='outlined' color='warning' sx={{mx: 3}}>Edit</Button>
                                            <Button variant='outlined' color='error'>Delete</Button>
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
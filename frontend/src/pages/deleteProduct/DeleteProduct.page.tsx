import React from 'react';
import './delete-product.scss';
import {Button} from "@mui/material";
import axios from "axios";
import {baseUrl} from "../../constants/url.const";
import { useNavigate, useParams} from "react-router-dom";



const DeleteProductPage = () => {
    const redirect = useNavigate();
    const {id} = useParams()
    const handleDeleteClick = () => {
        axios.delete(`${baseUrl}/${id}`)
            .then((response) => redirect('/products', {state: {message: 'Product deleted successfully!'}}))
            .catch((error) => alert('Error'));
    };

    const handleBackClick = () => {
        redirect('/products');
    };
    return (
        <div className='delete-product'>
            <h2>Delete Product</h2>
            <div>
                <Button variant='outlined' color="primary" onClick={handleDeleteClick}>Delete it!</Button>
                <Button variant='outlined' color="secondary" onClick={handleBackClick}>Back</Button>
            </div>
        </div>
    );
};

export default DeleteProductPage;
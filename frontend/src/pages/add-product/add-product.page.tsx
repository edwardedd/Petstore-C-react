import React, {useState} from 'react';
import './add-product.scss';
import {Button, TextField} from "@mui/material";
import {IProduct} from "../../types/global.typing";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../constants/url.const";

function AddProductPage(): JSX.Element {
    const [product, setProduct] = useState<Partial<IProduct>>({title: '', brand: ''});
    const redirect = useNavigate();
    const location = useLocation();
    const {id} = useParams()

    if (location.pathname.includes('edit')){
        React.useEffect(() => {
            axios.get<IProduct>(`${baseUrl}/${id}`).then(res => setProduct({
                title: res.data.title,
                brand: res.data.brand
            }))
        }, [])
    }

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const handleSaveClick = () => {
        if (product.title === '' || product.brand === ''){
            alert('Enter Values');
            return;
        }
        const data:Partial<IProduct> = {
            brand: product.brand,
            title: product.title
        }

        if (location.pathname.includes('edit')){
            axios.put(`${baseUrl}/${id}`, data)
                .then((response) => redirect('/products', {state: {message: 'Product created successfully!'}}))
                .catch((error) => alert('Error'))
        } else {
            axios.post(baseUrl, data)
                .then((response) => redirect('/products', {state: {message: 'Product created successfully!'}}))
                .catch((error) => alert('Error'))
        }
    };
    const handleBackClick = () => {
        redirect('/products');
    };

    return (
        <div className='add-product'>
            <h2>Add New Product</h2>
            <TextField
                autoComplete='off'
                label='Brand'
                variant='outlined'
                value={product.brand}
                name="brand"
                onChange={changeInputHandler}></TextField>
            <TextField
                autoComplete='off'
                label='Title'
                variant='outlined'
                value={product.title}
                name="title"
                onChange={changeInputHandler}></TextField>
            <div>
                <Button variant='outlined' color="primary" onClick={handleSaveClick}>Save</Button>
                <Button variant='outlined' color="secondary" onClick={handleBackClick}>Back</Button>
            </div>
        </div>
    );
}

export default AddProductPage;
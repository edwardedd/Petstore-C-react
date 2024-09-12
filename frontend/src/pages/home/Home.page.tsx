import React from 'react';
import {Button} from "@mui/material";
import {redirect} from "react-router-dom";
import parrot from '../../assets/img/parrot.jpeg'
import './home.scss';

function HomePage() {
    return (
        <div className="home">
            <h1>Welcome to Pet Store</h1>
            <Button variant="outlined" color ='primary' onClick={() =>
                redirect('/products')
            }>Product List</Button>
            <img src={parrot} alt='parrot'/>
        </div>
    );
}

export default HomePage;
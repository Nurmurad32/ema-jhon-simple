import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AddNewItem = () => {
    const handleAddProduct = () => {
        const product = {}
        fetch("http://localhost:5000/addProduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div className="row container-fluid" style={{}}>
                    <Sidebar></Sidebar>
                <div className="col-md-10" style={{ position:'absolute', right: 0 ,paddingTop: '3rem', paddingRight: '0', bottom: 0}}>
                <h2 className="text-brand" style={{margin: '0 0 15px 25px'}}>Add New Product</h2>
                    <form action="" style={{ backgroundColor:'#FFCD84', minHeight:'90vh',paddingTop: '3rem', textAlign: 'center'}} className=" px-4">
                        <p><span style={{display:'inline-block', width:'15%'}}>Name:</span><input type="text" /></p>
                        <p><span style={{display:'inline-block', width:'15%'}}>Price:</span><input type="text" /></p>
                        <p><span style={{display:'inline-block', width:'15%'}}>Quantity:</span><input type="text" /></p>
                        <p><span style={{display:'inline-block', width:'15%'}}>Upload Image:</span><input type="file" /></p>
                        <button className="main-btn" onClick={handleAddProduct}>Add Product</button>
                    </form>
                </div>
            </div>
    );
};

export default AddNewItem;
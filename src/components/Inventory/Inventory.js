import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Inventory = () => {
    
    return (
            <div className="row container-fluid" style={{}}>
                    <Sidebar></Sidebar>
                <div className="col-md-10" style={{ position:'absolute', right: 0 ,paddingTop: '3rem', paddingRight: '0', bottom: 0}}>
                <h2 className="text-brand" style={{margin: '0 0 15px 25px'}}>Admin Dashboard</h2>
                    <div action="" style={{ backgroundColor:'#FFCD84', minHeight:'90vh',paddingTop: '3rem',textAlign: 'center'}} className=" px-4">
                        <h2>Welcome to Admin's Dashboard</h2>
                        <h3 style={{ color: 'red'}}>**This is for Admin Use Only.</h3>
                    </div>
                </div>
            </div>
    );
};

export default Inventory;
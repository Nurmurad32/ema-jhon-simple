import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const OrderedItem = () => {
    return (
        <div className="row container-fluid" style={{}}>
                    <Sidebar></Sidebar>
                <div className="col-md-10" style={{ position:'absolute', right: 0 ,paddingTop: '3rem', paddingRight: '0', bottom: 0}}>
                <h2 className="text-brand" style={{margin: '0 0 15px 25px'}}>Ordered Product</h2>
                <form action="" style={{ backgroundColor:'#FFCD84', minHeight:'90vh',paddingTop: '3rem'}} className=" px-4">
                        
                        </form>
                </div>
            </div>
    );
};

export default OrderedItem;
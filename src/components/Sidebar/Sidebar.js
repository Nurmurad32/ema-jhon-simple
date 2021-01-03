import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo.png'



const Sidebar = () => {
    return (
        <div className="sidebar d-flex flex-column col-md-2 py-5 px-4" style={{ height: "100vh", left: "0"}}>
            <Link to="/" className="text-black">
                <img src={logo} alt="" height="40" />
            </Link>
            <ul className="list-unstyled">

                <li>
                    <Link to="/inventory" className="text-black">
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/ordered" className="text-black">
                        <span>Ordered Item</span>
                    </Link>
                </li>
                <li>
                    <Link to="/addNewItem" className="text-black">
                        <span>Add new item</span>
                    </Link>
                </li>
            </ul>
            
        </div>
    );
};

export default Sidebar;
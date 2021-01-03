import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { UserContext } from '../../App';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    // setTimeout(function(){
    //     document.getElementById('user-name').style.display='none';},10000);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav style={{display: 'flex',textAlign: "center", margin: '0 auto',justifyContent: "center"}}>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Inventory</Link>
                <div class="input-group mb-3" style={{width: '30%', alignItems: 'flex-end', marginRight: "25px"}}>
                    <input type="text" class="form-control" placeholder="Search"/>
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" style={{backgroundColor: '#FF9800'}}><FontAwesomeIcon icon={faSearch} /></button>
                            <button class="btn btn-outline-secondary" type="button" style={{backgroundColor: '#FF9800', marginLeft: '10px'}}><FontAwesomeIcon icon={faShoppingCart} /></button>
                        </div>
                </div>
                
                    {loggedInUser.email && <p onClick={() => setLoggedInUser({})} className="sign-out-btn" style={{marginLeft: "25px"}}>Sign Out</p>}
                    <p className="user-name">{loggedInUser.email}</p>
            </nav>
        </div>
    );
};

export default Header;
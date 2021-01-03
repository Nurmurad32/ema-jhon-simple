import React from 'react';

const ReviewItem = (props) => {
    console.log(props)
    const { name, quantity, key, price, img } = props.product;

    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        // marginLeft:'200px',
        display: 'flex'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <div>
                <img src={img} alt="" />
            </div>
            <div style={{ marginLeft: '20px'}}>
                <h4>{name}</h4>
                <p>Quantity:{quantity || 1}</p>
                <p><small>$ {price}</small></p>
                <button onClick={() => props.handleRemoveProduct(key)} className="main-btn">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;
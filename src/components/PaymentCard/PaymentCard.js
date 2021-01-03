import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import paymentCard from '../../images/paymentCard.png';

const PaymentCard = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState('')

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setPaymentError(error.message)
      setPaymentSuccess(null)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setPaymentSuccess(paymentMethod.id)
      setPaymentError(null)
      handlePayment(paymentMethod.id)
    }
  };
  const paymentFormStyle = {
    border: '1px solid black',
    padding: '15px 20px 50px 20px',
    margin: '0 auto'
  }
  return (
    <div>
      {paymentError && <h3 style={{ color: 'red',textAlign: 'center' }}>{paymentError}</h3>}
      {paymentSuccess && <h3 style={{ color: 'green', textAlign: 'center'}}>Your payment is successfull</h3>}
      <form onSubmit={handleSubmit} style={paymentFormStyle}>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Credit Card
            <img src={paymentCard} alt="" height='30' mr-auto pull-right />
            <br />
            <span style={{ color: "gray" }}>Safe Money transfer using your bank account. Visa, Master, Discover, American Express</span>
          </label>

        </div>
        <div style={{ marginTop: '25px' }}>
          <div >
            <span>CARD NUMBER</span>
            {/* <span>EXPIRY DATE</span>
            <span>CVV CODES</span> */}
          </div>
          <div style={{ marginTop: '15px', border: '1px solid black', padding: '10px 25px' }}>
            <CardElement />
          </div>

          <button type="submit" disabled={!stripe} className="main-btn" style={{ marginTop: '10px', float: 'right' }}>
            Pay
          </button>
        </div>

      </form>
    </div>

  );
};

export default PaymentCard;
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentCard from '../PaymentCard/PaymentCard';

const stripePromise = loadStripe('pk_test_51I4pCFC1HRZ4JJGdhe2cy7OhSgJSJzlAx628JPxSxCPjA3sFssOzu9CYizgAAH1iZUH1bFAj1c6S0mB5e3Eqo0zT00rlhj5mdR');


const PaymentProcess = ({handlePaymentSuccess}) => {
    
    return (
        <Elements stripe={stripePromise}>
            <PaymentCard handlePayment={handlePaymentSuccess}></PaymentCard>
            </Elements>
    );
};

export default PaymentProcess;
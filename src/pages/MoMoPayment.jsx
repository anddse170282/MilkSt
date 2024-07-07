import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const MoMoPaymentPage = () => {
  const {amount} = useParams();
  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await axios.post('http://localhost:5000/momo-payment', {
          amount: amount,
          orderInfo: 'pay with MoMo'
        });

        const payUrl = response.data.payUrl;
        if (payUrl) {
          window.location.href = payUrl;
        }
      } catch (error) {
        console.error('Error initiating MoMo payment:', error);
      }
    };

    initiatePayment();
  }, []);

  return (
    <div>
      <h2>Processing MoMo Payment...</h2>
    </div>
  );
};

export default MoMoPaymentPage;

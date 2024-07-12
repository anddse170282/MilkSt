import React, { useEffect, useState } from 'react';
import SuccessPayment from './SuccessPayment';
import FailedPayment from './FailedPayment';

const PaymentResult = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('resultCode');
    const amount = params.get('amount');

    setPaymentStatus(status);
    setAmount(amount);
  }, []);

  return (
    <div>
      {paymentStatus === '0' ? (
        <SuccessPayment amount={amount} />
      ) : (
        <FailedPayment amount={amount} />
      )}
    </div>
  );
};

export default PaymentResult;

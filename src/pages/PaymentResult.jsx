import React, { useEffect, useState } from 'react';
import SuccessPayment from './SuccessPayment';
import FailedPayment from './FailedPayment';
import * as voucherService from '../api/voucherService';

const PaymentResult = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [amount, setAmount] = useState(null);
  const [voucher, setVoucher] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('resultCode');
    const amount = params.get('amount');

    setPaymentStatus(status);
    setAmount(amount);
  }, []);

  useEffect(() => {
    const storedOrder = JSON.parse(sessionStorage.getItem('order'));
    if (storedOrder && storedOrder.length > 0) {
      const currentOrder = storedOrder[0];

      try {
        const voucherData = voucherService.getVouchersById(currentOrder.voucherId);
        setVoucher(voucherData);
        if (paymentStatus === '0') {
          voucher.quantity -= 1;
          const voucherDetail = {
            title: voucher.title,
            startDate: voucher.startDate,
            endDate: voucher.endDate,
            discount: voucher.discount,
            quantity: voucher.quantity,
            status: voucher.status
          }
          voucherService.updateVoucher(voucherDetail);
          sessionStorage.removeItem('order');
        }
      } catch {
        console.error('Failed to update voucher quantity:', error);
      }
    };
  })


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

import React, { useEffect, useState } from 'react';
import SuccessPayment from './SuccessPayment';
import FailedPayment from './FailedPayment';
import * as voucherService from '../api/voucherService';

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

  useEffect(() => {
    const fetchVoucher = async () => {
      const storedOrder = JSON.parse(sessionStorage.getItem('orders'));

      if (storedOrder && storedOrder.length > 0) {
        const currentOrder = storedOrder[0];
        try {
          const voucherData = await voucherService.getVouchersById(currentOrder.voucherId);
          if (voucherData && voucherData.length > 0) {
            const voucher = voucherData[0];
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
              await voucherService.updateVoucher(voucherDetail, voucher.voucherId);
              sessionStorage.removeItem('orders');
            }
          }
        } catch (error) {
          console.error('Failed to update voucher quantity:', error);
        }
      }
    };

    fetchVoucher();
  }, [paymentStatus]);


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

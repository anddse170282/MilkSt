import React, { useEffect, useState } from 'react';
import SuccessPayment from './SuccessPayment';
import FailedPayment from './FailedPayment';
import * as voucherService from '../api/voucherService';
import moment from 'moment';

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

  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD');
  };

  useEffect(() => {
    const fetchVoucher = async () => {
      const storedOrder = JSON.parse(sessionStorage.getItem('orders'));

      if (storedOrder && storedOrder.length > 0) {
        const currentOrder = storedOrder[0];

        try {
          const voucherData = await voucherService.getVouchersById(currentOrder.voucherId);

          if (voucherData) {
            const voucher = voucherData;
            if (paymentStatus === '0') {
              voucher.quantity -= 1;
              const voucherDetail = {
                title: voucher.title,
                startDate: formatDate(voucher.startDate),
                endDate: formatDate(voucher.endDate),
                discount: voucher.discount,
                quantity: voucher.quantity,
                status: voucher.status
              };
              await voucherService.updateVoucher(voucherDetail, voucher.voucherId);
              sessionStorage.removeItem('orders');
            }
          }
        } catch (error) {
          console.error('Failed to update voucher quantity:', error.response ? error.response.data : error.message);
        }
      }
    };

    if (paymentStatus !== null) {
      fetchVoucher();
    }
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

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
    const formats = ['M/D/YYYY h:mm:ss A', 'M/D/YYYY H:mm:ss'];
    const date = moment(dateString, formats, true);
    return date.isValid() ? date.toISOString() : 'Invalid date';
};

  useEffect(() => {
    const fetchVoucher = async () => {
      const storedOrder = JSON.parse(sessionStorage.getItem('orders'));
      console.log('Stored Order:', storedOrder);

      if (storedOrder && storedOrder.length > 0) {
        const currentOrder = storedOrder[0];
        console.log('Current Order:', currentOrder);

        try {
          const voucherData = await voucherService.getVouchersById(currentOrder.voucherId);
          console.log('Voucher Data:', voucherData);

          if (voucherData) {
            const voucher = voucherData;
            console.log('Start Date: ', voucher.startDate);
            console.log('End Date: ', voucher.endDate);
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
              sessionStorage.removeItem('cart');
              console.log('Orders and cart removed from session storage');
            }
          }
        } catch (error) {
          console.error('Failed to update voucher quantity:', error.response ? error.response.data : error.message);
        }
      }
    };

    fetchVoucher();
  }, [paymentStatus]); // Thêm paymentStatus vào dependency array để useEffect chạy lại khi paymentStatus thay đổi

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

import React, { useEffect, useState } from 'react';
import SuccessPayment from './SuccessPayment';
import FailedPayment from './FailedPayment';
import * as voucherService from '../api/voucherService';
import * as orderService from '../api/orderService';
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
    const formats = [
      'M/D/YYYY h:mm:ss A',
      'M/D/YYYY H:mm:ss',
      'MM/DD/YYYY h:mm:ss A',
      'MM/DD/YYYY H:mm:ss',
      'M/D/YY h:mm:ss A',
      'M/D/YY H:mm:ss',
      'MM/DD/YY h:mm:ss A',
      'MM/DD/YY H:mm:ss',
      'YYYY-MM-DDTHH:mm:ssZ', // ISO format
      'YYYY-MM-DDTHH:mm:ss.SSSZ' // ISO format with milliseconds
    ];
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
          if (paymentStatus === '0') {
            if (currentOrder.voucherId) {
              const voucherData = await voucherService.getVouchersById(currentOrder.voucherId);
              console.log('Voucher Data:', voucherData);
              if (voucherData) {
                const voucher = voucherData;
                console.log('Start Date: ', voucher.startDate);
                console.log('End Date: ', voucher.endDate);
                voucher.quantity -= 1;
                const voucherDetail = {
                  title: voucher.title,
                  startDate: formatDate(voucher.startDate),
                  endDate: formatDate(voucher.endDate),
                  discount: voucher.discount,
                  quantity: voucher.quantity,
                  voucherStatusId: voucher.voucherStatusId
                };
                await voucherService.updateVoucher(voucherDetail, voucher.voucherId);
              }
            }
            const orderDetail = {
              voucherId: currentOrder.voucherId ? currentOrder.voucherId : null,
              statusId: 1
            };
            await orderService.updateOrder(orderDetail, currentOrder.orderId);
          }
          else {
            const orderDetail = {
              voucherId: currentOrder.voucherId ? currentOrder.voucherId : null,
              statusId: 2
            };
            await orderService.updateOrder(orderDetail, currentOrder.orderId);
          }
          sessionStorage.removeItem('orders');
          sessionStorage.removeItem('selectCart');
          console.log('Orders and cart removed from session storage');
        } catch (error) {
          console.error('Failed to update voucher quantity:', error.response ? error.response.data : error.message);
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

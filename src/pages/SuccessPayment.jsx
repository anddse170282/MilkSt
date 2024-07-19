import React from 'react';
import '../css/paymentresult.css'

const SuccessPayment = ({ amount }) => {
  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formatted.replace(/\./g, ' ');
  };
  return (
    <div className="payment-result">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Thanh toán thành công!</h4>
        <p>Giao dịch đã được thực hiện thành công.</p>
        <hr />
        <p className="mb-0">MoMo Payment</p>
        <h4>{formatPrice(amount)}đ</h4>
      </div>
    </div>
  );
};

export default SuccessPayment;

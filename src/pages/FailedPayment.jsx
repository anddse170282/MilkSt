import React from 'react';
import '../css/paymentresult.css'

const FailedPayment = ({ amount }) => {
  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formatted.replace(/\./g, ' ');
  };
  return (
    <div className="payment-result">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Thanh toán không thành công</h4>
        <p>Lỗi: Giao dịch bị từ chối bởi người dùng.</p>
        <hr />
        <p className="mb-0">MoMo Payment</p>
        <h4>{formatPrice(amount)}</h4>
      </div>
    </div>
  );
};

export default FailedPayment;

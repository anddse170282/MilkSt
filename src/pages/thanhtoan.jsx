import React, { useState } from 'react';
import './thanhtoan.css'; // Đảm bảo đường dẫn này chính xác

function InvoiceComponent() {
    const [isEditing, setIsEditing] = useState(false);
    const [invoiceInfo, setInvoiceInfo] = useState({
        parentName: 'Nguyễn A',
        address: 'D1, ......',
        phone: '0123456789'
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirm = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <header className="header">
                <div className="logo-container">
                    <a href="HomePage.html"><img src="Hanalogo.jpg" width="150" height="150" alt="Logo" /></a>
                </div>
                {/* Other header content */}
            </header>
            <div className="invoice-container">
                <h1>Hóa Đơn</h1>
                <h2>Xác Nhận Thông Tin</h2>
                <form id="invoice-form">
                    <div className="info">
                        <div className="info-row">
                            <label>Ba/Mẹ</label>
                            <input type="text" value={invoiceInfo.parentName} disabled={!isEditing} onChange={(e) => setInvoiceInfo({...invoiceInfo, parentName: e.target.value})} />
                        </div>
                        <div className="info-row">
                            <label>Địa chỉ</label>
                            <input type="text" value={invoiceInfo.address} disabled={!isEditing} onChange={(e) => setInvoiceInfo({...invoiceInfo, address: e.target.value})} />
                        </div>
                        <div className="info-row">
                            <label>Số điện thoại</label>
                            <input type="text" value={invoiceInfo.phone} disabled={!isEditing} onChange={(e) => setInvoiceInfo({...invoiceInfo, phone: e.target.value})} />
                        </div>
                    </div>
                    {isEditing ? (
                        <button type="button" className="confirm-button" onClick={handleConfirm}>Xác nhận thông tin</button>
                    ) : (
                        <button type="button" className="edit-button" onClick={handleEdit}>Sửa thông tin</button>
                    )}
                    <hr />
                    <div className="total">
                        <span>Thành Tiền</span>
                        <span className="price">97000 ₫</span>
                    </div>
                    <button type="submit" className="pay-button">Thanh toán</button>
                </form>
            </div>
        </div>
    );
}

export default InvoiceComponent;
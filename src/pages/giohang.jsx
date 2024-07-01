import React, { useState, useEffect } from 'react';
import './giohang.css'; // Assuming CSS is adapted for React and renamed to Cart.css

function giohangComponent() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', quantity: 1, price: 100000 },
        { id: 2, name: 'Product 2', quantity: 1, price: 100000 },
        { id: 3, name: 'Product 3', quantity: 1, price: 100000 }
    ]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [showVouchers, setShowVouchers] = useState(false);

    useEffect(() => {
        calculateSubtotal();
    }, [cartItems, selectedItems]);

    useEffect(() => {
        setTotal(subtotal - discount);
    }, [subtotal, discount]);

    const calculateSubtotal = () => {
        const subtotal = cartItems.reduce((acc, item) => {
            if (selectedItems.has(item.id)) {
                return acc + (item.quantity * item.price);
            }
            return acc;
        }, 0);
        setSubtotal(subtotal);
    };

    const handleSelectItem = (id) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        setSelectedItems(newSelectedItems);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedItems(new Set(cartItems.map(item => item.id)));
        } else {
            setSelectedItems(new Set());
        }
    };

    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const handleDeleteItem = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const applyDiscount = (type) => {
        if (type.includes('%')) {
            const percentage = parseInt(type.replace('Voucher giảm ', '').replace('%', ''));
            setDiscount(subtotal * (percentage / 100));
        } else {
            const amount = parseInt(type.replace('Voucher giảm ', '').replace(' ₫', ''));
            setDiscount(amount);
        }
        setShowVouchers(false);
    };

    return (
        <div className="cart-container">
            <table className="cart-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={handleSelectAll} /> CHỌN TẤT CẢ ({selectedItems.size} MỤC)</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá tiền</th>
                        <th>Xoá</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td><input type="checkbox" checked={selectedItems.has(item.id)} onChange={() => handleSelectItem(item.id)} /></td>
                            <td><img src="img_placeholder.png" alt="IMG" width="50" /></td>
                            <td><input type="number" value={item.quantity} className="quantity" min="1" onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} /></td>
                            <td>{item.price} ₫</td>
                            <td><button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>Xoá</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="cart-summary">
                <button onClick={() => setShowVouchers(!showVouchers)}>Voucher ưu đãi</button>
                {showVouchers && (
                    <div className="voucher-list">
                        <ul>
                            <li onClick={() => applyDiscount('Voucher giảm 10%')}>Voucher giảm 10%</li>
                            <li onClick={() => applyDiscount('Voucher giảm 20.000 ₫')}>Voucher giảm 20.000 ₫</li>
                            <li onClick={() => applyDiscount('Voucher giảm 50.000 ₫')}>Voucher giảm 50.000 ₫</li>
                        </ul>
                    </div>
                )}
                <p>Tiền phụ: <span>{subtotal} ₫</span></p>
                <p>Voucher ưu đãi: <span>{discount} ₫</span></p>
                <p className="total">Thành Tiền: <span>{total} ₫</span></p>
                <a href="thanhtoan.html"><button>Xác nhận giỏ hàng</button></a>
            </div>
        </div>
    );
}

export default CartComponent;
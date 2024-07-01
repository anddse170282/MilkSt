import React, { useState } from 'react';
import './productInfo.css'; // Đảm bảo đường dẫn này chính xác

function UserInformationForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        fetch('https://localhost:7188/api/users', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Điền thông tin khách hàng</h2>
                <div className="form-content">
                    <div className="form-left">
                        <div className="form-group">
                            <label htmlFor="name">Ba/Mẹ</label>
                            <input type="text" id="name" name="name" placeholder="Nguyễn A" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="tel" id="phone" name="phone" placeholder="0123456789" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Ngày sinh</label>
                            <input type="text" id="dob" name="dob" placeholder="01/01/1999" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Giới tính</label>
                            <div className="gender-options">
                                <label><input type="radio" id="male" name="gender" value="male" required onChange={handleChange} /> Nam</label>
                                <label><input type="radio" id="female" name="gender" value="female" required onChange={handleChange} /> Nữ</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input type="text" id="address" name="address" placeholder="D1,......" required onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-group">
                            <label htmlFor="image">Chọn ảnh</label>
                            <div className="image-upload">
                                <div className="image-placeholder">IMG</div>
                                <input type="file" id="image" name="image" accept=".jpeg, .jpg, .png" required onChange={handleFileChange} />
                            </div>
                            <p>Dung lượng file tối đa 1MB<br />Định dạng: JPEG, PNG</p>
                        </div>
                    </div>
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </div>
    );
}

export default UserInformationForm;
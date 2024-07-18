import React, { useState, useEffect } from 'react';
import '../css/customerinformation.css';

function UserInformationForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
        image: null
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userArray = JSON.parse(sessionStorage.getItem('user'));
        const user = userArray && userArray[0];  // Truy cập phần tử đầu tiên của mảng

        console.log("User data from sessionStorage:", user);

        if (user) {
            console.log("Updating formData with user data...");
            setFormData({
                name: user.userName || '',
                phone: user.phone || '',
                dob: user.dateOfBirth || '',
                gender: user.gender || '',
                address: user.address || '',
                image: user.profilePicture || null
            });
        }
    }, []);

    useEffect(() => {
        console.log("Form data after update:", formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSubmit = { ...formData };

        if (formData.image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formDataToSubmit.image = reader.result;
                submitData(formDataToSubmit);
            };
            reader.readAsDataURL(formData.image);
        } else {
            submitData(formDataToSubmit);
        }
    };

    const submitData = (data) => {
        fetch('https://localhost:7188/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Revert formData to initial user data
        const userArray = JSON.parse(sessionStorage.getItem('user'));
        const user = userArray && userArray[0];
        if (user) {
            setFormData({
                name: user.userName || '',
                phone: user.phone || '',
                dob: user.dateOfBirth || '',
                gender: user.gender || '',
                address: user.address || '',
                image: user.profilePicture || null
            });
        }
    };

    return (
        <div className="containeruserInformation">
            <form onSubmit={handleSubmit}>
                <h2>Thông tin khách hàng</h2>
                <div className="form-content">
                    <div className="form-left">
                        <div className="form-group">
                            <label htmlFor="name">Ba/Mẹ</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nguyễn A"
                                value={formData.name}
                                required
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="0123456789"
                                value={formData.phone}
                                required
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Ngày sinh</label>
                            <input
                                type="text"
                                id="dob"
                                name="dob"
                                placeholder="01/01/1999"
                                value={formData.dob}
                                required
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Giới tính</label><br />
                            <div className="gender-options">
                                <label className="label-gender">
                                    <input
                                        type="checkbox"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    /> Nam
                                </label>
                                <label className="label-gender">
                                    <input
                                        type="checkbox"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    /> Nữ
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="D1,......"
                                value={formData.address}
                                required
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-group">
                            <label htmlFor="image">Chọn ảnh</label>
                            <div className="image-upload">
                                <div className="image-placeholder">IMG</div>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept=".jpeg, .jpg, .png"
                                    onChange={handleFileChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <p>Dung lượng file tối đa 1MB<br />Định dạng: JPEG, PNG</p>
                        </div>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <button type="submit">Sửa</button>
                        <button type="button" onClick={handleCancelClick}>Hủy</button>
                    </>
                ) : (
                    <button type="button" onClick={handleEditClick}>Sửa thông tin</button>
                )}
            </form>
        </div>
    );
}

export default UserInformationForm;

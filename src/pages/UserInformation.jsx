import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.config';
import * as userService from '../api/userService';
import '../css/customerinformation.css';

function UserInformationForm() {
    const [imagePreview, setImagePreview] = useState(null);
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useState({
        userName: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        profilePicture: null
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userArray = JSON.parse(sessionStorage.getItem('user'));
        const user = userArray && userArray[0];
        setUser(user);
        setImagePreview(user.profilePicture);
        console.log("User data from sessionStorage:", user);

        if (user) {
            console.log("Updating formData with user data...");
            setFormData({
                userName: user.userName || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                address: user.address || '',
                profilePicture: user.profilePicture || null
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData((prevFormData) => ({ ...prevFormData, profilePicture: file }));
        } else {
            setImagePreview(null);
            setFormData((prevFormData) => ({ ...prevFormData, profilePicture: null }));
        }
    };

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
            'YYYY-MM-DDTHH:mm:ssZ',
            'YYYY-MM-DDTHH:mm:ss.SSSZ'
        ];
        const date = moment(dateString, formats, true);
        return date.isValid() ? date.toISOString() : 'Invalid date';
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, phone, dateOfBirth, gender, address, profilePicture } = formData;
        console.log('Form data before submit:', formData);

        if (userName && phone && dateOfBirth && gender && address && profilePicture) {
            try {
                const imageName = `${phone}`;
                const imageRef = ref(storage, `UserImage/${imageName}`);

                await uploadBytes(imageRef, profilePicture);
                const imageUrl = await getDownloadURL(imageRef);

                const userData = {
                    ...formData,
                    dateOfBirth: formatDate(dateOfBirth),
                    profilePicture: imageUrl
                };

                // Log userData to check structure before sending
                console.log('Sending user data:', userData);
                const updateUser = await userService.updateUser(user.userId, userData);

                
                console.log("Update success: ", updateUser);

                sessionStorage.setItem('user', JSON.stringify([{...formData, dateOfBirth: dateOfBirth, profilePicture: imageUrl,userId: user.userId}]));

                setIsEditing(false);
            }
            catch (error) {
                console.error('Error update user:', error);
            }
        }
        else {
            console.log('Please fill out all fields');
        }
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
                userName: user.userName || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                address: user.address || '',
                profilePicture: user.profilePicture || null
            });
        }
    };

    const isFormValid = () => {
        const { userName, phone, dateOfBirth, gender, address, profilePicture } = formData;
        return userName && phone && dateOfBirth && gender && address && profilePicture;
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
                                id="userName"
                                name="userName"
                                placeholder="Nguyễn A"
                                value={formData.userName}
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
                                id="dateOfBirth"
                                name="dateOfBirth"
                                placeholder="01/01/1999"
                                value={formData.dateOfBirth}
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
                                        value="Nam"
                                        checked={formData.gender === 'Nam'}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    /> Nam
                                </label>
                                <label className="label-gender">
                                    <input
                                        type="checkbox"
                                        id="female"
                                        name="gender"
                                        value="Nữ"
                                        checked={formData.gender === 'Nữ'}
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
                                <div className="image-placeholder">{imagePreview ? (
                                    <img src={imagePreview} alt="Selected" className="image-preview" />
                                ) : (
                                    "IMG"
                                )}
                                </div>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept=".jpeg, .jpg, .png"
                                    onChange={handleImageChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <p>Dung lượng file tối đa 1MB<br />Định dạng: JPEG, PNG</p>
                        </div>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <button type="button" onClick={handleSubmit} disabled={!isFormValid()}>Xác Nhận</button>
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

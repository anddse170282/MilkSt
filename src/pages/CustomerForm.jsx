import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addUser, getUserByFilter, addMember } from '../api/userService';
import { storage } from '../firebase.config';
import '../css/customerform.css';

function CustomerForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    profilePicture: null,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const phoneFromQuery = queryParams.get('phone');
    if (phoneFromQuery) {
      setPhone(phoneFromQuery);
      setFormData((prevFormData) => ({ ...prevFormData, phone: phoneFromQuery }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
          dateOfBirth: new Date(dateOfBirth).toISOString(),
          profilePicture: imageUrl
        };

        // Log userData to check structure before sending
        console.log('Sending user data:', userData);

        await addUser(userData);

        console.log('User created successfully');

        // Fetch the user by phone
        const userResponse = await getUserByFilter(phone);
        const userId = userResponse[0].userId; // Assuming the API returns an array of users
        const user = JSON.parse(sessionStorage.getItem('user')) || [];
        user.push(...userResponse);
        sessionStorage.setItem('user', JSON.stringify(user));

        // If userId is found, add the member
        if (userId) {
          const memberData = {
            userId: userId,
            description: " "
          };
          await addMember(memberData);
          console.log('Member added successfully');
          alert('User and member created successfully');
        } else {
          console.error('User ID not found after creation');
          alert('User created successfully, but failed to register member');
        }

        navigate('/');
      } catch (error) {
        console.error('Error creating user or member:', error);
      }
    } else {
      console.log('Please fill out all fields');
    }
  };

  const isFormValid = () => {
    const { userName, phone, dateOfBirth, gender, address, profilePicture } = formData;
    return userName && phone && dateOfBirth && gender && address && profilePicture;
  };

  return (
    <div className="bk">
      <div className="background">
        <section className="login-section">
          <div className="login-row">
            <div className="logoLogin">
              <header>
                <a href="\">
                  <img src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00" width="150" height="150" alt="Logo" />
                </a>
              </header>
            </div>
          </div>

          <div className="form-section">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h2>Điền thông tin khách hàng</h2>
              <div className="form-content">
                <div className="form-left">
                  <div className="form-group">
                    <label htmlFor="userName">Ba/Mẹ</label><br />
                    <input type="text" id="userName" name="userName" placeholder="Nguyễn A" value={formData.userName} onChange={handleChange} required /><br />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label><br />
                    <input type="tel" id="phone" name="phone" placeholder="0123456789" value={formData.phone} onChange={handleChange} required /><br />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Ngày sinh</label><br />
                    <input type="text" id="dateOfBirth" name="dateOfBirth" placeholder="01/01/1999" value={formData.dateOfBirth} onChange={handleChange} required /><br />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Giới tính</label><br />
                    <div className="gender-options">
                      <label>
                        <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required /> Nam
                      </label>
                      <label>
                        <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required /> Nữ
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label><br />
                    <input type="text" id="address" name="address" placeholder="D1,......" value={formData.address} onChange={handleChange} required /><br />
                  </div>
                </div>
                <div className="form-right">
                  <div className="form-group">
                    <label htmlFor="image">Chọn ảnh</label><br />
                    <div className="image-upload">
                      <div className="image-placeholder">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Selected" className="image-preview" />
                        ) : (
                          "IMG"
                        )}
                      </div>
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleImageChange}
                        required
                      /><br />
                    </div>
                  </div>
                </div>
              </div>
              <div className='button'>
                <button type="submit" id="submit-btn" disabled={!isFormValid()}>
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CustomerForm;

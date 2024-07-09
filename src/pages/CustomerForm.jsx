import React, { useState, useEffect } from 'react';
import '../css/customerform.css';
import { useLocation } from 'react-router-dom';

function CustomerForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const phoneFromQuery = queryParams.get('phone');
    if (phoneFromQuery) {
      setPhone(phoneFromQuery);
    }
  }, [location.search]);

  const [formData, setFormData] = useState({
    name: '',
    phone: phone,
    dob: '',
    gender: '',
    address: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    } else {
      setImagePreview(null);
      setFormData({ ...formData, image: null });
    }
  };

  const isFormValid = () => {
    const { name, phone, dob, gender, address, image } = formData;
    return name && phone && dob && gender && address && image;
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
            <form action="/submit-form" method="post" encType="multipart/form-data">
              <h2>Điền thông tin khách hàng</h2>
              <div className="form-content">
                <div className="form-left">
                  <div className="form-group">
                    <label htmlFor="name">Ba/Mẹ</label><br />
                    <input type="text" id="name" name="name" placeholder="Nguyễn A" value={formData.name} onChange={handleChange} required /><br />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label><br />
                    <input type="tel" id="phone" name="phone" placeholder="0123456789" value={formData.phone} onChange={handleChange} required /><br />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Ngày sinh</label><br />
                    <input type="text" id="dob" name="dob" placeholder="01/01/1999" value={formData.dob} onChange={handleChange} required /><br />
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
                        id="image"
                        name="image"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleImageChange}
                        required
                      /><br />
                    </div>
                  </div>
                </div>
              </div>
              <div className='button'>
                <button type="submit" id="submit-btn" disabled>
                  <a class href="/">Xác nhận</a>
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

import React, { useState } from 'react';
import '../css/customerform.css';

function CustomerForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
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
                <input type="text" id="name" name="name" placeholder="Nguyễn A" required /><br />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label><br />
                <input type="tel" id="phone" name="phone" placeholder="0123456789" required /><br />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Ngày sinh</label><br />
                <input type="text" id="dob" name="dob" placeholder="01/01/1999" required /><br />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Giới tính</label><br />
                <div className="gender-options">
                  <label>
                    <input type="radio" id="male" name="gender" value="male" required /> Nam
                  </label>
                  <label>
                    <input type="radio" id="female" name="gender" value="female" required /> Nữ
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label><br />
                <input type="text" id="address" name="address" placeholder="D1,......" required /><br />
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
                <p>Dung lượng file tối đa 1MB<br />Định dạng: JPEG, PNG</p>
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
  );
}

export default CustomerForm;

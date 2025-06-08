import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css'; // ✅ Import the custom CSS

const countryCityMap = {
  India: ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
  USA: ['New York', 'Chicago', 'San Francisco', 'Los Angeles', 'Houston'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
  France: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
};


function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
  const newErrors = {};
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharRegex = /^\d{12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
  if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
  if (!formData.username.trim()) newErrors.username = 'Username is required';
  if (!emailRegex.test(formData.email)) newErrors.email = 'Enter valid email';
  if (!formData.password) newErrors.password = 'Password is required';
  if (!formData.phoneCode) newErrors.phoneCode = 'Country code required';
  if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter valid 10-digit phone number';
  if (!formData.country) newErrors.country = 'Country required';
  if (!formData.city) newErrors.city = 'City required';
  if (!panRegex.test(formData.pan)) newErrors.pan = 'Enter valid PAN (e.g., ABCDE1234F)';
  if (!aadharRegex.test(formData.aadhar)) newErrors.aadhar = 'Enter valid 12-digit Aadhar number';

  setErrors(newErrors);
  setIsFormValid(Object.keys(newErrors).length === 0);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/success', { state: { formData } });
    }
  };

  return (
    <div className="form-container">
      <h2>🌐 Registration Form</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-grid">
          <div>
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div>
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div>
            <label>Username</label>
            <input name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div>
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="toggle">
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

  <div className="form-group">
  <label>Phone Number</label>
  <div className="phone-group">
    <input
      type="text"
      name="phoneCode"
      value={formData.phoneCode}
      onChange={handleChange}
      placeholder="+91"
    />
    <input
      type="text"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      placeholder="1234567890"
    />
  </div>
  {errors.phoneCode && <p className="error">{errors.phoneCode}</p>}
  {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
</div>




          <div>
            <label>Country</label>
            <select name="country" value={formData.country} onChange={(e) => {
              handleChange(e);
              setFormData(prev => ({ ...prev, city: '' })); // reset city when country changes
            }}>
            <option value="">Select Country</option>
            {Object.keys(countryCityMap).map((country) => (
            <option key={country} value={country}>{country}</option>
            ))}
            </select>

            {errors.country && <p className="error">{errors.country}</p>}
          </div>

          <div>
            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
            <option value="">Select City</option>
            {formData.country && countryCityMap[formData.country].map((city) => (
            <option key={city} value={city}>{city}</option>
            ))}
            </select>

          </div>

          <div>
            <label>PAN No.</label>
            <input name="pan" value={formData.pan} onChange={handleChange} />
            {errors.pan && <p className="error">{errors.pan}</p>}
          </div>

          <div>
            <label>Aadhar No.</label>
            <input name="aadhar" value={formData.aadhar} onChange={handleChange} />
            {errors.aadhar && <p className="error">{errors.aadhar}</p>}
          </div>
        </div>

        <button type="submit" disabled={!isFormValid} className="submit-btn">
          🚀 Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;

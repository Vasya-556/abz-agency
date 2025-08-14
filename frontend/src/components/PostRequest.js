import React, {useState, useEffect} from 'react'
import API_BASE from '../utils/api';
import successImage from '../assets/svgs/success-image.svg';
import './PostRequest.css';

function PostRequest({ onSuccess }) {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
    position_id: null,
    token: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    position_id: "",
    result: ""
  });
  const [showSuccessImage, setShowSuccessImage] = useState(false);

  const allFields = formData.name && !formErrors.name &&
      formData.email && !formErrors.email &&
      formData.phone && !formErrors.phone &&
      formData.photo && !formErrors.photo &&
      formData.position_id && formData.token && !formErrors.result;
  const buttonClass = allFields ? "button": "button-gray";

  const fetch_token = async () => {
    try {
      const res = await fetch(`${API_BASE}/token`);
      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        token: data.token
      }));
    } catch (error) {
      console.error("Error fetching token: ", error);
    }
  }

  const fetch_position = async () => {
    try {
      const res = await fetch(`${API_BASE}/positions`);
      const data = await res.json();
      setPositions(data.positions);
    } catch (error) {
      console.error("Error fetching positions: ", error);
    }
  }
  useEffect(() => {
    fetch_position();
    fetch_token();
  }, [])

  const resetFormFields = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      photo: null,
      position_id: null,
      token: formData.token,
    });

    setFormErrors({
      name: "",
      email: "",
      phone: "",
      photo: "",
      position_id: "",
      result: ""
    });
  }

  const handleSubmit = async (e, retry = 0) => {
    e.preventDefault();

    if (retry > 1) {
      setFormErrors(prev => ({
        ...prev,
        result: "Failed to submit for unkown reasons. Please refresh the page and try again."
      }));
      return;
    }

    if (
      !(allFields)
    ){
      return;
    }
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("position_id", formData.position_id);
      submitData.append("photo", formData.photo);

      const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
          Token: formData.token, 
        },
        body: submitData,
      });

      const result = await response.json();
      if (response.ok){
        onSuccess();
        setShowSuccessImage(true);
        resetFormFields();
      }
      else {
        console.log(result);
        if (result.message === "User with this phone or email already exist"){
          setFormErrors(prev => ({
            ...prev,
            email: result.message,
            phone: result.message
          }))
          return
        }
        else if (result.message === "Validation failed" && result.fails){
          const newErrors = {
            name: result.fails.name?.[0] || "",
            email: result.fails.email?.[0] || "",
            phone: result.fails.phone?.[0] || "",
            photo: result.fails.photo?.[0] || "",
            position_id: result.fails.position_id?.[0] || "",
          };
          setFormErrors((prev) => ({
            ...prev,
            ...newErrors,
          }));
          return
        } else if (result.message === "The token expired."){
          await fetch_token();
          handleSubmit(e);
          return;
        }
        setFormErrors(prev => ({
          ...prev,
          result: result.message
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: value
    }))

    let error = "";
    if (!value){
      error = "Username is required";
    } 
    else if (value.length < 2) {
      error = "Username should contain at lest 2 characters";
    }
    else if (value.length > 60) {
      error = "Username should contain at most 60 characters";
    }

    setFormErrors(prev => ({
      ...prev,
      name: error,
      result: ""
    }))
  }

  const handleEmailChange = (e) => {
    const value = e.target.value.trim().toLowerCase();;

    setFormData(prev => ({
      ...prev,
      email: value
    }))

    let error = "";
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!value){
      error = "Email is required";
    } 
    else if (!regex.test(value)) {
      error = "Invalid email";
    }

    setFormErrors(prev => ({
      ...prev,
      email: error,
      result: ""
    }))
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      phone: value
    }))

    let error = "";
    const regex = /^\+380\d*$/;
    if (!value){
      error = "Phone number is required";
    }
    else if (!value.startsWith("+380")){
      error = "Phone number should start with +380";
    }
    else if (!regex.test(value)){
      error = "Phone number must contain only digits after +380";
    }
    else if (value.length !== 13){
      error = "Phone number should contain 9 digits after +380";
    }
    
    setFormErrors(prev => ({
      ...prev,
      phone: error,
      result: ""
    }));
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    setFormData(prev => ({
      ...prev,
      photo: file || null
    }));

    let error = "";

    if (!file) {
      error = "Photo is required";
    }

    const validTypes = ['image/jpeg', 'image/jpg'];
    const maxSizeMB = 5;

    if (file && !validTypes.includes(file.type)) {
      error = "Photo must be a JPEG or JPG file";
    }

    if (file && file.size > maxSizeMB * 1024 * 1024) {
      error = "Photo must be smaller than 5MB";
    }

    if (file && !error) {
      try {
        const dimensionError = await new Promise((resolve) => {
          const img = new Image();
          const objectUrl = URL.createObjectURL(file);

          img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            if (img.width < 70 || img.height < 70) {
              resolve("Photo dimensions must be at least 70x70 pixels.");
            } else {
              resolve("");
            }
          };

          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve("Could not read the image.");
          };

          img.src = objectUrl;
        });

        if (dimensionError) {
          error = dimensionError;
        }
      } catch (err) {
        error = "Unexpected error while validating image.";
      }
    }

    setFormErrors(prev => ({
      ...prev,
      photo: error,
      result: ""
    }));
  };

  const changeRole = (id) => {
    setFormData(prev => ({
      ...prev,
      position_id: id
    }));
    setFormErrors(prev => ({
      ...prev,
      position_id: ""
    }))
  }

  return (
    <div className="post-request">
        {showSuccessImage? 
          <div className="post-request-header">
            <h1 className="text-large">User successfully registered</h1>
            <img 
              src={successImage}
              alt="Success image"
              ></img> 
          </div>
          :
          <form className="post-request-form" onSubmit={handleSubmit}>
            
            <div className="post-request-header">
              <h1 className="text-large">Working with POST request</h1>
              {formErrors.result && <p className="error-header">{formErrors.result}</p>}
            </div>
            <div className="post-request-container">
              <div className="name-email-phone-inputs">
                <div className="field-group">
                  <input 
                    className="input" 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleNameChange}  
                  />
                  {formErrors.name && <p className="error">{formErrors.name}</p>}
                </div>

                <div className="field-group">
                  <input 
                    className="input" 
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}  
                  />
                  {formErrors.email && <p className="error">{formErrors.email}</p>}
                </div>

                <div className="field-group">  
                  <input 
                    className="input" 
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}  
                  />
                  <p className={formErrors.phone ? "error" : "helper"}>
                    {formErrors.phone || "+38 (XXX) XXX - XX - XX"}
                  </p>
                </div>
              </div>
              <div className="position-photo-inputs">
                <div className="field-group">
                  <p>Select your position</p>
                  <div className="post-request-radio-buttons">
                    {
                      positions.map((p) => (
                        <div key={p.id} className="radio-group">
                            <input onChange={() => changeRole(p.id)} id={p.name} type="radio" name="role"></input>
                            <label htmlFor={p.name}>{p.name}</label>
                        </div>
                      ))
                    }
                  </div>
                  {formErrors.position_id && <p className="error">{formErrors.position_id}</p>}
                </div>

                <div className="field-group-photo">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/jpeg,image/jpg"
                    onChange={handlePhotoChange}
                    className="file-input"
                  />
                  <div className="custom-file-container">
                    <label htmlFor="file-upload" className="upload-button">Upload</label>
                    <span className="file-name">{formData.photo ? formData.photo.name : 'Upload your photo'}</span>
                  </div>
                  {formErrors.photo && <p className="error">{formErrors.photo}</p>}
                </div>
              </div>              
            </div>
            <div className="post-request-button">
              <button className={buttonClass}>Sign up</button>
            </div>
          </form>
        }
    </div>
  )
}

export default PostRequest
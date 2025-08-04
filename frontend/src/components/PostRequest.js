import React, {useState, useEffect} from 'react'
import API_BASE from '../utils/api';
import successImage from '../assets/success-image.svg';

function PostRequest({ onSuccess }) {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
    positionId: null,
    token: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    result: ""
  });
  const [showSuccessImage, setShowSuccessImage] = useState(false);

  const allFields = formData.name && !formErrors.name &&
      formData.email && !formErrors.email &&
      formData.phone && !formErrors.phone &&
      formData.photo && !formErrors.photo &&
      formData.positionId && formData.token && !formErrors.result;
  const buttonClass = allFields ? "button": "button-gray";

  useEffect(() => {
    fetch(`${API_BASE}/positions`)
      .then((res) => {
          return res.json();
      })
      .then((data) => {
          setPositions(data.positions);
      })
    
    fetch(`${API_BASE}/token`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFormData(prev => ({
          ...prev,
          token: data.token
        }));
      })
  }, [])

  const resetFormFields = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      photo: null,
      positionId: null,
      token: "",
    });

    setFormErrors({
      name: "",
      email: "",
      phone: "",
      photo: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      submitData.append("position_id", formData.positionId);
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
        // alert("user not created" + result.message);
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
      positionId: id
    }));
  }

  return (
    <div className="PostRequest">
        {showSuccessImage? 
          <div>
            <h1>User successfully registered</h1>
            <img 
              src={successImage}
              alt=""
              ></img> 
          </div>
          :
          <form onSubmit={handleSubmit}>
            
            <div className="PostRequest-header">
              <h1>Working with post request</h1>
              {formErrors.result && <p className="Error-header">{formErrors.result}</p>}
            </div>
            <div className="PostRequest-container">
              <div className="field-group">
                <input 
                  className="input" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleNameChange}  
                />
                {formErrors.name && <p className="Error">{formErrors.name}</p>}
              </div>

              <div className="field-group">
                <input 
                  className="input" 
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}  
                />
                {formErrors.email && <p className="Error">{formErrors.email}</p>}
              </div>

              <div className="field-group">  
                <input 
                  className="input" 
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}  
                />
                <p className={formErrors.phone ? "Error" : "Helper"}>
                  {formErrors.phone || "+38 (XXX) XXX - XX - XX"}
                </p>
              </div>
              
              <div className="field-group">
                <div className="PostReguest-radioButtons">
                  {
                    positions.map((p) => (
                      <div key={p.id} className="radio-group">
                          <input onChange={() => changeRole(p.id)} id={p.name} type="radio" name="role"></input>
                          <label htmlFor={p.name}>{p.name}</label>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="field-group">
                <input onChange={handlePhotoChange} className="input-file" type="file"></input>
                {formErrors.photo && <p className="Error">{formErrors.photo}</p>}
              </div>
              
            </div>
            <div className="PostRequest-button">
              <button onClick={handleSubmit} className={buttonClass}>Sign up</button>
            </div>
          </form>
        }
    </div>
  )
}

export default PostRequest
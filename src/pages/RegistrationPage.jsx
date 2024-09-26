import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../redux/state";
import "../../public/registrationStyle.css";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

function AccountPage() {
  const [isActive, setIsActive] = useState(false);
  const [err, setErr] = useState(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsActive(true);
    setErr(null);
  };

  const handleLoginClick = () => {
    setIsActive(false);
    setErr(null);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    //(event.target.value);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleLogin(user, token, wishList) {
    dispatch(setLogin({ user: user, token: token, wishList: wishList }));
    navigate(-1);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const endpoint = isActive ? "/signup" : "/login";
    try {
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        formData
      ); // Ensure to use backticks here
      //("Server response:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      if(response.status === 201){
        handleLogin(response.data.user, response.data.token, response.data.wishList);
        toast.success('Registration Successfull');
      } else if(response.status === 200){
        handleLogin(response.data.user, response.data.token, response.data.wishList);
        toast.success('Signed in')
      }
        setErr(null);
    } catch (error) {
      if(error.response.status === 409){
        toast.error('This user is already registered')
      }
      else{
        setErr(error.response.data.message);
      }
    }
  }

  return (
    <div className={`AccountPage ${isActive ? "active" : ""}`}>
      <div className="inner-container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Password"
              value={formData.password}
              required
            />
            <button type="submit" id="signUp">
              Sign Up
            </button>
            {err && <h2 className="mb-2 text-sm text-red-600 my-3">{err}</h2>}
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {err && <h2 className="mb-2 text-sm text-red-600">{err}</h2>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>
                Register with your personal details to use all of the site's
                features
              </p>
              <button onClick={handleLoginClick} id="login">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to use all of the site's features
                
              </p>
              <button onClick={handleRegisterClick} id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;

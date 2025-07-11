import React, { useContext, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { ApiContext } from "../../context/ApiContext.jsx";

const auth = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await api.post("/auth/sign-up", formData);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("Sign-up failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred during sign-up."
      );
    }
  };

  return (
    <div className="sign-up-page px-1 d-flex justify-content-center flex-column align-items-center">
      <Link
        to="/"
        className="logo justify-content-center mt-5 text-decoration-none text-white fs-1 mb-4 "
      >
        <BsChatDots className="" />
        <h1 className=" ps-1 mb-0 ">Talk</h1>
        {loading && (
          <div
            className="spinner-border text-primary ms-2"
            role="status"
            style={{ width: "1.5rem", height: "1.5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </Link>

      <div className="d-flex justify-content-center flex-column align-items-center border rounded-3 py-2">
        <h3 className=" w-75 text-white">Sign up</h3>

        {error && (
          <div className="alert alert-danger w-75" role="alert">
            {error}
          </div>
        )}

        <form
          action=""
          onSubmit={handleSubmit}
          className="login-form d-flex justify-content-center flex-column align-items-center gap-3 mt-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className=" border-0 border-bottom  border-white px-2 pb-1"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
            className=" border-0 border-bottom  border-white px-2 pb-1"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="border-0 border-bottom  border-white px-2 pb-1"
            required
          />

          <button
            type="submit"
            className="px-4 pb-1 mb-4 mt-4 fw-bolder border-0 bg-warning rounded text-white"
          >
            Create an account
          </button>
        </form>

        <p className=" bg-transparent text-white">
          Already have an account?{" "}
          {
            <Link to="/login" className=" fw-bold">
              Login
            </Link>
          }
        </p>
      </div>
    </div>
  );
};

export default auth;

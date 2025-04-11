import React, { useEffect, useState } from "react";
import { UserInterface } from "../../interface/user";

import axiosInstance from "../../services/apiInterceptor";
import { useNavigate } from "react-router-dom";
import Logo from "../pages/logo";
import styles from "./Register.module.css";

const RegisterUser = () => {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInterface>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
  };
  useEffect(() => {
    if (submit) {
      const registerUser = async () => {
        try {
          console.log("Request payload:", user);

          const res = await axiosInstance.post(`/auth/register/`, user);
          console.log(res);
          localStorage.setItem("refresh", res.data.refresh);
          localStorage.setItem("access", res.data.access);
          navigate("/verify-email");
        } catch (error) {
          console.error(error);
        } finally {
          setSubmit(false);
        }
      };
      registerUser();
    }
  }, [user, submit]);
  return (
    <form
      onSubmit={handleSubmit}
      className={`container ${styles.form_container}`}
    >
      <div className="d-flex justify-content-center">
        <Logo />
      </div>

      <div className={` p-2 m-3 ${styles.form}`}>
        <h2 className="text-center">Register</h2>
        <div className="form-group p-3">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            className="form-control p-3"
            placeholder="e.g jane doe"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control p-3"
            placeholder="e.g you@example.com"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control p-3"
            placeholder="Enter password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label htmlFor="password2">Password</label>
          <input
            type="password"
            className="form-control p-3"
            placeholder="Enter password"
            name="password2"
            id="password2"
            value={user.password2}
            onChange={handleChange}
          />
        </div>
        <button className={`btn m-3 p-3 w-full ${styles.button}`}>
          Register
        </button>
        <p className="p-3">
          Already have an account! <a href="/login">Login</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterUser;

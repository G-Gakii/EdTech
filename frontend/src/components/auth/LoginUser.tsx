import React, { useState } from "react";
import { LoginUserInterface } from "../../interface/user";

import axiosInstance from "../../services/apiInterceptor";
import { useNavigate } from "react-router-dom";
import Logo from "../pages/logo";
import styles from "./LoginUser.module.css";

const LoginUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<LoginUserInterface>({
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/auth/login/`, user);
      console.log(res);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("access", res.data.access);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`container ${styles.form_container}`}
    >
      <div className="d-flex justify-content-center">
        <Logo />
      </div>

      <div className={` p-2 m-3 ${styles.form}`}>
        <h2 className="text-center">Login</h2>
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
        <div className="form-group ">
          <button type="submit" className={`btn m-3 p-3 ${styles.button}`}>
            logIn
          </button>
          <p className="px-3">
            Forgot password <a href="/reset-password">reset password</a>{" "}
          </p>

          <p className="p-3">
            Don't have an account! <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginUser;

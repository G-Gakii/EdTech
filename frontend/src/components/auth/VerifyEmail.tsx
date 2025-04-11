import React, { useState } from "react";
import axiosInstance from "../../services/apiInterceptor";
import { useNavigate } from "react-router-dom";
import Logo from "../pages/logo";
import styles from "./VeifyEmail.module.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({ otp: "" });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/verify-otp/", otp);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const ResendOtp = async () => {
    try {
      const res = await axiosInstance.post("/auth/resend-otp/");
      console.log(res);
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
      <h2 className="px-3">Verification code</h2>
      <div className="form-group p-3 fs-3">
        <label htmlFor="otp">
          Please enter verification code we have sent to your email
        </label>
        <input
          type="text"
          className="form-control p-3"
          placeholder="e.g 567890"
          name="otp"
          id="otp"
          value={otp.otp}
          onChange={(e) => {
            setOtp((current) => ({ ...current, otp: e.target.value }));
          }}
        />
      </div>
      <div className="d-flex">
        <button className={`btn m-3 p-3 ${styles.button}`} type="submit">
          Verify
        </button>
        <button
          className={`btn m-3 p-3 ${styles.button}`}
          type="button"
          onClick={ResendOtp}
        >
          Resend Code
        </button>
      </div>
      <p className="p-3">
        Back to <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default VerifyEmail;

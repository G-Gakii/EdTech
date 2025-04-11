import { useState } from "react";
import axiosInstance from "../../services/apiInterceptor";
import Logo from "../pages/logo";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [password, setPassword] = useState({ password: "" });

  const resetPassword = async () => {
    try {
      const res = await axiosInstance.post("/auth/reset-password/", password);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={resetPassword}
      className={`container ${styles.form_container}`}
    >
      <div className="d-flex justify-content-center">
        <Logo />
      </div>
      <h2 className="px-3 pt-3 text-center">Reset Password</h2>
      <div className="form-group p-3 pt-2 ">
        <label htmlFor="password" className="fs-5">
          New Password
        </label>
        <input
          type="password"
          className="form-control p-3"
          placeholder="Enter new Password"
          name="password"
          id="password"
          value={password.password}
          onChange={(e) => {
            setPassword((current) => ({
              ...current,
              password: e.target.value,
            }));
          }}
        />
      </div>
      <button className={`btn m-3 p-3 ${styles.button}`} type="submit">
        Reset Password
      </button>
      <p className="p-3">
        Back to <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default ResetPassword;

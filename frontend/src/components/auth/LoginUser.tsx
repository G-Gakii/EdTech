import React, { useEffect, useState } from "react";
import { LoginUserInterface } from "../../interface/user";
import axios from "axios";

const LoginUser = () => {
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState<LoginUserInterface>({
    username: "",
    password: "",
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
      const login = async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login/`,
            user
          );
          console.log(res);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmit(false);
        }
      };
      login();
    }
  }, [submit]);
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username1"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password3"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button>Signin</button>
    </form>
  );
};

export default LoginUser;

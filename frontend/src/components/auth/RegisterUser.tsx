import React, { useEffect, useState } from "react";
import { UserInterface } from "../../interface/user";
import axios from "axios";

const RegisterUser = () => {
  const [submit, setSubmit] = useState(false);

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
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register/`,
            user
          );
          console.log(res);
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
    <form onSubmit={handleSubmit}>
      <h1>Register Form</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Confirm password</label>
        <input
          type="password"
          name="password2"
          id="password2"
          value={user.password2}
          onChange={handleChange}
        />
      </div>
      <button>Register</button>
    </form>
  );
};

export default RegisterUser;

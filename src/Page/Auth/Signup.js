import React, { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import sign from "../../Assets/Images/sign.png";
import { useEffect, useState } from "react";

const Signup = () => {
  const [name, setFName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const signupSubmit = async () => {
    console.log(name, phone, email, password);
    let result = await fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({ name, phone, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
    navigate("/");
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.number().positive().integer().min(10).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(12).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="authpage">
      <div className="authcont">
        <form className="authform" onSubmit={handleSubmit(signupSubmit)}>
          <img src={sign} alt="signup here" />

          <div className="form-group-row">
            <div className="formgroup">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                {...register("name")}
                autoComplete="username"
              />
              <span>{errors.name?.message}</span>
            </div>
          </div>

          <div className="formgroup">
            <label htmlFor="phone">Phone /Mobile no.</label>
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              {...register("phone")}
            />
            {/* <span>{errors.phone?.message}</span>   */}
          </div>
          <div className="formgroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              {...register("email")}
              autoComplete="email"
            />
            <span>{errors.email?.message}</span>
          </div>

          <div className="form-group-row">
            <div className="formgroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                {...register("password")}
                autocomplete="current-password"
              />
              <span>{errors.password?.message}</span>
            </div>
          </div>
          <p
            className=""
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account?
          </p>
          <div className="formgroupp">
            <input type="submit" value="Signup" className="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

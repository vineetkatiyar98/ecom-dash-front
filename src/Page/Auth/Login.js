import React, { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "./Auth.css";
import sign from "../../Assets/Images/sign.png";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem("user")
    if (auth) {
      navigate("/")
    }
  })

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(12).required(),
  });

  const { register, handleSubmit , formState : {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.email) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="authpage">
      <div className="authcont">
        <form className="authform" onSubmit={handleSubmit(handleLogin)}>
          <img src={sign} alt="signup here" />
          <div className="formgroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }} {...register("email")}password
              autocomplete="email"
            />
                      <span>{errors.email?.message}</span>  

          </div>
          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }} {...register("password")}
              autocomplete="current-password"
            />
            <span>{errors.password?.message}</span>  
          </div>
          <input className="submit" value="Login" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;

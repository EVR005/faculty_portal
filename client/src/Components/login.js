import React, { Component, useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [verified, setVerified] = useState(false);
  const emailref = useRef();
  const passwordref = useRef();
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const login1 = () => {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    if (email == "admin@gmail.com" && password == "admin") {
      navigate("/adminHome");
      return;
    }
    //10.16.49.58:5000
    axios
      .post("https://audistfis.onrender.com/api/faculty/facultyLogin", {
        mail: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          Cookies.remove("accessToken");
          Cookies.set("accessToken", res.data.accessToken, {
            expires: 3600000,
          });
          Cookies.set("emp_id", res.data.emp_id, {
            expires: 3600000,
          });
          // console.log(res.data.accessToken)
          // console.log(document.cookie)
          // navigate("/dashboard")
          navigate("/dashboard");
        } else {
          window.alert("Error Loggin in");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row forms">
      <div className="col-lg-5 imgdiv">
        <img src="/images/Anna_University_Logosvg(White).png"></img>
      </div>
      <div className="col-lg-8 formdiv">
        <h2
          className=""
          style={{
            borderBottom: "4px solid #f2f2f2",
            marginBottom: "15px",
            paddingBottom: "10px",
          }}
        >
          <strong
            style={{
              color: "#4e2a84",
              fontWeight: "800",
              borderBottom: "8px solid #4e2a84",
              paddingBottom: "09px",
            }}
          >
            Faculty{" "}
          </strong>
          Web Portal
        </h2>
        <form>
          <div className="form-group mb-3 mt-1">
            <label>Email ID : </label>
            <input
              ref={emailref}
              required
              type="text"
              class="form-control"
              name="mail"
              id="uname"
              placeholder="Enter username"
            />
          </div>
          <div class="form-group">
            <label>Password : </label>
            <input
              ref={passwordref}
              required
              type="password"
              class="form-control"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          {/* <ReCAPTCHA
            className='my-3'
              sitekey={"6Lde2MEkAAAAAMtPZq2iOMKdhOy1eiiRet57bS5h"}
              onChange={onChange}
              disabled={!verified}
            /> */}
          <button
            type="button"
            onClick={login1}
            class=" loginbtn btn btn-primary"
          >
            Login
          </button>
          <button type="button" class="forgotpwd btn btn-secondary">
            forgot password
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;

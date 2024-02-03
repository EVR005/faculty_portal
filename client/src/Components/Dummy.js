import React, { Component, useEffect, useState, useRef } from "react";

import axios from "axios";
import Cookies from "js-cookie";

const Dummy = () => {
  const [verified, setVerified] = useState(false);
  const emailref = useRef();
  const passwordref = useRef();
  const login1 = () => {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    axios
      .post(
        "https://audistfis.onrender.com/api/faculty/dummy",
        {
          mail: email,
          password: password,
          accessToken: Cookies.get("accessToken"),
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setVerified(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {verified === true ? (
        <p>Successful Verification</p>
      ) : (
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
        </form>
      )}
    </div>
  );
};
export default Dummy;

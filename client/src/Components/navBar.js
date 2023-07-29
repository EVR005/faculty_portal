import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const deleteAllCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  };
  return (
    <div>
      <nav
        className="navbar"
        style={{ background: "#4e2a84", color: "white", height: "80px" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            style={{
              color: "white",
              position: "relative",
              top: "-13px",
              left: "8px",
              fontSize: "40px",
              fontWeight: "700",
              fontStyle: "italic",
            }}
            href=""
          >
            myDist
          </a>
          <div>
            <p
              className="d-flex justify-content-end"
              style={{ fontSize: "18px" }}
            >
              <strong>
                Welcome {props.title}.{props.fname}
              </strong>
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontSize: "18px" }}
            >
              Faculty ID: {props.fac_id}{" "}
            </p>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg minibar"
        style={{ background: "#f2f2f2" }}
      >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link
              style={{ fontWeight: "700", color: "black", fontSize: "18px" }}
              className="nav-link"
              href="#"
              to="/dashboard"
            >
              My Dashboard
            </Link>
            <Link
              style={{ fontWeight: "700", color: "black", fontSize: "18px" }}
              className="nav-link"
              href="#"
              to="/clientPublications"
            >
              Publications
            </Link>
            <Link
              style={{ fontWeight: "700", color: "black", fontSize: "18px" }}
              className="nav-link"
              href="#"
              to="/profBody"
            >
              Professional Body
            </Link>
            <Link
              style={{ fontWeight: "700", color: "black", fontSize: "18px" }}
              className="nav-link"
              href="#"
              to="/honours"
            >
              Honours
            </Link>
          </div>
          <div className="ms-auto">
            <p className="fs-6" style={{ color: "red", fontWeight: "500" }}>
              <span class="material-symbols-outlined">
                &nbsp;
                <Link
                  href="#usersettings"
                  onClick={() => {
                    deleteAllCookies();
                    localStorage.clear();
                  }}
                  to="/"
                  style={{
                    position: "relative",
                    top: "10px",
                    textDecortion: "none",
                  }}
                >
                  logout
                </Link>
              </span>
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

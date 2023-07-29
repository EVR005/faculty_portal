import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
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

          <div></div>
          <div className="ms-auto">
            <p style={{ color: "white", fontWeight: "800", fontSize: "30px" }}>
              Welcome Admin &nbsp;&nbsp;
              <span class="material-symbols-outlined">
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

export default AdminNavbar;

import React, { useEffect, useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import { TbLetterH } from "react-icons/tb";
import { GiCrossedSlashes, GiNetworkBars, GiDna1 } from "react-icons/gi";
import { RiPlayList2Line } from "react-icons/ri";
import NavBar from "./navBar";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/timeLine.css";
import "../styles/dashboard.css";

const DashBoard = () => {
  var data_arr = [];
  let experiences = [];
  let qualifications = [];
  let awards = [];
  let alerts = [];
  let citations = [];
  var da = 5;
  const [dataValues, setVals] = useState([]);
  // const [qualifications, setQualifications] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/faculty/dashboardDetails", {
        params: {
          accessToken: Cookies.get("accessToken"),
          emp_id: Cookies.get("emp_id"),
        },
      })
      .then((data) => {
        setVals(data.data);
        console.log(data.data);
        localStorage.setItem(
          "qualifications",
          JSON.stringify(data.data.qualifications)
        );
        localStorage.setItem(
          "fac_name",
          JSON.stringify(data.data.facultyDetails.first_name)
        );
        localStorage.setItem(
          "fac_title",
          JSON.stringify(data.data.facultyDetails.title)
        );
        // localStorage.setitem(
        //   "emp_id",
        //   JSON.stringify(data.data.facultyDetails.emp_id)
        // );
        localStorage.setItem(
          "experiences",
          JSON.stringify(data.data.experiences)
        );
        localStorage.setItem("alerts", JSON.stringify(data.data.alerts));
        localStorage.setItem("citations", JSON.stringify(data.data.citations));
        localStorage.setItem("awards", JSON.stringify(data.data.honours));
        // data_arr = data.data
      })
      .catch((err) => console.log(err));
  }, []);

  // experiences = dataValues.facultyDetails
  //   ? dataValues.facultyDetails.experiences
  //   : [];

  let qualifications_0 = localStorage.getItem("qualifications");
  // let qualifications;

  if (qualifications_0 === undefined) {
    qualifications = [];
  } else {
    try {
      qualifications = JSON.parse(qualifications_0);
    } catch (error) {
      console.error("Error parsing qualifications from localStorage", error);
      qualifications = [];
    }
  }

  let awards_0 = localStorage.getItem("awards");
  // let qualifications;

  if (awards_0 === undefined) {
    qualifications = [];
  } else {
    try {
      awards = JSON.parse(awards_0);
    } catch (error) {
      console.error("Error parsing awards from localStorage", error);
      awards = [];
    }
  }

  // experiences =
  //   localStorage.getItem("experiences") === undefined
  //     ? []
  //     : JSON.parse(localStorage.getItem("experiences"));
  let experiences_0 = localStorage.getItem("experiences");
  // let qualifications;

  if (experiences_0 === undefined) {
    experiences = [];
  } else {
    try {
      experiences = JSON.parse(experiences_0);
    } catch (error) {
      console.error("Error parsing qualifications from localStorage", error);
      experiences = [];
    }
  }

  let alerts_0 = localStorage.getItem("alerts");
  // let qualifications;

  if (alerts_0 === undefined) {
    alerts = [];
  } else {
    try {
      alerts = JSON.parse(alerts_0);
    } catch (error) {
      console.error("Error parsing qualifications from localStorage", error);
      alerts = [];
    }
  }

  let citations_0 = localStorage.getItem("citations");
  // let qualifications;

  if (citations_0 === undefined) {
    citations = [];
  } else {
    try {
      citations = JSON.parse(citations_0);
    } catch (error) {
      console.error("Error parsing qualifications from localStorage", error);
      citations = [];
    }
  }

  // qualifications = JSON.parse(localStorage.getItem("qualifications"));
  // setQualifications(
  //   dataValues.facultyDetails ? dataValues.facultyDetails.qualifications : []
  // );
  console.log(dataValues);
  return (
    <div>
      <NavBar
        title={
          dataValues.facultyDetails ? dataValues.facultyDetails.title : "Mr"
        }
        fname={
          dataValues.facultyDetails ? dataValues.facultyDetails.first_name : ""
        }
        fac_id={
          dataValues.facultyDetails ? dataValues.facultyDetails.emp_id : ""
        }
      />
      {/* {console.log(JSON.stringify(dataValues))} */}
      <div className="row mt-4">
        <div
          className="col-sm-12  col-lg-3 mb-5"
          style={{ background: "white" }}
        >
          <div className="card mb-4">
            <div className="card-body text-center" style={{ padding: "0px" }}>
              <img
                src={
                  dataValues.facultyDetails
                    ? dataValues.facultyDetails.photo
                    : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                alt="avatar"
                className="rounded-circle img-fluid mt-2"
                style={{ width: "150px", height: "150px" }}
              />
              <h5
                className="my-1"
                style={{ color: "#4e2a84", fontWeight: "700" }}
              >
                {dataValues.facultyDetails
                  ? dataValues.facultyDetails.title
                  : ""}
                .
                {dataValues.facultyDetails
                  ? dataValues.facultyDetails.first_name
                  : ""}
                {/* {dataValues["email_id"]} */}
              </h5>
              <p
                className="mb-1"
                style={{ fontWeight: "500", fontSize: "18px" }}
              >
                {dataValues.facultyDetails
                  ? dataValues.facultyDetails.description
                  : ""}
              </p>
              <p className="mb-1" style={{ fontWeight: "400" }}>
                Faculty ID:{" "}
                {dataValues.facultyDetails
                  ? dataValues.facultyDetails.emp_id
                  : ""}
              </p>
              <p className="mb-1" style={{ fontWeight: "400" }}>
                Mobile No:{" "}
                {dataValues.facultyDetails
                  ? dataValues.facultyDetails.mobile_no
                  : ""}
              </p>
              <p className="mb-4" style={{ fontWeight: "400" }}>
                Email ID:{" "}
                {dataValues.facultyDetails
                  ? dataValues.facultyDetails.email_id
                  : ""}
              </p>
              <div className="d-flex justify-content-center mb-2">
                <button
                  type="button"
                  className="btn btn-outline-primary ms-1"
                  style={{ borderRadius: "15px" }}
                >
                  <Link to="/edit">Edit Profile</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-10  col-lg-4">
          <h4>
            <strong
              style={{
                color: "#4e2a84",
                fontWeight: "800",
                borderBottom: "5px solid #4e2a84",
                paddingBottom: "12px",
              }}
            >
              My
            </strong>{" "}
            Qualification
          </h4>
          <div className="timeline">
            {/* {console.log(qualifications)} */}
            {qualifications &&
              qualifications.map((val) => (
                <div className="entry">
                  <div className="title">
                    <h3>{val["class_year"]}</h3>
                  </div>
                  <div className="body">
                    <p>{val["degree"]}</p>
                    <p>
                      {val["college"]}
                      <br></br>
                      {val["university"]}
                    </p>
                  </div>
                </div>
              ))}
            {/* <div className="entry">
              <div className="title">
                <h3>2009 - Present</h3>
              </div>
              <div className="body">
                <p>Teaching Fellow</p>
                <p>
                  Department of Information Science and Technology,Anna
                  University
                </p>
              </div>
            </div>
            <div className="entry">
              <div className="title">
                <h3>2007 - 2009</h3>
              </div>
              <div className="body">
                <p>Lecturer</p>
                <p>
                  Department of Information Science and Technology, Easwari
                  College
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-sm-10  col-lg-4">
          <h4>
            <strong
              style={{
                color: "#4e2a84",
                fontWeight: "800",
                borderBottom: "5px solid #4e2a84",
                paddingBottom: "12px",
              }}
            >
              My
            </strong>{" "}
            Experience
          </h4>
          <div className="timeline">
            {experiences &&
              experiences.map((val) => {
                return (
                  <div className="entry">
                    <div className="title">
                      <h3>
                        {val["exp_from"].substring(0, 4)} -{" "}
                        {val["exp_to"].substring(0, 4)}
                      </h3>
                    </div>
                    <div className="body">
                      <p>{val["nature_of_appointment"]}</p>
                      <p>{val["exp_college"]}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="col-sm-10  col-lg-3 bottomalert"
          style={{ width: "340px" }}
        >
          <h4>
            <strong
              style={{
                color: "#4e2a84",
                fontWeight: "800",
                borderBottom: "5px solid #4e2a84",
                paddingBottom: "12px",
              }}
            >
              My
            </strong>{" "}
            Alerts
          </h4>
          {/* <ul>
            <li>Best Teacher Award</li>
            <li>Best Teacher Award</li>
            <li>Best Teacher Award</li>
            <li>Best Teacher Award</li>
            <li>Best Teacher Award</li>
          </ul> */}
          <ul>
            {alerts &&
              alerts.map((val) => {
                return <li>alert : {val.alert_content}</li>;
              })}
          </ul>
        </div>
        <div className="col-sm-10   col-lg-5 bottom">
          <h4>
            <strong
              style={{
                color: "#4e2a84",
                fontWeight: "800",
                borderBottom: "5px solid #4e2a84",
                paddingBottom: "12px",
              }}
            >
              My
            </strong>{" "}
            Citations
          </h4>
          <div className="row">
            <div className="col-sm-3">
              <FaQuoteLeft
                style={{
                  fontWeight: 500,
                  background: "rgb(26, 148, 155)",
                  color: "white",
                  padding: "7px",
                  borderRadius: "12px",
                  fontSize: "32px",
                }}
              />
              &nbsp;
              {dataValues.citations ? dataValues.citations.citation_1 : ""}
              <br></br>&nbsp;&nbsp;Citations
            </div>
            <div className="col-sm-3">
              <TbLetterH
                style={{
                  fontWeight: 500,
                  background: "black",
                  color: "white",
                  padding: "7px",
                  borderRadius: "12px",
                  fontSize: "32px",
                }}
              />{" "}
              &nbsp;{dataValues.citations ? dataValues.citations.h_index : ""}
              <br></br> H-index
            </div>
            <div className="col-sm-3">
              <GiDna1
                style={{
                  fontWeight: 500,
                  background: "orange",
                  color: "white",
                  padding: "7px",
                  borderRadius: "12px",
                  fontSize: "32px",
                }}
              />
              &nbsp;{" "}
              {dataValues.citations ? dataValues.citations.citation_2 : ""}
              <br></br> citations
            </div>
          </div>

          <div className="row gs">
            <h5>Google Scholar</h5>
            <div className="col-sm-3">
              <div className="row">
                <h4>
                  <FaQuoteLeft
                    style={{
                      fontWeight: 500,
                      background: "rgb(26, 148, 155)",
                      color: "white",
                      padding: "7px",
                      borderRadius: "12px",
                      fontSize: "32px",
                    }}
                  />{" "}
                  Citation
                </h4>
                <div className="col-sm-6">
                  {dataValues.citations ? dataValues.citations.gs_citation : ""}{" "}
                  Total
                </div>
                {/* <div className="col-sm-6">15 (2018)</div> */}
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row">
                <h4>
                  <GiNetworkBars
                    style={{
                      fontWeight: 500,
                      background: "rgb(26, 148, 155)",
                      color: "white",
                      padding: "7px",
                      borderRadius: "12px",
                      fontSize: "32px",
                    }}
                  />
                  H-index
                </h4>
                <div className="col-sm-6">
                  {dataValues.citations ? dataValues.citations.gs_h_index : ""}{" "}
                  Total
                </div>
                {/* <div className="col-sm-6"> (2018)</div> */}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="row">
                <h4>
                  {" "}
                  <RiPlayList2Line
                    style={{
                      fontWeight: 500,
                      background: "rgb(26, 148, 155)",
                      color: "white",
                      padding: "7px",
                      borderRadius: "12px",
                      fontSize: "32px",
                    }}
                  />{" "}
                  I-10 index
                </h4>
                <div className="col-sm-6">
                  {dataValues.citations
                    ? dataValues.citations.gs_i10_index
                    : ""}
                  <br></br> Total
                </div>
                {/* <div className="col-sm-6">0 (2018)</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-10   col-lg-4 bottom">
          <h4>
            <strong
              style={{
                color: "#4e2a84",
                fontWeight: "800",
                borderBottom: "5px solid #4e2a84",
                paddingBottom: "12px",
              }}
            >
              My
            </strong>{" "}
            Honours and Awards
          </h4>
          <div>
            <div className="timeline">
              {awards &&
                awards.map((val) => {
                  return (
                    <div className="entry">
                      <div className="title">
                        <h3>{val["year"]}</h3>
                      </div>
                      <div className="body">
                        <p>{val["award_title"]}</p>
                        <p>{val["awarder"]}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;

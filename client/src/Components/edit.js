import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import ImageUploading from "react-images-uploading";
import moment from "moment";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import NavBar from "./navBar";
import "../styles/edit.css";
import { useForm, useController, Controller } from "react-hook-form";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Edit = () => {
  // const [dataValues, setDataValues] = useState();
  const [dataValues, setVals] = useState([]);
  const [LocalStorageUpdated, setLocalStorageUpdated] = useState(false);
  // let dataValues = [];
  const navigate = useNavigate();
  // const loc = useLocation();
  //   dataValues = loc.state.dataValues;

  const {
    register: register1,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    data["qualifications"] = JSON.parse(localStorage.getItem("qualifications"));
    data["experiences"] = JSON.parse(localStorage.getItem("experiences"));
    data["emp_id"] = Cookies.get("emp_id") ? Cookies.get("emp_id") : "";
    console.log(data);
    axios
      .post("http://localhost:5000/api/faculty/updateDetails", {
        dataValues: data,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("submitted!!!");
          localStorage.removeItem("qualifications");
          localStorage.removeItem("experiences");
          navigate("/dashboard");
        } else {
          console.log("Error Occured");
        }
      })
      .catch((err) => console.log(err));
    // await axios.post("http://localhost:5000/api/books", data);
    // reset();
    console.log(data);
  };

  //recently added may 8 2023
  useEffect(() => {
    // const loc = useLocation();
    // setDataValues(loc.state.dataValues);
    // dataValues = loc.state.dataValues;
    let q = [],
      e = [];
    axios
      .get("http://localhost:5000/api/faculty/dashboardDetails", {
        params: {
          accessToken: Cookies.get("accessToken"),
          emp_id: Cookies.get("emp_id"),
        },
      })
      .then(async (data) => {
        console.log(data.data);
        await setVals(data.data);
        console.log(dataValues);
        setValue(
          "title",
          data.data.facultyDetails ? data.data.facultyDetails.title : ""
        );
        setValue(
          "fname",
          data.data.facultyDetails ? data.data.facultyDetails.first_name : ""
        );
        setValue(
          "mname",
          data.data.facultyDetails ? data.data.facultyDetails.middle_name : ""
        );
        setValue(
          "lname",
          data.data.facultyDetails ? data.data.facultyDetails.last_name : ""
        );
        setValue(
          "description",
          data.data.facultyDetails ? data.data.facultyDetails.description : ""
        );
        setValue(
          "gender",
          data.data.facultyDetails ? data.data.facultyDetails.gender : ""
        );
        setValue(
          "dob",
          data.data.facultyDetails ? data.data.facultyDetails.dob : ""
        );
        setValue(
          "age",
          data.data.facultyDetails ? data.data.facultyDetails.age : ""
        );
        setValue(
          "aadhar",
          data.data.facultyDetails ? data.data.facultyDetails.aadhar : ""
        );
        setValue(
          "pan",
          data.data.facultyDetails ? data.data.facultyDetails.pancard : ""
        );
        setValue(
          "present_address",
          data.data.facultyDetails
            ? data.data.facultyDetails.present_address
            : ""
        );
        setValue(
          "permanent_address",
          data.data.facultyDetails
            ? data.data.facultyDetails.permanent_address
            : ""
        );
        setValue(
          "mobile_no",
          data.data.facultyDetails ? data.data.facultyDetails.mobile_no : ""
        );
        setValue(
          "email",
          data.data.facultyDetails ? data.data.facultyDetails.email_id : ""
        );
        setValue(
          "orcid",
          data.data.facultyDetails ? data.data.facultyDetails.orcid_id : ""
        );
        setValue(
          "googlescholar",
          data.data.facultyDetails
            ? data.data.facultyDetails.google_scholar_id
            : ""
        );
        setValue(
          "scopus",
          data.data.facultyDetails ? data.data.facultyDetails.scopus_id : ""
        );
        setValue(
          "irins",
          data.data.facultyDetails ? data.data.facultyDetails.irins_id : ""
        );
        setValue(
          "passport",
          data.data.facultyDetails ? data.data.facultyDetails.passport_no : ""
        );
        //setValue("title", data.data.facultyDetails.title);
        // setValue("fname", data.data.facultyDetails.first_name);
        // setValue("mname", data.data.facultyDetails.middle_name);
        // setValue("lname", data.data.facultyDetails.last_name);
        // setValue("description", data.data.facultyDetails.description);
        // setValue("emp_id", data.data.facultyDetails.emp_id);
        // setValue("gender", data.data.facultyDetails.gender);
        // setValue("title", data.data.facultyDetails.title);
        // setValue("dob", data.data.facultyDetails.dob);
        // setValue("age", data.data.facultyDetails.age);
        // setValue("aadhar", data.data.facultyDetails.aadhar);
        // setValue("pan", data.data.facultyDetails.pancard);
        // setValue("presentaddress", data.data.facultyDetails.present_address);
        // setValue(
        //   "permanentaddress",
        //   data.data.facultyDetails.permanent_address
        // );
        // setValue("mobile_no", data.data.facultyDetails.mobile_no);
        // setValue("email", data.data.facultyDetails.email_id);
        // setValue("orcid", data.data.facultyDetails.orcid_id);
        // setValue("googlescholar", data.data.facultyDetails.google_scholar_id);
        // setValue("scopus", data.data.facultyDetails.scopus_id);
        // setValue("irins", data.data.facultyDetails.irins_id);
        // setValue("passport", data.data.facultyDetails.passport_no);
        // setValue("qualifications", data.data.qualifications);
        // //console.log(data.data);
        localStorage.setItem(
          "qualifications",
          JSON.stringify(data.data.qualifications)
        );
        localStorage.setItem(
          "experiences",
          JSON.stringify(data.data.experiences)
        );
        // setLocalStorageUpdated((updated) => !updated);
        // localStorage.setItem("experiences", JSON.stringify(data.data.facultyDetails.experiences));

        // console.log(
        //   dataValues.facultyDetails
        //     ? dataValues.facultyDetails.qualifications
        //     : []
        // );
      });
    // q = dataValues["qualifications"] ? dataValues["qualifications"] : [];
    // e = dataValues["experiences"] ? dataValues["experiences"] : [];
    // localStorage.removeItem("qualifications");
    // localStorage.removeItem("experiences");
    // localStorage.setItem("qualifications", JSON.stringify(q));
    // localStorage.setItem("experiences", JSON.stringify(e));
    // setLocalStorageUpdated((updated) => !updated);
  }, []);

  const {
    register: register2,
    formState: { errors: errors2 },
    control: control2,
    getValues: getQualificationValues,
    setValue: setQualificationValue,
    handleSubmit: handleSubmit2,
  } = useForm();

  const {
    register: register3,
    formState: { errors: errors3 },
    control: control3,
    getValues: getExperienceValues,
    setValue: setExperienceValue,
    handleSubmit: handleSubmit3,
  } = useForm();

  let qualifications = [];
  let experiences = [];

  let title = useRef("");
  let first_name = useRef("");
  let middle_name = useRef("");
  let last_name = useRef("");
  let emp_id = useRef("");
  let faculty_description = useRef("");
  let gender = useRef("");
  // let dob = useRef("");
  let age_input = useRef("");
  let aadhar = useRef("");
  let pan = useRef("");
  let present_address = useRef("");
  let permanent_address = useRef("");
  let mobile_no = useRef("");
  let email = useRef("");
  let passport_no = useRef("");
  let social_category = useRef("");

  let degree = useRef("");
  let college = useRef("");
  let university = useRef("");
  let percentage = useRef("");
  let class_year = useRef("");

  let exp_college = useRef("");
  let exp_description = useRef("");
  let exp_from = useRef("");
  let exp_to = useRef("");
  let nature_of_appointment = useRef("");
  let exp_years = useRef("");

  let currentEditQualification = useRef("");
  let currentEditExperience = useRef("");

  // console.log("hi");
  const [age, setAge] = useState("");
  const gender_options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "transgender", label: "Transgender" },
  ];

  const onDateChange = (date) => {
    let age_val = moment().diff(date, "years");
    setValue("age", age_val);
  };

  // console.log("hi");

  const social_options = [
    { value: "scst", label: "SC/ST" },
    { value: "bc", label: "BC" },
    { value: "obc", label: "OBC" },
    { value: "mbc", label: "MBC" },
  ];

  const nature_of_appointment_options = [
    { value: "contract", label: "Contract" },
    { value: "regular", label: "Regular" },
  ];

  const degree_options = [
    { value: "be", label: "B.E" },
    { value: "btech", label: "B.Tech" },
    { value: "me", label: "M.E" },
    { value: "mtech", label: "M.Tech" },
  ];

  const addQualification = () => {
    if (currentEditQualification.current.innerText.length > 0) {
      qualifications = JSON.parse(localStorage.getItem("qualifications"));
      // qualifications = getValues("qualification");
      let index = parseInt(currentEditQualification.current.innerText[8]) - 1;
      if (getQualificationValues("degree").length === 0)
        setQualificationValue("degree", qualifications[index]["degree"]);
      if (getQualificationValues("college").length === 0)
        setQualificationValue("college", qualifications[index]["college"]);
      if (getQualificationValues("university").length === 0)
        setQualificationValue(
          "university",
          qualifications[index]["university"]
        );
      if (getQualificationValues("percentage").length === 0)
        setQualificationValue(
          "percentage",
          qualifications[index]["percentage"]
        );
      if (getQualificationValues("class_year").length === 0)
        setQualificationValue(
          "class_year",
          qualifications[index]["class_year"]
        );
      qualifications[index] = {
        degree: getQualificationValues("degree"),
        college: getQualificationValues("college"),
        university: getQualificationValues("university"),
        percentage: getQualificationValues("percentage"),
        class_year: getQualificationValues("class_year"),
      };
      localStorage.setItem("qualifications", JSON.stringify(qualifications));
      currentEditQualification.current.innerText = "";
    } else {
      if (localStorage.getItem("qualifications"))
        qualifications = JSON.parse(localStorage.getItem("qualifications"));
      qualifications.push({
        degree: getQualificationValues("degree"),
        college: getQualificationValues("college"),
        university: getQualificationValues("university"),
        percentage: getQualificationValues("percentage"),
        class_year: getQualificationValues("class_year"),
      });
      localStorage.setItem("qualifications", JSON.stringify(qualifications));
    }
    setQualificationValue("degree", "");
    setQualificationValue("college", "");
    setQualificationValue("university", "");
    setQualificationValue("percentage", "");
    setQualificationValue("class_year", "");
    setLocalStorageUpdated((updated) => !updated);
  };

  const addExperience = () => {
    if (currentEditExperience.current.innerText.length > 0) {
      experiences = JSON.parse(localStorage.getItem("experiences"));
      let index = parseInt(currentEditExperience.current.innerText[8]) - 1;
      if (getExperienceValues("exp_college").length === 0)
        setExperienceValue("exp_college", experiences[index]["exp_college"]);
      if (getExperienceValues("exp_description").length === 0)
        setExperienceValue(
          "exp_description",
          experiences[index]["exp_description"]
        );
      if (getExperienceValues("exp_from").length === 0)
        setExperienceValue("exp_from", experiences[index]["exp_from"]);
      if (getExperienceValues("exp_to").length === 0)
        setExperienceValue("exp_to", experiences[index]["exp_to"]);
      if (getExperienceValues("nature_of_appointment").length === 0)
        setExperienceValue(
          "nature_of_appointment",
          experiences[index]["nature_of_appointment"]
        );
      if (getExperienceValues("exp_years").length === 0)
        setExperienceValue("exp_years", experiences[index]["exp_years"]);
      experiences[index] = {
        exp_college: getExperienceValues("exp_college"),
        exp_description: getExperienceValues("exp_description"),
        exp_from: getExperienceValues("exp_from"),
        exp_to: getExperienceValues("exp_to"),
        nature_of_appointment: getExperienceValues("nature_of_appointment"),
        exp_years: getExperienceValues("exp_years"),
      };
      currentEditExperience.current.innerText = "";
    } else {
      if (localStorage.getItem("experiences"))
        experiences = JSON.parse(localStorage.getItem("experiences"));
      experiences.push({
        exp_college: getExperienceValues("exp_college"),
        exp_description: getExperienceValues("exp_description"),
        exp_from: getExperienceValues("exp_from"),
        exp_to: getExperienceValues("exp_to"),
        nature_of_appointment: getExperienceValues("nature_of_appointment"),
        exp_years: getExperienceValues("exp_years"),
      });
    }
    console.log(experiences);
    localStorage.setItem("experiences", JSON.stringify(experiences));
    setExperienceValue("exp_college", "");
    setExperienceValue("exp_description", "");
    setExperienceValue("exp_from", "");
    setExperienceValue("exp_to", "");
    setExperienceValue("nature_of_appointment", "");
    setExperienceValue("exp_years", "");
    setLocalStorageUpdated((updated) => !updated);
  };

  const [image, setImage] = useState("");
  // const maxNumber = 1;

  const onChangeImage = (image_upload) => {
    setImage(image_upload);
  };

  const handleDeleteQualifications = (e) => {
    qualifications = JSON.parse(localStorage.getItem("qualifications"));
    qualifications.splice(
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "qualification_key"
      ),
      1
    );
    currentEditQualification.current.innerText = "";
    setLocalStorageUpdated((updated) => !updated);
    localStorage.setItem("qualifications", JSON.stringify(qualifications));
  };

  const handleDeleteExperiences = (e) => {
    experiences = JSON.parse(localStorage.getItem("experiences"));
    experiences.splice(
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "experience_key"
      ),
      1
    );
    currentEditExperience.current.innerText = "";
    setLocalStorageUpdated((updated) => !updated);
    localStorage.setItem("experiences", JSON.stringify(experiences));
  };

  const updateQualification = (e) => {
    // qualifications = JSON.parse(localStorage.getItem("qualifications"));
    let index =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "qualification_key"
      );
    // console.log(e.target.parentElement.parentElement);
    currentEditQualification.current.innerHTML =
      "<div>Editing " + (parseInt(index) + 1) + "</div>";
    setQualificationValue("degree", qualifications[index]["degree"]);
    setQualificationValue("college", qualifications[index]["college"]);
    setQualificationValue("university", qualifications[index]["university"]);
    setQualificationValue("percentage", qualifications[index]["percentage"]);
    setQualificationValue("class_year", qualifications[index]["class_year"]);
  };

  const updateExperience = (e) => {
    // qualifications = JSON.parse(localStorage.getItem("qualifications"));
    // console.log(e.target);
    let index =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "experience_key"
      );
    currentEditExperience.current.innerHTML =
      "<div>Editing " + (parseInt(index) + 1) + "</div>";
    setExperienceValue("exp_college", experiences[index]["exp_college"]);
    setExperienceValue(
      "exp_description",
      experiences[index]["exp_description"]
    );
    setExperienceValue("exp_from", experiences[index]["exp_from"].toString());
    setExperienceValue("exp_to", experiences[index]["exp_to"].toString());
    setExperienceValue(
      "nature_of_appointment",
      experiences[index]["nature_of_appointment"]
    );
    setExperienceValue("exp_years", experiences[index]["exp_years"]);
  };

  // const sendDetails = (e) => {};

  // qualifications =
  //   localStorage.getItem("qualifications") === undefined
  //     ? []
  //     : JSON.parse(localStorage.getItem("qualifications"));
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

  const {
    field: { value: genderValue, onChange: genderOnChange, ...restGenderField },
  } = useController({ name: "gender", control });

  const {
    field: { value: socialValue, onChange: socialOnChange, ...restSocialField },
  } = useController({ name: "social_category", control });

  return (
    <div className="edit">
      <NavBar
        title={
          JSON.parse(localStorage.getItem("fac_title")) != ""
            ? JSON.parse(localStorage.getItem("fac_title"))
            : "Mr"
        }
        fname={
          JSON.parse(localStorage.getItem("fac_name")) != ""
            ? JSON.parse(localStorage.getItem("fac_name"))
            : ""
        }
        fac_id={Cookies.get("emp_id") ? Cookies.get("emp_id") : ""}
      />
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <form>
        <div className="row p-4">
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-2">
                <label className="cn fs-6">Title</label>
                <input
                  {...register1("title", {
                    // ////required: true,
                    // ////required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z\s]+$/i,
                  })}
                  // defaultValue={
                  //   dataValues.facultyDetails
                  //     ? dataValues.facultyDetails.title
                  //     : ""
                  // }
                  // key={
                  //   dataValues.facultyDetails
                  //     ? dataValues.facultyDetails.title
                  //     : ""
                  // }
                  style={{ border: errors1.title && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors1.title?.type === "required" && (
                  <p role="alert">Title is required</p>
                )}
                {errors1?.title?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
                {errors1?.title?.type === "maxLength" && (
                  <p>Title cannot exceed 20 characters</p>
                )} */}
              </div>
              <div className="col-md-4 m-0 bg-white">
                <label className="cn fs-6">First Name</label>
                <input
                  {...register1("fname", {
                    // ////required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z\s]+$/i,
                  })}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.first_name
                      : ""
                  }
                  // value="hello"
                  style={{ border: errors1.fname && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors.fname?.type === "required" && (
                  <p>First Name is required</p>
                )}
                {errors?.fname?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
                {errors?.fname?.type === "maxLength" && (
                  <p>First Name cannot exceed 20 characters</p>
                )} */}
              </div>
              <div className="col-md-3 m-0 bg-white">
                <label className="cn fs-6">Middle Name</label>
                <input
                  {...register1("mname", {
                    maxLength: 20,
                    pattern: /^[A-Za-z\s]+$/i,
                  })}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.middle_name
                      : ""
                  }
                  style={{ border: errors1.mname && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors?.mname?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
                {errors?.mname?.type === "maxLength" && (
                  <p>Middle Name cannot exceed 20 characters</p>
                )} */}
              </div>
              <div className="col-md-3 m-0 bg-white">
                <label className="cn fs-6">Last Name</label>
                <input
                  {...register1("lname", {
                    ////required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z\s]+$/i,
                  })}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.last_name
                      : ""
                  }
                  style={{ border: errors1.lname && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors.lname?.type === "required" && (
                  <p role="alert">Last Name is required</p>
                )}
                {errors?.lname?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
                {errors?.lname?.type === "maxLength" && (
                  <p>Last Name cannot exceed 20 characters</p>
                )} */}
              </div>
            </div>

            <div className="row pt-4">
              <div className="col-md-2">
                <label className="cn fs-6">Employee ID</label>
                <input
                  {...register1("eid", {
                    ////required: true,
                    maxLength: 10,
                    pattern: /^[0-9]+$/i,
                  })}
                  defaultValue={
                    Cookies.get("emp_id") ? Cookies.get("emp_id") : ""
                  }
                  disabled={true}
                  style={{ border: errors1.eid && " solid 2px red" }}
                  className="form-control bg-white"
                  type="text"
                ></input>
                {/* {errors.eid?.type === "required" && (
                  <p role="alert">Employee ID is required</p>
                )}
                {errors?.eid?.type === "pattern" && <p>Numbers only</p>}
                {errors?.eid?.type === "maxLength" && (
                  <p>Employee ID cannot exceed 10 characters</p>
                )} */}
              </div>
              <div className="col-md-8">
                <label className="cn fs-6">Description</label>
                <input
                  {...register1("description", {
                    pattern: /^[A-Za-z\s0-9]+$/i,
                  })}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.description
                      : ""
                  }
                  style={{ border: errors1.description && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors?.description?.type === "pattern" && (
                  <p>Alphanumeric characters only</p>
                )} */}
              </div>
              <div className="col-md-2">
                <label className="cn fs-6">Gender</label>
                <Select
                  {...register1("gender", {
                    ////required: true,
                  })}
                  className="gender fs-6"
                  style={{ border: errors1.gender && " solid 2px red" }}
                  placeholder="Select Gender"
                  isClearable
                  options={gender_options}
                  defaultValue={
                    genderValue
                      ? gender_options.find((x) => x.value === genderValue)
                      : genderValue
                  }
                  onChange={(option) =>
                    genderOnChange(option ? option.value : option)
                  }
                  {...restGenderField}
                />
                {/* {errors1.gender?.type === "required" && (
                  <p role="alert">Gender is required</p>
                )} */}
              </div>
            </div>

            <div className="row pt-4">
              <div className="col-md-2">
                <label className="cn fs-6">Date of Birth</label>
                {/* <DatePicker
                  {...register1("dob")}
                  onChange={(date) => {
                    let age_val = moment().diff(
                      date.format("MM/DD/YYYY"),
                      "years"
                    );
                    setValue("age", age_val);
                  }}
                  format={"DD/MM/YYYY"}
                /> */}
                <DatePicker
                  className="purple bg-dark fs-6"
                  {...register1("dob")}
                  style={{
                    height: "5.25vh",
                    width: "25vh",
                    borderRadius: "0.75vh",
                    padding: "0vh 4vh",
                  }}
                  // defaultValue={
                  //   dataValues.facultyDetails
                  //     ? dataValues.facultyDetails.dob
                  //     : ""
                  // }
                  format="DD/MM/YYYY"
                  onChange={(date) => {
                    setValue("dob", date.toString());
                    let age_val = moment().diff(
                      date.format("MM/DD/YYYY"),
                      "years"
                    );
                    setValue("age", age_val);
                  }}
                />
              </div>
              <div className="col-md-2">
                <label className="cn fs-6">Age</label>
                <input
                  style={{
                    backgroundColor: "white",
                  }}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.age
                      : ""
                  }
                  {...register1("age")}
                  className="form-control"
                  type="text"
                  disabled
                ></input>
              </div>
              <div className="col-md-4 m-0 bg-white">
                <label className="cn fs-6">Aadhar</label>
                <input
                  {...register1("aadhar", {
                    ////required: true,
                    maxLength: 12,
                    minLength: 12,
                    pattern: /^[0-9]+$/i,
                  })}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.aadhar
                      : ""
                  }
                  style={{ border: errors1.aadhar && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors.aadhar?.type === "required" && (
                  <p role="alert">Aadhar ID is required</p>
                )}
                {errors?.aadhar?.type === "pattern" && <p>Numbers only</p>}
                {errors?.aadhar?.type === "maxLength" && (
                  <p>Aadhar ID must be of 12 characters</p>
                )}
                {errors?.aadhar?.type === "minLength" && (
                  <p>Aadhar ID must be of 12 characters</p>
                )} */}
              </div>
              <div className="col-md-4 m-0 bg-white">
                <label className="cn fs-6">PAN</label>
                <input
                  {...register1("pan", {
                    ////required: true,
                    pattern: /^[0-9]+$/i,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  defaultValue={
                    dataValues.facultyDetails
                      ? dataValues.facultyDetails.pancard
                      : ""
                  }
                  style={{ border: errors1.pan && " solid 2px red" }}
                  className="form-control"
                  type="text"
                ></input>
                {/* {errors.pan?.type === "required" && (
                  <p role="alert">PAN No is required</p>
                )}
                {errors?.pan?.type === "pattern" && <p>Numbers only</p>}
                {errors?.pan?.type === "maxLength" && (
                  <p>PAN ID must be of 10 characters</p>
                )}
                {errors?.pan?.type === "minLength" && (
                  <p>PAN ID must be of 10 characters</p>
                )} */}
              </div>
            </div>
          </div>

          <div className="img_border col-md-2 border rounded fs-6">
            <ImageUploading
              value={image}
              onChange={onChangeImage}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageRemove }) => (
                // write your building UI
                <div className="Container upload__image-wrapper">
                  <div className="row">
                    <div className="img_label col-md-12 text-center text-light">
                      Image
                    </div>
                  </div>
                  <div
                    className="center_row row d-flex border p-2"
                    id="img_btn_border"
                  >
                    <div className="">
                      <button
                        className="edit_btn rounded"
                        onClick={onImageUpload}
                      >
                        {/* Click or Drop here */}
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                    <div className="mt-2">
                      <button
                        className="edit_btn rounded"
                        onClick={onImageRemove}
                      >
                        {/* Remove Image */}
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="row m-4">
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image["data_url"]} alt="" width="100" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>

        <div className="Container m-4 mt-0">
          <div className="row">
            <div className="col-md-3 m-0 bg-white">
              <label className="cn fs-6">Present Address</label>
              <input
                {...register1("present_address", {
                  pattern: /^[0-9a-zA-Z\s]+$/i,
                })}
                defaultValue={
                  dataValues.facultyDetails
                    ? dataValues.facultyDetails.present_address
                    : ""
                }
                style={{ border: errors1.present_address && " solid 2px red" }}
                className="form-control"
                type="text"
              ></input>
              {/* {errors?.presentaddress?.type === "pattern" && (
                <p>Alphanumeric Characters only!</p>
              )} */}
            </div>
            <div className="col-md-3 m-0 bg-white">
              <label className="cn fs-6">Permanent Address</label>
              <input
                {...register1("permanent_address", {
                  pattern: /^[0-9a-zA-Z\s]+$/i,
                })}
                defaultValue={
                  dataValues.facultyDetails
                    ? dataValues.facultyDetails.permanent_address
                    : ""
                }
                style={{
                  border: errors1.permanent_address && " solid 2px red",
                }}
                className="form-control"
                type="text"
              ></input>
              {/* {errors?.permanentaddress?.type === "pattern" && (
                <p>Alphanumeric Characters only!</p>
              )} */}
            </div>
            <div className="col-md-2">
              <label className="cn fs-6">Mobile No</label>
              <input
                {...register1("mobile_no", {
                  ////required: true,
                  maxLength: 10,
                  minLength: 10,
                  pattern: /^[0-9]+$/i,
                })}
                defaultValue={
                  dataValues.facultyDetails
                    ? dataValues.facultyDetails.mobile_no
                    : ""
                }
                style={{ border: errors1.mobile_no && " solid 2px red" }}
                className="form-control"
                type="text"
              ></input>
              {/* {errors.mobile?.type === "required" && (
                <p role="alert">Mobile No is required</p>
              )}
              {errors?.mobile?.type === "pattern" && <p>Numbers only</p>}
              {errors?.mobile?.type === "maxLength" && (
                <p>Mobile No must be of 10 characters</p>
              )}
              {errors?.mobile?.type === "minLength" && (
                <p>Mobile No must be of 10 characters</p>
              )} */}
            </div>
            <div className="col-md-4 m-0 bg-white">
              <label className="cn fs-6">email</label>
              <input
                {...register1("email", {
                  ////required: true,
                  pattern: /^[0-9a-z]+@gmail.com$/i,
                })}
                defaultValue={
                  dataValues.facultyDetails
                    ? dataValues.facultyDetails.email_id
                    : ""
                }
                style={{ border: errors1.email && " solid 2px red" }}
                className="form-control"
                type="text"
              ></input>
              {/* {errors.email?.type === "required" && (
                <p role="alert">Email is required</p>
              )}
              {errors?.email?.type === "pattern" && <p>Invalid email ID!</p>} */}
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-md-3 m-0 bg-white">
              <label className="cn fs-6">Passport No</label>
              <input
                {...register1("passport", {
                  pattern: /^[0-9a-zA-Z]+$/i,
                })}
                defaultValue={
                  dataValues.facultyDetails
                    ? dataValues.facultyDetails.passport_no
                    : ""
                }
                style={{ border: errors1.passport && " solid 2px red" }}
                className="form-control"
                type="text"
              ></input>
              {/* {errors?.passport?.type === "pattern" && (
                <p>Alphanumeric Characters only!</p>
              )} */}
            </div>
            <div className="col-md-2">
              <label className="cn fs-6">Social Category</label>
              <Select
                {...register1("social_category", {
                  ////required: true,
                })}
                style={{ border: errors1.social_category && " solid 2px red" }}
                className="social fs-6"
                placeholder="Select Category"
                isClearable
                options={social_options}
                defaultValue={
                  socialValue
                    ? social_options.find((x) => x.value === socialValue)
                    : socialValue
                }
                onChange={(option) =>
                  socialOnChange(option ? option.value : option)
                }
                {...restSocialField}
              />
              {/* {errors.social_category?.type === "required" && (
                <p role="alert">Social Category is required</p>
              )} */}
            </div>
          </div>
        </div>
      </form>

      <div className="Container pt-4 overflow-auto m-3">
        <div className="col-md-12">
          <label className="cn fs-6">Qualification</label>
          <table className="input_table table table-hover table-bordered col-md-12 fs-6">
            <thead>
              <tr>
                <th className="col-md-1">S.No</th>
                <th className="col-md-1">Degree</th>
                <th className="col-md-3">College</th>
                <th className="col-md-3">University</th>
                <th className="col-md-1">Percentage</th>
                <th className="col-md-1">Class</th>
                <th className="col-md-2">-</th>
              </tr>
            </thead>
            <tbody>
              {qualifications &&
                qualifications.map((val, i) => (
                  <tr className="rowss" key={i} qualification_key={i}>
                    <td>{i + 1}</td>
                    <td>{val["degree"]}</td>
                    <td>{val["college"]}</td>
                    <td>{val["university"]}</td>
                    <td>{val["percentage"]}</td>
                    <td>{val["class_year"]}</td>
                    <td>
                      <button
                        onClick={(e) => handleDeleteQualifications(e)}
                        className="btn btn-outline-light"
                        // type="submit"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                      <button
                        onClick={(e) => updateQualification(e)}
                        className="btn btn-outline-light ms-3"
                        // type="submit"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

            <tfoot>
              <tr>
                <td ref={currentEditQualification}></td>
                <td>
                  <input
                    {...register2("degree", {
                      ////required: true,
                      pattern: /^[A-Za-z.]+$/i,
                    })}
                    style={{ border: errors2.degree && " solid 2px red" }}
                    name="degree"
                    className="form-control"
                    type="text"
                  ></input>
                </td>
                <td>
                  <input
                    {...register2("college", {
                      //required: true,
                      pattern: /^[A-Za-z\s]+$/i,
                    })}
                    style={{ border: errors2.college && " solid 2px red" }}
                    name="college"
                    className="form-control"
                    type="text"
                  ></input>
                </td>
                <td>
                  <input
                    {...register2("university", {
                      //required: true,
                      pattern: /^[A-Za-z\s]+$/i,
                    })}
                    style={{ border: errors2.university && " solid 2px red" }}
                    name="university"
                    className="form-control"
                    type="text"
                  ></input>
                </td>
                <td>
                  <input
                    {...register2("percentage", {
                      //required: true,
                      pattern: /^[0-9]+$/i,
                    })}
                    style={{ border: errors2.percentage && " solid 2px red" }}
                    name="percentage"
                    className="form-control"
                    type="text"
                  ></input>
                </td>
                <td>
                  <DatePicker
                    onlyYearPicker
                    className="purple bg-dark"
                    {...register2("class_year", {
                      //required: true,
                    })}
                    minDate="1800"
                    style={{
                      border: errors2.class_year && " solid 2px red",
                      backgroundColor: "aliceblue",
                      height: "5.25vh",
                      width: "15vh",
                      borderRadius: "0.75vh",
                      padding: "0vh 4vh",
                    }}
                    onChange={(date) => {
                      setQualificationValue("class_year", date.format("YYYY"));
                    }}
                  />
                </td>
                <td className="d-flex overflow-auto">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleSubmit2(addQualification)}
                    type="submit"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="Container pt-4 overflow-auto m-3">
        <div className="col-md-12">
          <label className="cn fs-6">Experience</label>
          <table className="input_table table table-bordered col-md-12 fs-6">
            <thead>
              <tr>
                <th className="col-md-1">S.No</th>
                <th className="col-md-3">College</th>
                <th className="col-md-2">Description</th>
                <th className="col-md-1">From</th>
                <th className="col-md-1">To</th>
                <th className="col-md-1">Nature of Appointment</th>
                <th className="col-md-1">Experience</th>
                <th className="col-md-2">-</th>
              </tr>
            </thead>
            <tbody>
              {experiences &&
                experiences.map((val, i) => (
                  <tr key={i} experience_key={i}>
                    <td>{i + 1}</td>
                    <td>{val["exp_college"]}</td>
                    <td>{val["exp_description"]}</td>
                    <td>{val["exp_from"].substring(0, 4)}</td>
                    <td>{val["exp_to"].substring(0, 4)}</td>
                    <td>{val["nature_of_appointment"]}</td>
                    <td>{val["exp_years"]}</td>
                    <td>
                      <button
                        onClick={(e) => handleDeleteExperiences(e)}
                        className="btn btn-outline-light"
                        // type="submit"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                      <button
                        onClick={(e) => updateExperience(e)}
                        className="btn btn-outline-light ms-3"
                        // type="submit"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

            <tfoot>
              <tr>
                <td ref={currentEditExperience}></td>
                <td>
                  <input
                    {...register3("exp_college", {
                      //required: true,
                      pattern: /^[A-Za-z\s]+$/i,
                    })}
                    style={{ border: errors3.exp_college && " solid 2px red" }}
                    className="form-control"
                    type="text"
                  ></input>
                </td>
                <td>
                  <input
                    {...register3("exp_description", {
                      //required: true,
                      pattern: /^[A-Za-z\s]+$/i,
                    })}
                    style={{
                      border: errors3.exp_description && " solid 2px red",
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </td>
                <td>
                  <DatePicker
                    onlyYearPicker
                    className="purple bg-dark"
                    {...register3("exp_from", {
                      //required: true,
                    })}
                    minDate="1800"
                    style={{
                      border: errors3.exp_from && " solid 2px red",
                      backgroundColor: "aliceblue",
                      height: "5.25vh",
                      width: "15vh",
                      borderRadius: "0.75vh",
                      padding: "0vh 4vh",
                    }}
                    onChange={(date) => {
                      setExperienceValue("exp_from", date.format("YYYY"));
                      if (getExperienceValues("exp_to")) {
                        var a = moment(getExperienceValues("exp_from"));
                        var b = moment(getExperienceValues("exp_to"));
                        if (a > b) {
                          let years_diff = 0;
                          setExperienceValue("exp_years", years_diff);
                        } else {
                          let years_diff = b.diff(a, "years");
                          setExperienceValue("exp_years", years_diff);
                        }
                      }
                    }}
                  />
                </td>
                <td>
                  <DatePicker
                    onlyYearPicker
                    className="purple bg-dark"
                    {...register3("exp_to", {
                      //required: true,
                    })}
                    minDate="1800"
                    style={{
                      border: errors3.exp_to && " solid 2px red",
                      backgroundColor: "aliceblue",
                      height: "5.25vh",
                      width: "15vh",
                      borderRadius: "0.75vh",
                      padding: "0vh 4vh",
                    }}
                    onChange={(date) => {
                      setExperienceValue("exp_to", date.format("YYYY"));
                      if (getExperienceValues("exp_from")) {
                        var a = moment(getExperienceValues("exp_from"));
                        var b = moment(getExperienceValues("exp_to"));
                        if (a > b) {
                          let years_diff = 0;
                          setExperienceValue("exp_years", years_diff);
                        } else {
                          let years_diff = b.diff(a, "years");
                          setExperienceValue("exp_years", years_diff);
                        }
                      }
                    }}
                  />
                </td>
                <td>
                  <input
                    {...register3("nature_of_appointment", {
                      ////required: true,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                    style={{
                      border: errors3.nature_of_appointment && " solid 2px red",
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                  {/* <Select
                    // className="form-control"
                    ref={nature_of_appointment}

                    options={nature_of_appointment_options}
                  ></Select> */}
                </td>
                <td>
                  <input
                    {...register3("exp_years", {
                      ////required: true,
                    })}
                    style={{
                      border: errors3.exp_years && " solid 2px red",
                      backgroundColor: "white",
                    }}
                    className="form-control"
                    type="text"
                    disabled
                  ></input>
                </td>
                <td className="d-flex overflow-auto">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleSubmit3(addExperience)}
                    type="submit"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="Container m-4 mt-0">
        {/* <form> */}
        <div className="row">
          <div className="col-md-3 m-0 bg-white">
            <label className="cn fs-6">Orcid's ID</label>
            <input
              {...register1("orcid", {
                pattern: /^[0-9a-zA-Z]+$/i,
              })}
              defaultValue={
                dataValues.facultyDetails
                  ? dataValues.facultyDetails.orcid_id
                  : ""
              }
              style={{ border: errors1.orcid && " solid 2px red" }}
              className="form-control"
              type="text"
            ></input>
            {/* {errors?.orcid?.type === "pattern" && (
              <p>Alphanumeric Characters only!</p>
            )} */}
          </div>
          <div className="col-md-3 m-0 bg-white">
            <label className="cn fs-6">Scopus ID</label>
            <input
              {...register1("scopus", {
                pattern: /^[0-9a-zA-Z]+$/i,
              })}
              defaultValue={
                dataValues.facultyDetails
                  ? dataValues.facultyDetails.scopus_id
                  : ""
              }
              style={{ border: errors1.scopus && " solid 2px red" }}
              className="form-control"
              type="text"
            ></input>
            {/* {errors?.scopus?.type === "pattern" && (
              <p>Alphanumeric Characters only!</p>
            )} */}
          </div>
          <div className="col-md-3 m-0 bg-white">
            <label className="cn fs-6">Google Scholar ID</label>
            <input
              {...register1("googlescholar", {
                pattern: /^[0-9a-zA-Z]+$/i,
              })}
              defaultValue={
                dataValues.facultyDetails
                  ? dataValues.facultyDetails.google_scholar_id
                  : ""
              }
              style={{ border: errors1.googlescholar && " solid 2px red" }}
              className="form-control"
              type="text"
            ></input>
            {/* {errors?.googlescholar?.type === "pattern" && (
              <p>Alphanumeric Characters only!</p>
            )} */}
          </div>
          <div className="col-md-3 m-0 bg-white">
            <label className="cn fs-6">IRINS ID</label>
            <input
              {...register1("irins", {
                pattern: /^[0-9a-zA-Z]+$/i,
              })}
              defaultValue={
                dataValues.facultyDetails
                  ? dataValues.facultyDetails.irins_id
                  : ""
              }
              style={{ border: errors1.irins && " solid 2px red" }}
              className="form-control"
              type="text"
            ></input>
            {/* {errors?.irins?.type === "pattern" && (
              <p>Alphanumeric Characters only!</p>
            )} */}
          </div>
        </div>
        {/* </form> */}
      </div>

      <div className="Container mr-4 mt-0">
        <div className=" center_row row">
          <div className="col-md-3">
            <button
              onClick={handleSubmit(onSubmit)}
              // onClick={(e) => sendDetails(e)}
              className="edit_btn btn ml-4 col-md-12"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Edit;

/* <DatePicker
                  className="bg-warning"
                  value={start_year}
                  onChange={(date) => setStartYear(date)}
                  //dateFormat="y"
                /> */

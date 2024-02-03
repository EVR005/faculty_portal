import React, { useRef, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "../styles/viewalerts.css";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import NavBar from "./navBar";
import Cookies from "js-cookie";

const Honours = () => {
  const [dataValues, setData] = useState([]);
  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();
  useEffect(() => {
    axios
      .get("https://audistfis.onrender.com/api/faculty/getAward", {
        params: { emp_id: Cookies.get("emp_id") },
      })
      .then((data) => {
        setData(data.data);
        console.log(data);
      });
  }, []);

  const data = {
    columns: [
      {
        label: "award_title",
        field: "award_title",
        sort: "asc",
        width: 150,
      },
      {
        label: "year",
        field: "year",
        sort: "asc",
        width: 500,
      },
      {
        label: "awarder",
        field: "awarder",
        sort: "asc",
        width: 500,
      },
    ],
    rows: dataValues ? dataValues : [],
  };

  const addAward = async (data) => {
    console.log(data);
    await axios.post(
      "https://audistfis.onrender.com/api/faculty/addAward",
      { data },
      { params: { emp_id: Cookies.get("emp_id") } }
    );
    let x = dataValues;
    x.push(data);
    setData(x);
  };

  return (
    <div>
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
      ></NavBar>
      <div className="Container pt-4 overflow-auto m-3">
        <div className="col-md-12">
          <table className="input_table table table-hover table-bordered fs-6">
            <tr>
              <td className="field col-md-4">
                <input
                  {...register("award_title", {
                    required: true,
                    pattern: /^[a-zA-Z0-9\s]+$/i,
                  })}
                  style={{ border: errors1.award_title && " solid 2px red" }}
                  name="award_title"
                  placeholder="Award Title"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-2">
                <input
                  {...register("year", {
                    required: true,
                    pattern: /^[0-9]+$/i,
                    maxLength: 4,
                    minLength: 4,
                  })}
                  style={{ border: errors1.year && " solid 2px red" }}
                  name="year"
                  placeholder="Year"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-4">
                <input
                  {...register("awarder", {
                    required: true,
                    pattern: /^[a-zA-Z0-9\s]+$/i,
                  })}
                  style={{ border: errors1.awarder && " solid 2px red" }}
                  name="awarder"
                  placeholder="Awarder"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-2">
                <button
                  className="submit btn btn-outline-light col-md-12"
                  onClick={handleSubmit(addAward)}
                  type="submit"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </td>
            </tr>
          </table>
          <MDBDataTable striped bordered small data={data} />
        </div>
      </div>
    </div>
  );
};

export default Honours;

import React, { useRef, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "../styles/viewalerts.css";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import NavBar from "./navBar";
import Cookies from "js-cookie";
const ViewProfBody = () => {
  const [dataValues, setData] = useState([]);

  const data = {
    columns: [
      {
        label: "title",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Subtitle",
        field: "subtitle",
        sort: "asc",
        width: 500,
      },
    ],
    rows: dataValues ? dataValues : [],
  };
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
      .get("https://audistfis.onrender.com/api/faculty/getProfBody", {
        params: {
          accessToken: Cookies.get("accessToken"),
          emp_id: Cookies.get("emp_id"),
        },
      })
      .then((res) => {
        console.log("hiiii");
        console.log(res.data);
        if (res.data && Object.keys(res.data).length > 0) {
          console.log(res.data);
          let temp = res.data;
          let tempdata = [];
          for (let i = 0; i < JSON.parse(temp.title).length; i++) {
            let x = {};
            x["title"] = JSON.parse(temp.title)[i];
            x["subtitle"] = JSON.parse(temp.subtitle)[i];
            tempdata.push(x);
          }
          console.log(tempdata);
          setData(tempdata);
          console.log(dataValues);
        }
        //   console.log(res);
      });
  }, []);

  const scrapdetails = () => {
    axios
      .get("https://audistfis.onrender.com/api/faculty/scrapProfBody", {
        params: {
          accessToken: Cookies.get("accessToken"),
          emp_id: Cookies.get("emp_id"),
        },
      })
      .then((res) => {
        let temp = res.data[0],
          tempdata = [];
        for (let i = 0; i < JSON.parse(res.data.title).length; i++) {
          let x = {};
          x["title"] = JSON.parse(res.data.title)[i];
          x["subtitle"] = JSON.parse(res.data.subtitle)[i];
          tempdata.push(x);
        }
        setData(tempdata);
      });
  };

  const addProfBody = async (data) => {
    console.log(data);
    await axios
      .post("https://audistfis.onrender.com/api/faculty/addProfBody", {
        title: data["title"],
        subtitle: data["subtitle"],
        emp_id: Cookies.get("emp_id"),
      })
      .then((data1) => {
        let x = dataValues;
        x.push(data);
        setData(x);
      });
    setValue("title", "");
    setValue("subtitle", "");
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
      />
      <button
        className="submit btn btn-outline-dark col-md-12"
        onClick={scrapdetails}
        // type="submit"
      >
        {/* <span className="material-symbols-outlined">add</span> */}
        Scrap Details
      </button>

      <div className="Container pt-4 overflow-auto m-3">
        <div className="col-md-12">
          <table className="input_table table table-hover table-bordered fs-6">
            <tr>
              <td className="field col-md-8">
                <input
                  {...register("title", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.,\s]+$/i,
                  })}
                  style={{ border: errors1.title && " solid 2px red" }}
                  //   name="alert"
                  placeholder="Title"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-1">
                <input
                  {...register("subtitle", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.,\s]+$/i,
                  })}
                  style={{ border: errors1.subtitle && " solid 2px red" }}
                  //   name="alert"
                  placeholder="Subtitle"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>

              <td className="field col-md-2">
                <button
                  className="submit btn btn-outline-light col-md-12"
                  onClick={handleSubmit(addProfBody)}
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
export default ViewProfBody;

import React, { useRef, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "../styles/viewalerts.css";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import NavBar from "./navBar";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewClientPublications = () => {
  const [dataValues, setData] = useState([]);
  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  const {
    register: register1,
    formState: { errors: errors2 },
    control: control1,
    reset: reset1,
    setValue: setValue1,
    handleSubmit: handleSubmit1,
  } = useForm();

  //   axios.get("https://audistfis.onrender.com/api/faculty/listAlert").then((data) => {
  //     setData(data.data["alertlist"]);
  //     console.log(dataValues);
  //   });
  const exportPDF = (d) => {
    //console.log(d);
    var year = d["search_year"];
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Overall Publications";
    const headers = [["Title", "Citation", "Year"]];
    const data = [];
    if (dataValues) {
      dataValues.map((ele) => {
        if (ele.year === year) {
          data.push([ele.title, ele.citedby, ele.year]);
        }
      });
    }
    console.log(data);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
    console.log("Saved Successfully");
  };
  useEffect(() => {
    axios
      .get(
        "https://audistfis.onrender.com/api/faculty/getAllSpecificPublications",
        {
          params: {
            accessToken: Cookies.get("accessToken"),
            emp_id: Cookies.get("emp_id"),
          },
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          let temp = res.data;
          let tempdata = [];
          for (let i = 0; i < JSON.parse(temp.citations).length; i++) {
            let x = {};
            x["title"] = JSON.parse(temp.title)[i];
            x["citedby"] = JSON.parse(temp.citations)[i];
            x["year"] = JSON.parse(temp.year)[i];
            tempdata.push(x);
          }
          setData(tempdata);
        }
        //   console.log(res);
      });
  }, []);

  const data = {
    columns: [
      {
        label: "title",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Cited By",
        field: "citedby",
        sort: "asc",
        width: 500,
      },
      {
        label: "Year",
        field: "year",
        sort: "asc",
        width: 500,
      },
    ],
    rows: dataValues ? dataValues : [],
  };

  const addPublication = async (data) => {
    console.log(data);
    await axios
      .post("https://audistfis.onrender.com/api/faculty/addPublication", {
        title: data["title"],
        citedby: data["citedby"],
        year: data["year"],
        emp_id: Cookies.get("emp_id"),
      })
      .then((data1) => {
        let x = dataValues;
        x.push(data);
        setData(x);
      });
    setValue("title", "");
    setValue("year", "");
    setValue("citedby", "");
  };

  const scrapdetails = () => {
    axios
      .get("https://audistfis.onrender.com/api/faculty/scrapSpecific", {
        params: {
          accessToken: Cookies.get("accessToken"),
          emp_id: Cookies.get("emp_id"),
        },
      })
      .then((res) => {
        let temp = res.data,
          tempdata = [];
        for (let i = 0; i < JSON.parse(res.data.citations).length; i++) {
          let x = {};
          x["title"] = JSON.parse(res.data.title)[i];
          x["citedby"] = JSON.parse(res.data.citations)[i];
          x["year"] = JSON.parse(res.data.year)[i];
          tempdata.push(x);
        }
        setData(tempdata);
      });
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
      <div className="row">
        <div className="field col-md-6">
          <input
            {...register1("search_year", {
              required: true,
              pattern: /^[a-zA-Z0-9.,\s]+$/i,
            })}
            style={{ border: errors2.search_year && " solid 2px red" }}
            //   name="alert"
            placeholder="Year"
            className="form-control bg-white"
            type="text"
          ></input>
        </div>
        {dataValues ? (
          <div className="field col-md-6">
            <button
              className="submit btn btn-outline-light col-md-12"
              onClick={handleSubmit1(exportPDF)}
            >
              Export Pdf
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
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
                  {...register("citedby", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.,\s]+$/i,
                  })}
                  style={{ border: errors1.citedby && " solid 2px red" }}
                  //   name="alert"
                  placeholder="Cited By"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-1">
                <input
                  {...register("year", {
                    required: true,
                    pattern: /^[0-9]+$/i,
                    maxLength: 4,
                    minLength: 4,
                  })}
                  style={{ border: errors1.year && " solid 2px red" }}
                  //   name="alert"
                  placeholder="Year"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-2">
                <button
                  className="submit btn btn-outline-light col-md-12"
                  onClick={handleSubmit(addPublication)}
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

export default ViewClientPublications;

import React, { useRef, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "../../styles/viewalerts.css";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";

const ViewAlert = () => {
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
    axios.get("http://localhost:5000/api/faculty/listAlert").then((data) => {
      setData(data.data["alertlist"]);
      console.log(dataValues);
    });
  }, []);

  const data = {
    columns: [
      {
        label: "alert_content",
        field: "alert_content",
        sort: "asc",
        width: 150,
      },
      {
        label: "datePosted",
        field: "datePosted",
        sort: "asc",
        width: 500,
      },
    ],
    rows: dataValues ? dataValues : [],
  };

  const addAlert = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/api/faculty/addAlert", {
        alert_content: data["alert"],
      })
      .then((data) => {});
  };

  return (
    <div>
      <div className="Container pt-4 overflow-auto m-3">
        <div className="col-md-12">
          <table className="input_table table table-hover table-bordered fs-6">
            <tr>
              <td className="field col-md-10">
                <input
                  {...register("alert", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.,\s]+$/i,
                  })}
                  style={{ border: errors1.alert && " solid 2px red" }}
                  name="alert"
                  placeholder="Alert Description"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-2">
                <button
                  className="submit btn btn-outline-light col-md-12"
                  onClick={handleSubmit(addAlert)}
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

export default ViewAlert;

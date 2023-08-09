import React, { useDebugValue, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTable } from "mdbreact";
import "../../styles/modifyStaffs.css";
import { useForm, useController, Controller } from "react-hook-form";
import StaffTable from "./StaffsTable";
import axios from "axios";

const ModifyStaffsTable = () => {
  const [updated, setUpdated] = useState(true);
  const [dataValues, setData] = useState([]);

  const data = {
    columns: [
      {
        label: "email_id",
        field: "email_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "emp_id",
        field: "emp_id",
        sort: "asc",
        width: 270,
      },
      {
        label: "password",
        field: "password",
        sort: "asc",
        width: 200,
      },
    ],
    rows: dataValues ? dataValues : [],
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/faculty/listStaff").then((data) => {
      console.log(data);
      setData(data.data["stafflist"]);
    });
  }, [updated]);

  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  const addFaculty = async (data) => {
    console.log(data);
    await axios
      .post("http://localhost:5000/api/faculty/addStaff", {
        email_id: data["email"],
        emp_id: data["emp_id"],
        password: data["password"],
      })
      .then((data) => {});
    setValue("email", "");
    setValue("emp_id", "");
    setValue("password", "");
    setUpdated(!updated);
  };

  return (
    <div>
      <div className="Container pt-4 overflow-auto m-3">
        <div className="col-md-12">
          <table className="input_table table table-hover table-bordered fs-6">
            <tr>
              <td className="field col-md-5">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[0-9a-z]+@gmail.com$/i,
                  })}
                  style={{ border: errors1.email && " solid 2px red" }}
                  placeholder="Email"
                  name="email"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-2">
                <input
                  {...register("emp_id", {
                    required: true,
                    pattern: /^[0-9]+$/i,
                  })}
                  style={{ border: errors1.emp_id && " solid 2px red" }}
                  placeholder="Emp ID"
                  name="emp_id"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-3">
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern: /^[A-Za-z$_]+$/i,
                  })}
                  style={{ border: errors1.password && " solid 2px red" }}
                  placeholder="Password"
                  name="password"
                  className="form-control bg-white"
                  type="text"
                ></input>
              </td>
              <td className="field col-md-2">
                <button
                  className="submit btn btn-outline-light col-md-12"
                  onClick={handleSubmit(addFaculty)}
                  type="submit"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </td>
            </tr>
          </table>
          <StaffTable striped bordered small data={data} />;
        </div>
      </div>
    </div>
  );
};

export default ModifyStaffsTable;

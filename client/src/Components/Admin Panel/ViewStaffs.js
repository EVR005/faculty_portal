import React, { useRef, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

const ViewStaffsTable = () => {
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
  }, []);

  return <MDBDataTable striped bordered small data={data} />;
};

export default ViewStaffsTable;

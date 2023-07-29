import React, { useRef, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "../../styles/viewalerts.css";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import "../../styles/modifyStaffs.css";
// import { ReactToPrint } from "react-to-print";
import PDFPage from "./PDFPage";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewPublications = () => {
  const [dataValues, setData] = useState([]);
  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();

   const exportPDF = () => {
    console.log("Calledf");
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "Overall Publications";
    const headers = [["Title", "Citation","Year"]];
    const data= dataValues?(dataValues.map(ele=>[ele.title,ele.citedby,ele.year])):['CNN Project','5','2002']
    console.log(data)
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
    console.log("Saved Successfully");
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/faculty/getAllPublications")
      .then((res) => {
        let temp = res.data,
          tempdata = [];
        for (let j = 0; j < temp.length; j++) {
          for (let i = 0; i < JSON.parse(temp[j].citations).length; i++) {
            let x = {};
            x["title"] = JSON.parse(temp[j].title)[i];
            x["citedby"] = JSON.parse(temp[j].citations)[i];
            x["year"] = JSON.parse(temp[j].year)[i];
            tempdata.push(x);
          }
        }
        setData(tempdata);
        console.log(dataValues);
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
        label: "cited By",
        field: "citedby",
        sort: "asc",
        width: 150,
      },
      {
        label: "year",
        field: "year",
        sort: "asc",
        width: 500,
      },
    ],
    rows: dataValues ? dataValues : [],
  };
  return (
    <div>
      <div className="Container pt-4 overflow-auto m-3">
        {/* {dataValues ? (
          <Link
            className="edit_btn btn btn-outline-light col-md-12"
            //onClick={handleSubmit(addFaculty)}
            //data={dataValues}
            // state={{ dataValues: dataValues }}
            // to="/PDFPage"
            to="/PDFPage"
            type="submit"
          >
            Print Data
          </Link>

        ) : (
          ""
        )} */}

        {dataValues ? (
         <button onClick={exportPDF} >Export Pdf</button>
          
        ) : (
          ""
        )}

        <div className="col-md-12">
          <MDBDataTable striped bordered data={data} />
        </div>
      </div>
    </div>
  );
};

export default ViewPublications;

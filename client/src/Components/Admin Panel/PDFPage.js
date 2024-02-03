import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { jsPDF } from "jspdf";

// Create styles

// Create Document Component
const BasicDocument = () => {
  const [dataValues, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://audistfis.onrender.com/api/faculty/getAllPublications")
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
  const genPdf = async () => {
    const doc = new jsPDF();
    // // doc.text(),10,10);
    // // doc.text("Hello world!", 10, 10);
    // doc.html(document.querySelector("#mytable"));
    // doc.save("a4.pdf"); // will save the file in the current working directory
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await document.getElementById("mytable").innerHTML;
    pdf.html(data).then(() => {
      pdf.save("shipping_label.pdf");
    });
  };

  return (
    <div>
      <button onClick={genPdf}>print Pdf</button>
      <MDBDataTable id="mytable" striped bordered data={data} />
    </div>
  );
};
export default BasicDocument;

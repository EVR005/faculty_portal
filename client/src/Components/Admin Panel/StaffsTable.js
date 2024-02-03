import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StaffTable = (props) => {
  console.log(props.data);
  const exportPDF = async (e) => {
    let k = e.target.parentElement.getAttribute("k");
    console.log(props.data.rows[k].emp_id);
    await axios
      .get(
        "https://audistfis.onrender.com/api/faculty/getAllSpecificPublications",
        {
          params: {
            accessToken: Cookies.get("accessToken"),
            emp_id: props.data ? props.data.rows[k].emp_id : "",
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
          let dataValues = tempdata;
          //setData(tempdata);
          // var year = d["search_year"];
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
              //if (ele.year === year) {
              data.push([ele.title, ele.citedby, ele.year]);
              //}
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
        }
      });
  };

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            {props.data.columns.map((it, k) => {
              console.log(it);
              return <th>{it.label}</th>;
            })}
            <th>Publications</th>
          </tr>
        </thead>
        <tbody>
          {props.data.rows.map((it, k) => {
            return (
              <tr>
                <td>{k + 1}</td>
                <td>{it.email_id}</td>
                <td>{it.emp_id}</td>
                <td>{it.password}</td>
                <td>
                  <button onClick={exportPDF} k={k}>
                    <span class="material-symbols-outlined">download</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;

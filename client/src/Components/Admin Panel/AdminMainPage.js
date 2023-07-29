import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React from "react";
import ViewStaffsTable from "./ViewStaffs";
import ModifyStaffsTable from "./ModifyStaffs";
import ViewAlert from "./ViewAlert";
import ViewPublications from "./ViewPublications";

import AdminNavbar from "./AdminNavbar";
const AdminHomePage = () => {
  return (
    <div>
      <AdminNavbar />
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="view" title="View Staffs">
          <ViewStaffsTable />
        </Tab>
        <Tab eventKey="modify" title="Modify Staffs">
          {/* Add Staff Form comes here */}
          <ModifyStaffsTable />
        </Tab>
        <Tab eventKey="alert" title="Alert Staffs">
          {/* <p>Tis is the alert stafffs</p> */}
          <ViewAlert />
        </Tab>
        <Tab eventKey="viewpublications" title="View Publications">
          {/* <p>Tis is the alert stafffs</p> */}
          <ViewPublications />
        </Tab>
      </Tabs>
    </div>
  );
};
export default AdminHomePage;

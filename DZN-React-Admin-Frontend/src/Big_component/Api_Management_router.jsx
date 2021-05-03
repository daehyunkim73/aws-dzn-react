import React from "react";
import Api_Home from "../Api_pages/Home/Home";
import Api_Stat from "../Api_pages/Api_Monitoring/Api_Stat";
import Log from "../Api_pages/Api_Monitoring/Log";
import Statistics from "../Api_pages/Api_Monitoring/Statistics";
import Api_Management from "../Api_pages/Api_Library/Api_Management";
import Api_reg from "../Api_pages/Api_Library/Api_reg";
import Api_Policy_Management from "../Api_pages/Api_Library/Api_Policy_Management";
import Category_Management from "../Api_pages/Api_Category/Category_Management";
import Service_App_Management from "../Api_pages/Service_Group/Service_App_Management";
import Service_Management_reg from "../Api_pages/Service_Group/Service_Management_reg";
import Using_Api_And_Usage from "../Api_pages/Service_Group/Using_Api_And_Usage";
import { Route } from "react-router";

const Admin_router = () => {
  // const admin_sidebar = match.params.admin_sidebar;
  // const getFunction = () => {
  //   admin_sidebar_click();
  // };
  // function admin_sidebar_click() {
  //   if (admin_sidebar != "svcinfo") {
  //     const admin_sidebar_btn_list = document.getElementsByClassName(
  //       "admin_side_btn"
  //     );
  //     const admin_sidebar_btn_target = document.getElementsByClassName(
  //       "admin_side_btn_" + admin_sidebar
  //     );
  //   }
  // }
  // useEffect(() => {
  //   getFunction(admin_sidebar);
  // });

  return (
    <React.Fragment>
      <Route exact path="/api/home" component={Api_Home}></Route>

      {/* API 모니터링 */}
      <Route exact path="/api/apistat" component={Api_Stat}></Route>
      <Route path="/api/log" component={Log}></Route>
      <Route path="/api/statistics" component={Statistics}></Route>

      {/* API 라이브러리 */}
      <Route exact path="/api/apimanagement" component={Api_Management}></Route>
      <Route path="/api/apireg" component={Api_reg}></Route>
      <Route
        path="/api/apipolicymanagement"
        component={Api_Policy_Management}
      ></Route>

      {/* API 카테고리 */}
      <Route
        exact
        path="/api/categorymanagement"
        component={Category_Management}
      ></Route>

      {/* 서비스그룹관리 */}
      <Route
        exact
        path="/api/serviceappmanagement"
        component={Service_App_Management}
      ></Route>
      <Route
        path="/api/servicemanagementreg"
        component={Service_Management_reg}
      ></Route>
      <Route
        path="/api/usingapiandusage"
        component={Using_Api_And_Usage}
      ></Route>
    </React.Fragment>
  );
};

export default Admin_router;

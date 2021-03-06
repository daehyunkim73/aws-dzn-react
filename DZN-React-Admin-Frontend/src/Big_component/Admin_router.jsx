import React, { createContext, useContext } from "react";
import User_info from "../pages/User_Management/User_info";
import User_info_detail from "../pages/User_Management/User_info_detail";
import Data_Approved_management_list from "../pages/Data_center_Management/Data_Approved_management_list";
import Sales_data_management_list from "../pages/Data_center_Management/Sales_data_management_list";

import Notice_main from "../pages/Notice_board_Management/Admin_Notice_main";
import Notice_Detail from "../pages/Notice_board_Management/Admin_Notice_Detail";
import Post_uploade_Write from "../pages/Notice_board_Management/Admin_Notice_Post_uploade_Write";
import Post_uploade_Modify from "../pages/Notice_board_Management/Admin_Notice_Post_uploade_Modify";

import Faq_main from "../pages/Notice_board_Management/Faq_main";
import Faq_detail from "../pages/Notice_board_Management/Faq_detail";
import Faq_post_uplaode from "../pages/Notice_board_Management/Faq_post_uploade";
import Faq_post_modify_uploade from "../pages/Notice_board_Management/Faq_post_modify_uploade";

import Question_main from "../pages/Notice_board_Management/Question_main";
import Question_answer_detail from "../pages/Notice_board_Management/Question_answer_detail";

import Update_Main from "../pages/Notice_board_Management/update_main";
import Update_detail from "../pages/Notice_board_Management/upadte_detail";
import Update_post_uploade from "../pages/Notice_board_Management/update_post_uploade";
import Update_post_modify from "../pages/Notice_board_Management/update_post_modify";

import Data_sales_management from "../pages/Sales_calculate_Management/Data_sales_management";
import Service_slaes_management from "../pages/Sales_calculate_Management/Service_slaes_management";
import Calculate_management from "../pages/Sales_calculate_Management/Calculate_management";
import Api_sales_management from "../pages/Sales_calculate_Management/Api_sales_management";
import Svc_router from "../pages/Service_center_Management/svc_router";

import Data_Forum_main_management from "../pages/Contents_Management/data_forum_main";
import Service_Forum_main_management from "../pages/Contents_Management/service_forum_main";
import Data_forum_detail from "../pages/Contents_Management/data_forum_detail";
import Service_forum_detail from "../pages/Contents_Management/service_forum_detail";

import Calculate_management_after from "../pages/Sales_calculate_Management/Calculate_management_after";
import Using_guide_list from "../pages/Contents_Management/Using_guide_list";
import User_authority from "../pages/Admin_Settings/User_authority";
import Admin_user_manage from "../pages/Admin_Settings/Admin_user_manage";

// import Data_Approved_management from "../pages/Data_center_Management/Data_Approved_management";
// import Sales_data_management from "../pages/Data_center_Management/Data_Approved_management";
import Common_Data_Management from "../pages/Data_center_Management/Common_Data_Management";

import Using_guide_detail from "../pages/Contents_Management/Using_guide_detail";
import Using_guide_modify from "../pages/Contents_Management/Using_guide_modify";

import Admin_home from "../pages/Home/Admin_home";
import { Route, Switch } from "react-router";
import { useEffect } from "react";
import Api_use_approved_management from "../pages/Service_center_Management/Api_use_approved_management";
import Infra_approved_management from "../pages/Service_center_Management/Infra_approved_management";
import Service_approved_management from "../pages/Service_center_Management/Service_approved_management";
import Sales_Service_management_list from "../pages/Service_center_Management/Sales_Service_management_list";
import Sales_Service_management from "../pages/Service_center_Management/Sales_Service_management";
import { useState } from "react";

const Context = createContext();

const Admin_router = ({ match }) => {
  const [selectUserInfo, setSelectUserInfo] = useState([]);
  const [calculateTabVal, setCalculateTabVal] = useState("calculate_history");

  const admin_sidebar = match.params.admin_sidebar;
  const getFunction = () => {
    admin_sidebar_click();
  };
  function admin_sidebar_click() {
    if (admin_sidebar != "svcinfo") {
      const admin_sidebar_btn_list = document.getElementsByClassName(
        "admin_side_btn"
      );
      const admin_sidebar_btn_target = document.getElementsByClassName(
        "admin_side_btn_" + admin_sidebar
      );
      // for (let i = 0; i < admin_sidebar_btn_list.length; i++) {
      //   admin_sidebar_btn_list[i].classList.remove(
      //     "data_service_sidebar_click"
      //   );
      //   admin_sidebar_btn_target[0].classList.add("data_service_sidebar_click");
      // }
    }
  }
  useEffect(() => {
    getFunction(admin_sidebar);
  });

  return (
    <React.Fragment>
      <Context.Provider
        value={{selectUserInfo, setSelectUserInfo, calculateTabVal, setCalculateTabVal}}
      >
      <Switch>
        <Route exact path="/admin/home" component={Admin_home}></Route>

        {/* ????????????_???????????? */}
        <Route exact path="/admin/userinfo" component={User_info}></Route>
        <Route
          path="/admin/userinfo/detail"
          component={User_info_detail}
        ></Route>

        {/* ?????????????????????_????????????????????? */}
        <Route
          exact
          path="/admin/dataapproval"
          component={Data_Approved_management_list}
        ></Route>
        <Route
          path="/admin/datainfo/:pdbaseIdx"
          component={Common_Data_Management}
        ></Route>

        {/* ?????????????????????_????????????????????? */}
        <Route
          exact
          path="/admin/saledata"
          component={Sales_data_management_list}
        ></Route>
        {/* <Route
        path="/admin/datainfo/:pdbaseIdx/:dzonDataIdx"
        component={Common_Data_Management}
      ></Route> */}

        {/* ????????????????????? */}
        <Route
          exact
          path="/admin/usingapi"
          component={Api_use_approved_management}
        ></Route>
        <Route
          exact
          path="/admin/infra"
          component={Infra_approved_management}
        ></Route>
        <Route
          exact
          path="/admin/svcapproved"
          component={Service_approved_management}
        ></Route>
        <Route
          exact
          path="/admin/salesvc"
          component={Sales_Service_management_list}
        ></Route>
        <Route
          exact
          path="/admin/svcinfo/:serviceID"
          component={Sales_Service_management}
        ></Route>

        {/* ???????????????_???????????? */}
        <Route exact path="/admin/notice" component={Notice_main}></Route>
        <Route
          path="/admin/notice/content/:id"
          component={Notice_Detail}
        ></Route>
        <Route
          path="/admin/notice/write"
          component={Post_uploade_Write}
        ></Route>
        <Route
          path="/admin/notice/modify/:id"
          component={Post_uploade_Modify}
        ></Route>

        {/* ???????????????_FAQ */}
        <Route exact path="/admin/faq" component={Faq_main}></Route>
        <Route path="/admin/faq/detail/:id" component={Faq_detail}></Route>
        <Route path="/admin/faq/write" component={Faq_post_uplaode}></Route>
        <Route
          path="/admin/faq/modify/:id"
          component={Faq_post_modify_uploade}
        ></Route>

        {/* ???????????????_???????????? */}
        <Route exact path="/admin/question" component={Question_main}></Route>
        <Route
          path="/admin/question/detail/:id"
          component={Question_answer_detail}
        ></Route>
      
        {/* ???????????????_???????????? */}
        <Route exact path="/admin/update" component={Update_Main}></Route>
        <Route
          path="/admin/update/detail/:id"
          component={Update_detail}
        ></Route>
        <Route
          path="/admin/update/write"
          component={Update_post_uploade}
        ></Route>
        <Route
          path="/admin/update/modify/:id"
          component={Update_post_modify}
        ></Route>

        {/* ???????????????_???????????? */}
        <Route
          exact
          path="/admin/forum"
          component={Data_Forum_main_management}
        ></Route>
        <Route
          path="/admin/forum/:id"
          component={Data_forum_detail}
        ></Route>
        <Route
          exact
          path="/admin/Service_Forum_main_management"
          component={Service_Forum_main_management}
        ></Route>
        <Route
          path="/admin/forum/svcdetail"
          component={Service_forum_detail}
        ></Route>

        {/* ???????????????_????????????????????? */}
        <Route
          exact
          path="/admin/usingguide"
          component={Using_guide_list}
        ></Route>
        <Route
          path="/admin/usingguide/detail/:useguide_mast_idx"
          component={Using_guide_detail}
        ></Route>
        <Route
          path="/admin/usingguide/modify/:useguide_mast_idx"
          component={Using_guide_modify}
        ></Route>

        {/* ??????????????? */}
        <Route
          exact
          path="/admin/usermanage"
          component={Admin_user_manage}
        ></Route>
        <Route path="/admin/User_authority" component={User_authority}></Route>

        <Route
          path="/admin/salesdata"
          component={Data_sales_management}
        ></Route>
        <Route
          path="/admin/slaessvc"
          component={Service_slaes_management}
        ></Route>
        <Route path="/admin/calculate" component={Calculate_management}></Route>
        <Route path="/admin/apisales" component={Api_sales_management}></Route>

        <Route
          path="/admin/calculate_after"
          component={Calculate_management_after}
        ></Route>
      </Switch>
      </Context.Provider>
    </React.Fragment>
  );
};

export default Admin_router;

export function useUserInfo() {
  return useContext(Context);
}
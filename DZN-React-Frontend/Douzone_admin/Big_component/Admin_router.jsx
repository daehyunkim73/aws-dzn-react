import React from "react";
import User_info from "../pages/User_Management/User_info";
import User_info_detail from "../pages/User_Management/User_info_detail";
import Data_Approved_management_list from "../pages/Data_center_Management/Data_Approved_management_list";
import Sales_data_management_list from "../pages/Data_center_Management/Sales_data_management_list";

import Notice_main from "../pages/Notice_board_Management/Admin_Notice_main";
import Notice_Detail from "../pages/Notice_board_Management/Admin_Notice_Detail";
import Post_uploade_Write from "../pages/Notice_board_Management/Admin_Notice_Post_Write";

import Faq_main from "../pages/Notice_board_Management/Faq_main";
import Faq_detail from "../pages/Notice_board_Management/Faq_detail";
import Faq_post_uplaode from "../pages/Notice_board_Management/Faq_post_uploade";

import Question_main from "../pages/Notice_board_Management/Question_main";
import Question_answer_uploade from "../pages/Notice_board_Management/Question_answer_uploade";
import Question_answer_detail from "../pages/Notice_board_Management/Question_answer_detail";

import Update_Main from "../pages/Notice_board_Management/update_main";
import Update_detail from "../pages/Notice_board_Management/upadte_detail";
import Update_post_uploade from "../pages/Notice_board_Management/update_post_uploade";

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

import Data_Approved_management from "../pages/Data_center_Management/Data_Approved_management";
import Sales_data_management from "../pages/Data_center_Management/Sales_data_management";

import Using_guide_detail from "../pages/Contents_Management/Using_guide_detail";
import Using_guide_modify from "../pages/Contents_Management/Using_guide_modify";

import Admin_home from "../pages/Home/Admin_home";
import { Route } from "react-router";
import { useEffect } from "react";

const Admin_router = ({ match }) => {
  const admin_sidebar = _.defaultTo(match.params.admin_sidebar);

  const getFunction = () => {
    admin_sidebar_click();
  };

  function admin_sidebar_click() {
    if (admin_sidebar != "svcinfo") {
      $(".admin_side_btn").removeClass("data_service_sidebar_click");
      $(".admin_side_btn_" + admin_sidebar).addClass(
        "data_service_sidebar_click"
      );
    }
  }

  useEffect(() => {
    getFunction(admin_sidebar);
  });

  return (
    <React.Fragment>
      <Route exact path="/admin/home" component={Admin_home}></Route>

      {/* 회원관리_회원정보 */}
      <Route exact path="/admin/userinfo" component={User_info}></Route>
      <Route path="/admin/userinfo/detail" component={User_info_detail}></Route>

      {/* 데이터센터관리_데이터승인관리 */}
      <Route
        exact
        path="/admin/dataapproval"
        component={Data_Approved_management_list}
      ></Route>
      <Route
        path="/admin/dataapproval/detail"
        component={Data_Approved_management}
      ></Route>

      {/* 데이터센터관리_판매데이터관리 */}
      <Route
        exact
        path="/admin/saledata"
        component={Sales_data_management_list}
      ></Route>
      <Route
        path="/admin/saledata/detail"
        component={Sales_data_management}
      ></Route>

      {/* 서비스센터관리 */}
      <Route exact path="/admin/usingapi" component={Svc_router}></Route>
      <Route exact path="/admin/infra" component={Svc_router}></Route>
      <Route exact path="/admin/svcapproved" component={Svc_router}></Route>
      <Route exact path="/admin/salesvc" component={Svc_router}></Route>
      <Route exact path="/admin/svcinfo" component={Svc_router}></Route>

      {/* 게시판관리_공지사항 */}
      <Route exact path="/admin/notice" component={Notice_main}></Route>
      <Route path="/admin/notice/content/:ntc_idx" component={Notice_Detail}></Route>
      <Route
        path="/admin/notice/modfiy"
        component={Post_uploade_Write}
      ></Route>

      {/* 게시판관리_FAQ */}
      <Route exact path="/admin/faq" component={Faq_main}></Route>
      <Route path="/admin/faq/detail" component={Faq_detail}></Route>
      <Route path="/admin/faq/modfiy" component={Faq_post_uplaode}></Route>

      {/* 게시판관리_문의하기 */}
      <Route exact path="/admin/question" component={Question_main}></Route>
      <Route
        path="/admin/question/detail"
        component={Question_answer_detail}
      ></Route>
      <Route
        path="/admin/question/Question_answer_uploade"
        component={Question_answer_uploade}
      ></Route>

      {/* 게시판관리_업데이트 */}
      <Route exact path="/admin/update" component={Update_Main}></Route>
      <Route path="/admin/update/detail" component={Update_detail}></Route>
      <Route
        path="/admin/update/modify"
        component={Update_post_uploade}
      ></Route>

      {/* 콘텐츠관리_포럼관리 */}
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

      {/* 콘텐츠관리_이용가이드관리 */}
      <Route
        exact
        path="/admin/usingguide"
        component={Using_guide_list}
      ></Route>
      <Route
        path="/admin/usingguide/detail"
        component={Using_guide_detail}
      ></Route>
      <Route
        path="/admin/usingguide/modify"
        component={Using_guide_modify}
      ></Route>

      {/* 관리자설정 */}
      <Route
        exact
        path="/admin/usermanage"
        component={Admin_user_manage}
      ></Route>
      <Route path="/admin/User_authority" component={User_authority}></Route>

      <Route path="/admin/salesdata" component={Data_sales_management}></Route>
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
    </React.Fragment>
  );
};

export default Admin_router;

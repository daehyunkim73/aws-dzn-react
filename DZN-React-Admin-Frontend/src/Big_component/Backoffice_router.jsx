import React from "react";

const Backoffice_router = () => {
  return (
    <React.Fragment>
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
      <Route exact path="/admin/scm/:svc_detail" component={Svc_router}></Route>

      {/* 게시판관리_공지사항 */}
      <Route exact path="/admin/notice" component={Notice_main}></Route>
      <Route path="/admin/notice/detail" component={Notice_Detail}></Route>
      <Route
          path="/admin/notice/modfiy/:id"
          component={Post_uploade_Modify}
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
     

      {/* 게시판관리_업데이트 */}
      <Route exact path="/admin/update" component={Update_Main}></Route>
      <Route path="/admin/update/detail" component={Update_detail}></Route>
      <Route
        path="/admin/update/write"
        component={Update_post_uploade}
      ></Route>

      {/* 콘텐츠관리_포럼관리 */}
      <Route
        exact
        path="/admin/forum"
        component={Data_Forum_main_management}
      ></Route>
      <Route
        path="/admin/forum/datadetail"
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

export default Backoffice_router;

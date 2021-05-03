import React from "react";
import Admin_home_notice_table from "./components/Admin_home_notice_table";
import Admin_home_update_table from "./components/Admin_home_update_table";
import Admin_home_statistics from "./components/Admin_home_statistics";
import { Link } from "react-router-dom";

const Admin_home = () => {
  return (
    <React.Fragment>
      <div className="Admin_home_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">Home</p>
        </div>
        <div className="home_accept">
          <div className="home_accept_wrap">
            <div className="home_accept_top_wrap">
              <h3 className="home_accept_bottom_number">10건</h3>
              {/* New 자리 */}
            </div>
            <div className="home_accept_bottom_wrap">
              <p className="home_accept_bottom_title">신규 회원가입 미승인</p>
              <Link className="link_style_text" to="/admin/userinfo">
                <p className="home_more_btn">{'더보기 >'}</p>
              </Link>
            </div>
          </div>
          <div className="home_accept_wrap">
            <div className="home_accept_top_wrap">
              <h3 className="home_accept_bottom_number">10건</h3>
              {/* New 자리 */}
            </div>
            <div className="home_accept_bottom_wrap">
              <p className="home_accept_bottom_title">데이터판매 미승인</p>
              <Link className="link_style_text" to="/admin/dataapproval">
                <p className="home_more_btn">{'더보기 >'}</p>
              </Link>
            </div>
          </div>
          <div className="home_accept_wrap">
            <div className="home_accept_top_wrap">
              <h3 className="home_accept_bottom_number">10건</h3>
              {/* New 자리 */}
            </div>
            <div className="home_accept_bottom_wrap">
              <p className="home_accept_bottom_title">서비스판매 미승인</p>
              <Link className="link_style_text" to="/admin/svcapproved">
                <p className="home_more_btn">{'더보기 >'}</p>
              </Link>
            </div>
          </div>
          <div className="home_accept_wrap">
            <div className="home_accept_top_wrap">
              <h3 className="home_accept_bottom_number">10건</h3>
              {/* New 자리 */}
            </div>
            <div className="home_accept_bottom_wrap">
              <p className="home_accept_bottom_title">API 사용 미승인</p>
              <Link className="link_style_text" to="/admin/usingapi">
                <p className="home_more_btn">{'더보기 >'}</p>
              </Link>
            </div>
          </div>
          <div className="home_accept_wrap">
            <div className="home_accept_top_wrap">
              <h3 className="home_accept_bottom_number">10건</h3>
              {/* New 자리 */}
            </div>
            <div className="home_accept_bottom_wrap">
              <p className="home_accept_bottom_title">인프라 미승인</p>
              <Link className="link_style_text" to="/admin/infra">
                <p className="home_more_btn">{'더보기 >'}</p>
              </Link>
            </div>
          </div>
          <div className="home_accept_wrap">
            <div className="home_accept_top_wrap">
              <h3 className="home_accept_bottom_number">10건</h3>
              {/* New 자리 */}
            </div>
            <div className="home_accept_bottom_wrap">
              <p className="home_accept_bottom_title">고객문의 미답변</p>
              <p className="home_more_btn">{'더보기 >'}</p>
            </div>
          </div>
        </div>

        <div className="admin_home_table_wrap clearfix">
          <div className="admin_home_notice_table">
            <Admin_home_notice_table />
          </div>
          <div className="admin_home_update_table">
            <Admin_home_update_table />
          </div>
        </div>
        <Admin_home_statistics />
      </div>
    </React.Fragment>
  );
};

export default Admin_home;

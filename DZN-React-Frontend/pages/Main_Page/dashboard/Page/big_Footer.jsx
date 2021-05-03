import React from "react";
import Footer_logo from "../../../../image/Center/Logo/footer_logo.png";
import { Link } from "react-router-dom";

const Big_Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="footer_wrap">
          <div className="second_footer_wrap">
            <img className="footer_logo" src={Footer_logo} alt="logo" />
            <Link to="/tos/policy" className="router_link" className="btn_allcontents footer_p">
              <span>이용약관</span>
            </Link>
            <Link to="/tos/privacy" className="router_link" className="btn_allcontents footer_p">
              <span>개인정보처리방침</span>
            </Link>
            <Link to="/support/question">
              <p className="footer_p">고객센터</p>
            </Link>
            <p className="footer_copyright">
              Copyright © DOUZONE BIZON. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Big_Footer;

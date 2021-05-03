import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Main_page_logo from "../../image/Center/Logo/dev_logo.png";
import Login_intro from "./login_intro";
import Policy from "../Main_Page/policy";
import Privacy from "../Main_Page/privacy";
import { useUsageInfo } from "../Main_Page/dashboard/components/Header";
const Navbar = () => {
  const { agreeRes, agrlogic } = useUsageInfo();
  const history = useHistory();
  const noAccess = () => {
    alert("약관동의를 진행하셔야 합니다.");
    history.push(`/tos/intro`);
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/tos">
          <div className="hidden_box">
            <nav className="menuBar">
              <div className="menu_wrap">
                {agrlogic &&
                  (agreeRes.length === 0 || agreeRes[0].term_ageree === "0" ? (
                    <div className="logo" onClick={noAccess}>
                      <img src={Main_page_logo} alt="Logo" />
                    </div>
                  ) : (
                    <Link to="/" className="router_link">
                      <div className="logo">
                        <img src={Main_page_logo} alt="Logo" />
                      </div>
                    </Link>
                  ))}
              </div>
            </nav>
            <div className="wrapper">
              <div id="content">
                <div className="container-fluid">
                  <Route path="/tos/intro" component={Login_intro}></Route>
                  <Route path="/tos/policy" component={Policy}></Route>
                  <Route path="/tos/privacy" component={Privacy}></Route>
                </div>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Navbar;

import React from "react";
import _ from "lodash";
import Personalization_sidebar from "../personalization_sidebar/personalization_sidebar";
import { Route, Switch } from "react-router";

import Pw_chage from "../../Center/Login_passwd_change";
import User_info from "./Personal_info";
import Qr_code from "./Qr_code";
import Company_info from "./Company_info";
import Authority_setting from "./Authority_setting";
import Settlement_info from "../Sales_info/Sales_info";
import Payment_info from "../Payment_info/payment_info";

const setting_router = ({ match }) => {
  const setting = _.defaultTo(match.params.setting);
  return (
    <React.Fragment>
      <div className="api_document_wrap">
        <Personalization_sidebar setting_sidebar={setting} />
        <Switch>
          <Route path="/setting/userinfo" component={User_info}></Route>
          <Route path="/setting/pwchange" component={Pw_chage}></Route>
          <Route path="/setting/qrcode" component={Qr_code}></Route>
          <Route path="/setting/coinfo" component={Company_info}></Route>
          <Route
            path="/setting/authority"
            component={Authority_setting}
          ></Route>
          <Route path="/setting/settlement" component={Settlement_info}></Route>
          <Route path="/setting/payment" component={Payment_info}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default setting_router;

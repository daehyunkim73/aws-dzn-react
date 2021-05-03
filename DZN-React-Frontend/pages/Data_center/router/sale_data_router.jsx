import React, { useEffect } from "react";
import Sale_data_list from "../sale_data/sale_data_list";
import Sale_data_detail from "../sale_data_detail/sale_data_detail";
import { Switch, Route } from "react-router";
import view_more from "../../../image/Center/Dashboard/view_more.png";

const purchase_create_data_router = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="sale_create_data_detail_wrap">
        <div className="page_title_wrap">
          <p className="page_title">판매 데이터</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Data Center</p>
            <img className="caption_img" src={view_more} />
            <p>판매데이터</p>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path="/datacenter/saledata"
            component={Sale_data_list}
          ></Route>
          <Route
            path="/datacenter/saledata/control/:detailID"
            component={Sale_data_detail}
          ></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default purchase_create_data_router;

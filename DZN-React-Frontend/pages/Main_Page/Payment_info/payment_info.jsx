import React from "react";
import Sale_create_data_table from "./payment_info_table";
import Sale_create_data_search from "./payment_info_search";
import Pagination from "../../Main_Page/component/Pagination";

const Payment_info = () => {
  return (
    <React.Fragment>
      <div className="payment_info">
        <div className="search_page">
          {/* <Sale_create_data_search /> */}
          <Sale_create_data_table />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment_info;

import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Date_picker from "../../../../Big_component/Date_Picker";

const Infra_approved_management_search = ({
  setRending,
  searchData,
  setSearchData,
}) => {
  // 기본 검색 정보
  useEffect(() => {
    setSearchData({
      searchDateType: "0",
    });
  }, []);

  const dateTypeChange = (e) => {
    setSearchData({
      ...searchData,
      searchDateType: e.target.value,
    });
  };

  const inputChange = (e) => {
    setSearchData({
      ...searchData,
      searchTerm: e.target.value,
    });
  };

  const searchCilck = (e) => {
    const [start, end] = document.querySelectorAll(".picker-input__text");
    if (!(start.value === "" || end.value === "")) {
      setSearchData({
        ...searchData,
        searchStartDate: start.value,
        searchEndDate: end.value,
      });
    }
    setRending(true);
  };
  return (
    <React.Fragment>
      <div className="backoffice_search_wrap">
        <div className="input_wrap">
          <div className="search_wrap">
            <div className="search_text_wrap">
              <div className="search_text white_border">검색기간</div>
              <div className="search_text">검색어</div>
            </div>
            <div className="search_form_wrap">
              <div className="input_form white_border" id="date_picker_sp_box">
                <select className="search_date_select form-control" onChange={dateTypeChange}>
                  <option value="0">요청일</option>
                  <option value="1">승인일</option>
                </select>
                <div className="back_admin_date_picker_box">
                  <Date_picker />
                </div>
              </div>
              <div className="input_form" id="search_df_ct_pr">
                <Form.Control
                  type="text"
                  className="form_input"
                  onChange={inputChange}
                  placeholder="서비스 제목, 회원명, 아이디 검색"
                />
              </div>
            </div>
          </div>
          <div className="input_submit_wrap">
            <button className="search_btn" type="submit" onClick={searchCilck}>
              검색
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Infra_approved_management_search;

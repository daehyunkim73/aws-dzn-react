import React, { useCallback } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import { Image_download } from "../../../../Server_ajax"

const Approved_req_contents_popup = (props) => {
  const { reqInfo } = props;    
  console.log(reqInfo,"π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€π±βπ€");
  const Image_close_popup = useCallback(() => {
    const Admin_user_datacenter_approved_popup_bgk = document.getElementById(
      "Admin_user_datacenter_approved_popup_bgk"
    );
    Admin_user_datacenter_approved_popup_bgk.style.display = "none";
  }, []);
  
  // 1: λ°μ΄ν° μΌν° / 2: μλΉμ€μΌν° 
  const mntType = location.pathname.indexOf("datainfo") !== -1 ? "1" : "2";  
  let data = {
    memo: '',
    type: ''
  }

  if(mntType === "1"){
    data = {
      memo: reqInfo.memo,
      type: reqInfo.sales_stat && reqInfo.sales_stat !== null 
            ? "μ λ³΄ μμ  μΉμΈ"
            : "μ κ· νλ§€ μΉμΈ"
    }
  }else{
    data = {
      memo: reqInfo[0] && reqInfo[0].memo_req !== null ? reqInfo[0].memo_req : "",
      type: reqInfo[0] && reqInfo[0].stat_gbn === "0"
            ? "μ κ· νλ§€ μΉμΈ"
            : "μ λ³΄ μμ  μΉμΈ"
    }
  }

  const file_download = (file_info) => () => {
    Image_download(
      reqInfo[0].add_file_name, 
      reqInfo[0].addFile,
      'backoffice', //service_code
      'C' // S: μλΉμ€, C: νμ¬, U: μ¬μ©μ
      );
  }

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_datacenter_approved_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_Data_Approved_req_small_white_box">
            <div className="admin_popup_head_line_box">
              <h1>μΉμΈ μμ²­ λ΄μ©</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_popup_sp_text_box"
              >
                <div className="approved_reason_box">
                  <p>μΉμΈμμ²­ μ¬μ </p>
                </div>
                <div className="admin_new_req_box">
                  <div className="admin_Companion_box">
                    {data.type}
                  </div>
                </div>
                <textarea className="apprvoed_req_textarea" value={data.memo} disabled />
                <div className="admin_file_download_text_box">
                  <p>μ²¨λΆνμΌ</p>
                  <p>
                    {reqInfo[0].add_file_name && reqInfo[0].add_file_name !== "" && 
                    <span id="admin_Aprroved_req_data_box" onClick={file_download(reqInfo)}>
                      {reqInfo[0].add_file_name}
                    </span>
                    }
                  </p>
                </div>
              </div>

              <div className="admin_popup_button_box">
                <button
                  className="admin_popup_second_btn"
                  id="approved_req_post_btn"
                  onClick={Image_close_popup}
                >
                  νμΈ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Approved_req_contents_popup;

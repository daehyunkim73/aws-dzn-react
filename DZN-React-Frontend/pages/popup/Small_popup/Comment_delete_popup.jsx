import React, { useCallback } from "react";
import warningImg from "../../../image/Data_Center/sale_data_list/comment_delete.jpg";
// css 위치: C:\workdspace\User\developer_frontend\admin\style\popup.css

const Comment_delete_popup = ({setConfirm}) => {
  const confirm_popup = useCallback(() => {    
    setConfirm((confirm) => {return {...confirm, isConfirm: true}});
  }, [setConfirm]);

  const close_popup = useCallback(() => {    
    setConfirm((confirm) => {return {...confirm, isCancel: true}});
  }, [setConfirm]);

  return (
    <React.Fragment>
      <div className="aa" >
        <div className="bb" id="Approved_comment_bgk_popup"></div>
        <div className="cc">
          <div className="dd">
            <div className="ee">
              <div>
                <div className="ff">
                  <img src={warningImg} alt="" />
                  <div className="gg">댓글을 삭제 하시겠습니까?</div>
                </div>
              </div>
              <div className="ff">
                <button
                  className="btnCancel"
                  type="button"
                  id="cancel"
                  onClick={close_popup}
                >
                  <span>취소</span>
                </button>
                <button 
                  className="btnConfim" 
                  type="button" 
                  id="confirm" 
                  onClick={confirm_popup}>
                  <span>확인</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comment_delete_popup;

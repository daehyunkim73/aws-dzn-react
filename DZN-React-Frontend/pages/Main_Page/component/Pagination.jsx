import React, { useCallback, useEffect, useState } from "react";
import Pagination_first_btn from "../../../image/Center/Pagination/first_btn.png";
import Pagination_prev_btn from "../../../image/Center/Pagination/prev_btn.png";
import _ from "lodash";

const Pagination_ui = (props) => {
  const {
    ttlRowsCnt,
    currPage,
    setCurrPage,
    contentNumPerPage,
    setReRend,
  } = props;

  const [startPageNum, setStartPageNum] = useState(0);
  const [endPageNum, setEndPageNum] = useState(0);
  const [totalPageArr, setTotalPageArr] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const pageCount = 10;

  const pageMoveChk = useCallback( (currPage, gbn) => {      
      gbn === "first" && props.setCurrPage(1)
      || gbn === "before" && currPage - 1 > 0 && props.setCurrPage(currPage - 1)
      || gbn === "next" && currPage + 1 <= totalPageCount && props.setCurrPage(currPage + 1)
      || gbn === "last" && (
        //(totalPageCount - 10) >= 0 ? (totalPageCount - 10) : 1,  //(25 - 10) = 15 > 0 && 15
                                                                   //(10 - 10) = 0 >= 0 && 0
                                                                   //(7 - 10) = -3 < 0 && 1
        props.setCurrPage((totalPageCount - 10) >= 0 ? (totalPageCount - 9) : 1)
      )
    },
    [props.currPage, totalPageCount]
  );

  const pageNumHandler = useCallback((num) => {
      props.setCurrPage(num);
    },
    [props.currPage]
  );

  useEffect(() => {
      setTotalPageCount(Math.ceil(ttlRowsCnt / contentNumPerPage));
      let startPageNum_v = (Number(props.currPage) <= totalPageCount && Number(props.currPage) >= (totalPageCount - 9) ? (totalPageCount - 9) : ((Number(props.currPage) - 1) / totalPageCount) * totalPageCount + 1) 
      setStartPageNum(parseInt(startPageNum_v < 1 ? 1 : startPageNum_v))
      setEndPageNum((Number(startPageNum_v) + Number(pageCount) - 1) > totalPageCount ? totalPageCount : (Number(startPageNum_v) + Number(pageCount) - 1))
      setTotalPageArr(_.range(startPageNum, endPageNum + 1));
  },
  [currPage, startPageNum, endPageNum])

  if (totalPageCount === 1) return null;
  return (
    <React.Fragment>
      <div className="pagination_wrap">
        <div className="pagination_btn_wrap">
          <div className="prev_btn_wrap">
            <img
              src={Pagination_first_btn}
              alt=""
              onClick={() => pageMoveChk(props.currPage, "first")}
            />
            <img
              src={Pagination_prev_btn}
              alt=""
              onClick={() => pageMoveChk(props.currPage, "before")}
            />
          </div>
          <div className="number_btn_wrap">
            { 
              //Array.prototype.slice.call(totalPageArr).map((num) => (
              Array.from(totalPageArr).map((num) => (
                <p
                  onClick={() => pageNumHandler(num)}
                  key={num}
                  className={props.currPage === num ? "page-item active" : ""}
                >
                  {num}
                </p>
              ))
            }
          </div>
          <div className="next_btn_wrap">
            {
              Number(endPageNum) < Number(totalPageCount) ? (
              <img
                src={Pagination_prev_btn}
                alt=""
                onClick={() => pageMoveChk(props.currPage, "next")}
              />
              ) : (
              <img
                src={Pagination_prev_btn}
                alt=""
              />
              )
            }
            <img
              src={Pagination_first_btn}
              alt=""
              onClick={() => pageMoveChk(props.currPage, "last")}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pagination_ui;

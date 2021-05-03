import React, { useCallback, useEffect } from 'react';
import first_btn from '../../../image/Center/Pagination/first_btn.png';
import prev_btn from '../../../image/Center/Pagination/prev_btn.png';

const Pagination_ui = () => {
    return (
      <React.Fragment>
      <div className="pagination_wrap">
          <div className="pagination_btn_wrap">
            <div className="prev_btn_wrap">
              <img src={first_btn} alt=""/>
              <img src={prev_btn} alt=""/>
            </div>
            <div className="number_btn_wrap">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
            </div>
            <div className="next_btn_wrap">
              <img src={first_btn} alt=""/>
              <img src={prev_btn} alt=""/>
            </div>
          </div>
      </div>
      </React.Fragment>
    );
  }

export default Pagination_ui;

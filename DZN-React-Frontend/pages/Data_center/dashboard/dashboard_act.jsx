import React, { useEffect, useState, useCallback } from "react";
import Table_middle from "../../../src/Table_middle";
import datacenter_act_empty from "../../../image/Center/Empty/datacenter_act_empty.png";
import datacenter_act_empty_icon_1 from "../../../image/Center/Empty/datacenter_act_empty_icon_1.png";
import datacenter_act_empty_icon_2 from "../../../image/Center/Empty/datacenter_act_empty_icon_2.png";
import datacenter_act_empty_icon_3 from "../../../image/Center/Empty/datacenter_act_empty_icon_3.png";
import datacenter_act_empty_icon_4 from "../../../image/Center/Empty/datacenter_act_empty_icon_4.png";

const dashboard_act_v2 = ({wise_Wide_List, setWise_Wide_List}) => {
  const [cate_list, setCate_list] = useState();
  const [slide_api_list, setSlide_api_list] = useState([]);
  const [slide_page_nation, setSlide_page_nation] = useState(1);

  const [slide_api_list_logic, setSlide_api_list_logic] = useState(false);

  useEffect(() => {
    // Dashboard_data_act_slide();
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);


  useEffect(() => {
    for (let i = slide_page_nation * 3 - 3; i < slide_page_nation * 3; i++) {
      if (i > Object.keys(wise_Wide_List).length - 1) {
      } else {
        let forum_main_list_page = wise_Wide_List[i];
        setSlide_api_list((slide_api_list) => [
          ...slide_api_list,
          forum_main_list_page,
        ]);
      }
    }
    setSlide_api_list_logic(true);
  }, [wise_Wide_List && cate_list, slide_page_nation]);

  const image_right_btn = useCallback(() => {
    setSlide_api_list(slide_api_list.splice(3));
    if (
      slide_page_nation === Math.ceil(Object.keys(wise_Wide_List).length / 3)
    ) {
      setSlide_page_nation(1);
    } else {
      setSlide_page_nation(slide_page_nation + 1);
    }
  }, [slide_api_list && slide_page_nation, wise_Wide_List]);

  const image_left_btn = useCallback(() => {
    setSlide_api_list(slide_api_list.splice(3));
    if (slide_page_nation === 1) {
      setSlide_page_nation(Math.ceil(Object.keys(wise_Wide_List).length / 3));
    } else {
      setSlide_page_nation(slide_page_nation - 1);
    }
  }, [slide_api_list && slide_page_nation, wise_Wide_List]);

  return (
    <React.Fragment>
      <div className="working_activity_wrap data_working_activity_wrap">
        <div id="act_title_slide" className="act_title clearfix">
          <p>작업 활동</p>
          {slide_api_list.length !== 0 && 
          <div className="slide_cnt" style={{ display: "inline-flex" }}>
            <div>
              <img
                className="act_arrow_img act_prev_arrow_img"
                src="../image/Center/Dashboard/main_left.png"
                alt="left"
                onClick={image_left_btn}
              />
            </div>
            <span className="slide_now">{slide_page_nation}</span>/
            <span className="slide_max">
              {Math.ceil(Object.keys(wise_Wide_List).length / 3)}
            </span>
            <div>
              <img
                className="act_arrow_img act_next_arrow_img"
                src="../image/Center/Dashboard/main_right.png"
                alt="right"
                onClick={image_right_btn}
              />
            </div>
          </div>
          }
        </div>
        {slide_api_list_logic === true &&
        <>
        {slide_api_list.length  !== 0 ?
          slide_api_list.map((c, idx) => {
            return (
              <div className="working_activity" key={idx}>
                <div className="working_activity_box clearfix">
                  <div className="working_activity_info_wrap clearfix">
                    <p className="working_activity_nickname">{c.id}</p>
                    <p className="working_activity_date">{c.date}</p>
                    <div className="working_activity_type">
                      {c.type === "WIDE" && <p className="wide">WIDE</p>}
                      {c.type === "WISE" && <p className="wise">WISE</p>}
                    </div>
                    <p className="working_activity_info">{c.title}</p>
                  </div>
                  <div className="working_wrap">
                    <div className="working_activity_graph">
                      <p className="working_activity_graph_title">진행률</p>
                      <p className="working_activity_graph_number">
                        {c.progress + "%"}
                      </p>
                      <div>
                        <span style={{ width: c.progress + "%" }}>&nbsp;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : 
          <div className="data_center_act_empty">
            <div className="data_center_act_empty_left">
              <img src={datacenter_act_empty} alt=""/>
              <p>작업활동이 없습니다. <br/> 새로운 작업을 시작해 보세요. </p>
            </div>
            <div className="data_center_act_empty_right">
              <span>
                <img src={datacenter_act_empty_icon_1} alt=""/>
                <p>WIDE</p>
              </span>
              <span>
                <img src={datacenter_act_empty_icon_2} alt=""/>
                <p>WISE</p>
              </span>
              <span>
                <img src={datacenter_act_empty_icon_3} alt=""/>
                <p>WEHAGO BI</p>
              </span>
              <span>
                <img src={datacenter_act_empty_icon_4} alt=""/>
                <p>Tableau</p>
              </span>
            </div>
          </div>
          }
          </>}
      </div>
    </React.Fragment>
  );
};

export default dashboard_act_v2;

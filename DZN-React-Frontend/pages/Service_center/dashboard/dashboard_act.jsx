import React, { useEffect, useState } from "react";
import Table_Middle from "../../../src/Table_middle";
import { useCallback } from "react";
import Service_image_nation from "../component/service_image_nation";
import { Server_ajax_get } from "../../../server_ajax";
import svccenter_using_api_empty from "../../../image/Center/Empty/svccenter_using_api_empty.png"
import { Link } from "react-router-dom";

const Dashboard_act = ({use_api_list, setUse_api_list}) => {
  const [cate_list, setCate_list] = useState();
  const [defaultList, setDefaultList] = useState([]);
  const [defaultListLogic, setDefaultListLogic] = useState(false);
  const [slide_api_list, setSlide_api_list] = useState([]);
  const [slide_api_list_logic, setSlide_api_list_logic] = useState(false);
  const [slide_page_nation, setSlide_page_nation] = useState(1);

  const [service_appr, setService_appr] = useState([]);

  useEffect(() => {
    Table_Middle();
    return () => {
      Table_Middle(); 
    };
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const service_by_id = await Server_ajax_get(`svccenter/use_api_list`);
        setDefaultList(service_by_id);
        service_by_id
          .filter((c) => {
            return c.stat === 1 && c.use_gbn === "Y";
          })
          .map((api_info) => {
            setUse_api_list((use_api_list) => [...use_api_list, api_info]);
          });

        for (
          let i = slide_page_nation * 3 - 3;
          i < slide_page_nation * 3;
          i++
        ) {
          if (i > use_api_list.length - 1) {
          } else {
            let forum_main_list_page = use_api_list[i];
            setSlide_api_list((slide_api_list) => [
              ...slide_api_list,
              forum_main_list_page,
            ]);
          }
        }
        setDefaultListLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();

    (async function () {
      try {
        const cate_list = await Server_ajax_get(`svccenter/cate_list`);
        setCate_list(cate_list);
      } catch (e) {
        return console.error(e);
      }
    })();

    (async function () {
      try {
        const Service_product_list = await Server_ajax_get(
          `svccenter/Service_product_list`
        );
        setService_appr(Service_product_list);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    for (let i = slide_page_nation * 3 - 3; i < slide_page_nation * 3; i++) {
      if (i > use_api_list.length - 1) {
      } else {
        let forum_main_list_page = use_api_list[i];
        setSlide_api_list((slide_api_list) => [
          ...slide_api_list,
          forum_main_list_page,
        ]);
      }
    }
  }, [service_appr, slide_page_nation]);

  const image_right_btn = useCallback(() => {
    if (use_api_list.length === 0) {
      return;
    } else {
      if (slide_page_nation === Math.ceil(use_api_list.length / 3)) {
        setSlide_api_list(slide_api_list.splice(3));
        setSlide_page_nation(1);
      } else {
        setSlide_api_list(slide_api_list.splice(3));
        setSlide_page_nation(slide_page_nation + 1);
      }
    }
  }, [slide_api_list && slide_page_nation, use_api_list]);

  const image_left_btn = useCallback(() => {
    if (use_api_list.length === 0) {
      return;
    } else {
      if (slide_page_nation === 1) {
        setSlide_api_list(slide_api_list.splice(3));
        setSlide_page_nation(Math.ceil(use_api_list.length / 3));
      } else {
        setSlide_api_list(slide_api_list.splice(3));
        setSlide_page_nation(slide_page_nation - 1);
      }
    }
  }, [slide_api_list && slide_page_nation, use_api_list]);

  return (
    <React.Fragment>
      <div className="working_activity_wrap">
        {slide_api_list.length !== 0 && (
          <div>
            <div
              class="slide_cnt svc_slide_cnt"
              style={{ display: "inline-flex" }}
            >
              <div>
                <img
                  class="act_arrow_img act_prev_arrow_img"
                  src="../image/Center/Dashboard/main_left.png"
                  alt="left"
                  onClick={image_left_btn}
                />
              </div>
              <span class="slide_now">
                {slide_api_list.length === 0 ? 0 : slide_page_nation}
              </span>
              /
              <span class="slide_max">
                {Math.ceil(use_api_list.length / 3)}
              </span>
              <div>
                <img
                  class="act_arrow_img act_next_arrow_img"
                  src="../image/Center/Dashboard/main_right.png"
                  alt="right"
                  onClick={image_right_btn}
                />
              </div>
            </div>
          </div>
        )}
        <div id="svc_act_title_slide" className="act_title clearfix">
          <p>사용 API</p>
        </div>
        {defaultListLogic === true &&
        <>
        {defaultList.length !== 0 ?
          slide_api_list.map((c) => {
            return (
              <Service_image_nation
                slide_api_info={c}
                service_appr_info={service_appr}
                key={slide_api_list.pdsvc_idx}
              />
            );
          }) : (
            <div className="svccenter_using_api_empty">
              <div>
                <img src={svccenter_using_api_empty} alt=""/>
                <span>사용중인 API가 없습니다.</span>
              </div>
              <Link to="/svccenter/product">
                <button>API 신청하기</button>
              </Link>
            </div>
          )
        }
        </>
        }
      </div>
    </React.Fragment>
  );
};

export default Dashboard_act;

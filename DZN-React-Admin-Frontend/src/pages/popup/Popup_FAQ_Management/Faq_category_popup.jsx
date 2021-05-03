import React, { useCallback, useState, useEffect, useRef } from 'react';
import Faq_posts_delete_category from "./Faq_posts_delete_category";
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import CategoryMap from './Category_list';
import axios from 'axios';
import { Server_ajax_post, Server_ajax_get } from '../../../../Server_ajax';

const Faq_category_popup = (props) => {
    const { categoryClick, setCategoryClick } = props
    const [ category, setCategory ] = useState([]);
    const [delArray,setDelArray] = useState([]);
    const [ categorySaveLogic, setCategorySaveLogic ] = useState(false);
    let valueLogic = false; //유효성 검사

  const [rending, setRending] = useState(false);
    
    const sub_cate_name = useRef([]);


    const Image_close_popup = useCallback(() => {
        const Admin_user_faq_category_popup_bgk = document.getElementById("Admin_user_faq_category_popup_bgk");
        Admin_user_faq_category_popup_bgk.style.display = "none";
    }, []);

    const cateInputChange = () => {
        setCategory([]);
        category.map((item, idx) => {
            setCategory((category) => [...category, {
              code_idx: item.code_idx,
                sub_cate_name: sub_cate_name.current[idx].value,
            }])
        })
        setRending(true);
    }

    const handleAddCallNumPrice = useCallback(() => {
        setCategory([...category, {
            sub_cate_name: ''
        }])
    }, [category]);

    // const handleRemoveCallNumPrice = useCallback((e) => {
    //     const newPayInfoData = category.filter((item, index) => {
    //         return index !== Number(e.target.value)
    //     })
    //     setCategory(() => newPayInfoData);
    // }, [category]);

      // 결제정보 라이선스 방식 삭제 기능
  const handleRemoveCallNumPrice = useCallback(
    (idx, list_cnt) => () => {
        category.map((val, cnt) => {
        if (Number(list_cnt) === cnt) {
          setCategory(category.splice(category.splice(cnt, 1)));
        }
      });
      if (idx) {
        setDelArray(() => [...delArray, idx]);
      }
    },
    [category]
  );

    useEffect(() => {
        (async function () {
            try {
              const faq_category_list = await Server_ajax_get(
                `contents_management/faq_category_list`
              );
              setRending(false);
              setCategory(() => faq_category_list);
            } catch (e) {
              return console.error(e);
            }
          })();
      }, [categoryClick === true || rending == true]);



    //   const Image_ok_popup = useCallback(() => {
    //     let params = {
    //         datas: category            
    //     };
    //     (async function () {
    //         try {
    //           await Server_ajax_post(`contents_management/delete_category`);
    //           const add_category = await Server_ajax_post(`contents_management/add_category`, params);
    //           setCategory(add_category);
    //         } catch (e) {
    //           return console.error(e);
    //         }
    //       })();
        
    //     //Close
    //     Image_close_popup();
    // },[category]);



    // 적용하기 버튼
  const ModifySaveEvtBtn = () => {
    category.map((item, idx) => { //유효성 검사
    if(!sub_cate_name.current[idx].value){ // 한개라도 비어있으면 true로 변환
      valueLogic = true;
      alert("카테고리 목록을 모두 작성해주세요."); 
    } 
  })
  if(valueLogic === false) {
    setCategory([]);
    category.map((item, idx) => {
      if (sub_cate_name.current[idx].value) {
        setCategory((category) => [
          ...category,
          {
            code_idx: item.code_idx,
            sub_cate_name: sub_cate_name.current[idx].value ? sub_cate_name.current[idx].value : undefined,
          },
        ]);
      } else {
        category.splice(category.splice(idx, 1));
      }
    });
    setCategorySaveLogic(true); // 적용하기 실행
  }
  };

  //적용하기 실행
  useEffect(() => {
    if (categorySaveLogic === true) {
      let datas = {
        categoryArray: category,
        delArray: delArray,
      };
      (async function () {
        try {
          await Server_ajax_post(
            `contents_management/add_category`,
            datas
          );
          const Admin_user_faq_category_popup_bgk = document.getElementById(
            "Admin_user_faq_category_popup_bgk"
          );
          Admin_user_faq_category_popup_bgk.style.display = "none";
            setCategorySaveLogic(false); // 적용하기 실행
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [categorySaveLogic]);


    return (
    <React.Fragment>
        <div className="admin_background_same_box" id="Admin_user_faq_category_popup_bgk">
            <div className="admin_pixed_popup_white_box">
                <div className="admin_service_center_middel_white_box" id="sp_middle_box">
                    <div className="admin_popup_head_line_box">
                        <h1>카테고리 추가</h1>
                        <div className="admin_popupClose_box">
                            <img onClick={Image_close_popup}
                                src={close_btn} alt="" />
                        </div>
                    </div>

                    <div className="admin_big_contents_box">
                        <div className="admin_popup_Contents_box" id="admin_api_Use_sp_box">
                            <div className="admin_Companion_box">
                                FAQ 카테고리
                            </div>
                            <div className="category_input_box">
                                {
                                    category && [].map.call(category, (item, index) => (
                                        <div className="Sales_info_payment_info_input" key={index}>
                                            <input ref={ el => sub_cate_name.current[index] = el }
                                                className="form_input form-control" type="text"
                                                name={`input_call_${index}`}
                                                value={item.sub_cate_name}
                                                placeholder={item.sub_cate_name}
                                                onChange={cateInputChange}
                                            />
                                            {
                                                ((category.length - 1) === index || (category.length === 1 && 0 === index)) &&
                                                <button value={index} onClick={handleAddCallNumPrice}>추가</button>
                                            }{
                                                (category.length > 1 && 0 <= index) &&
                                                <button value={index}  onClick={handleRemoveCallNumPrice(
                                                    item.code_idx,
                                                    index
                                                  )}>삭제</button>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="admin_popup_button_box">
                            <button className="admin_popup_first_btn" onClick={Image_close_popup} >취소</button>
                            <button className="admin_popup_second_btn" id="api_category_ok_btn" onClick={ModifySaveEvtBtn}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default Faq_category_popup;
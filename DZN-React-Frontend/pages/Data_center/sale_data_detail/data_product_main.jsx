import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import End_point_url_bgk from "../../popup/Small_popup/Data_End_point_url_popup_v1";
import End_point_url_bgk_v2 from "../../popup/Small_popup/Data_End_point_url_popup_v2";
import { Link } from "react-router-dom";
import { useDataCntrBaseInfoContext } from "./Basic_info";
import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";


const data_product_main = (props) => {
  const { 
    dtailDataLoadState,
    detailData,
    detailID,
    dzonID,
    setReRend,    
    setMainTitle
  } = props;
  

  const {
    pdbase_idx,
    dzon_data_idx,
    title, 
    accssGrant, 
    mangr_name, 
    mangr_tel, 
    mangr_email_1, 
    mangr_email_2, 
    creatr_name, 
    creatr_tel, 
    creatr_email_1, 
    creatr_email_2,
    creatr_url, 
    regstr_name, 
    regstr_tel, 
    regstr_email_1, 
    regstr_email_2, 
    regstr_url, 
    data_desc, 
    data_Lang, 
    dataCateSel, 
    dataTypeSel, 
    keywords, 
    landingPage, 
    license, 
    copyright,
    mbr_idx,
    saleBeginDt
  } = useDataCntrBaseInfoContext(); 


  const [deployPeroidList, setDeployPeroidList] = useState([]);
  const [deployPeroid, setDeployPeroid] = useState('');
  const [deployPeroidLoad, setDeployPeroidLoad] = useState(false);
  const [endPointUrl, setEndPointUrl] = useState('');
  const endPointUrlRef = useRef('');
  const [endPointDesc, setEndPointDesc] = useState('');
  const [endPointUrlChk, setEndPointUrlChk] = useState('N');
  const inputGbn = useRef(false);
  const inputDirect = useRef('');
  const [deployPeroidInput, setDeployPeroidInput] = useState('');
  const Deploychkbx = useRef('');
  const [space_resolution, setSpace_resolution] = useState('');
  const [time_resolution, setTime_resolution] = useState('');
  const [space_info, setSpace_info] = useState('');
  const [time_info, setTime_info] = useState('');

  useEffect(() =>{
    setDeployPeroid(detailData.deployPeroid);
    setEndPointUrl(detailData.endPointUrl);
    setEndPointDesc(detailData.endPointDesc);
    setEndPointUrlChk(detailData.endPointUrlChk);
    setDeployPeroidInput(detailData.deployPeroid_desc);

    if(detailData.deployPeroid_desc !== ''){ 
      Deploychkbx.current.checked = true;
      inputGbn.current.disabled = true;
      //inputDirect.current.focus();
    }else{
      Deploychkbx.current.checked === false;
      inputGbn.current.disabled = false;
      //inputGbn.current.focus();
    }

    setSpace_resolution(detailData.space_resolution);
    setTime_resolution(detailData.time_resolution);
    setSpace_info(detailData.space_info);
    setTime_info(detailData.time_info);
  }
  ,[])





  useEffect(()=>{
    (async function () {
      try {
          const axios_host = await Server_ajax_get(`datacenter/getDeployPeroid`);
          
          if(axios_host) {
            setDeployPeroidList(deployPeroidList => [axios_host]);
            setDeployPeroidLoad(true);
          }          
      } catch (e) {
        console.error(e);
      }      
    })();    
  },[])


  const onChangeDeployPeriod = (e) => {
    setDeployPeroid(e.target.value);
  }
  
  const onChangeEndPointUrl = (e) => {
    setEndPointUrl(e.target.value);
  }
    
  const onChangeEndPointDesc = (e) => {
    setEndPointDesc(e.target.value);
  }

  const onChangeDeployPeroid_desc = (e) => {    
    if(e.target.checked === true){ 
      inputGbn.current.disabled = true;
      inputDirect.current.focus();
    }else if(e.target.checked === false){
      inputGbn.current.disabled = false;
      inputGbn.current.focus();
    }
  }

  const onChangeDeployPeriodInput = (e) => {
    setDeployPeroidInput(e.target.value);
  }

  const onChangeSpace_resolution = (e) => {
    setSpace_resolution(e.target.value);
  }

  const onChangeTime_resolution = (e) => {
    setTime_resolution(e.target.value);
  }
  
  const onChangeSpace_info = (e) => {
    setSpace_info(e.target.value);
  }
  
  const onChangeTime_info = (e) => {
    setTime_info(e.target.value);
  }

  
  const handleEndPointUrlDupChk = () => { 
    const End_point_url_bgk = document.getElementById(
      "Data_End_point_url_bgk_v1"
    );
    const End_point_url_bgk_v2 = document.getElementById(
      "Data_End_point_url_bgk_v2"
    );

    if(endPointUrl === ''){
      alert('엔드포인트URL을 작성해주세요');
      return;
    }    
      
    const params = {
      endPointUrl: endPointUrl,
      pdbase_idx: pdbase_idx,
    };

    (async function () {
      try {
        const axios_host = await Server_ajax_post(`datacenter/getEndPointUrlDupChk`, params);        
        
        if(axios_host){ //EndPointUrl 중복 
          endPointUrlRef.current.focus();
          End_point_url_bgk.style.display = "table";
        }else{
          End_point_url_bgk_v2.style.display = "table";
          setEndPointUrlChk('Y');
        }
            
      } catch (e) {
          return console.error(e);
      }
    })();
  };

  // 유효성 체크 검사
  const validationCheck = () => {
    if(title === ''){
      alert('제목을 입력 해주세요');
      return false;
    }
    if(mangr_name === ''){
      alert('담당자명을 입력 해주세요');
      return false;
    }
    if(mangr_tel === ''){
      alert('담당자 연락처를 입력 해주세요');
      return false;
    }
    if(mangr_email_1 === '' || mangr_email_2 === ''){
      alert('담당자 이메일을 입력 해주세요');
      return false;
    }

    if(creatr_name === ''){
      alert('데이터 생성자명을 입력 해주세요');
      return false;
    }
    if(creatr_tel === ''){
      alert('데이터 생성자 연락처를 입력 해주세요');
      return false;
    }
    if(creatr_email_1 === '' || creatr_email_2 === ''){
      alert('데이터 생성자 이메일을 입력 해주세요');
      return false;
    }
    if(creatr_url === ''){
      alert('데이터 생성자URL을 입력 해주세요');
      return false;
    }

    if(regstr_name === ''){
      alert('데이터 등록자명을 입력 해주세요');
      return false;
    }
    if(regstr_tel === ''){
      alert('데이터 등록자 연락처를 입력 해주세요');
      return false;
    }
    if(regstr_email_1 === '' || regstr_email_2 === ''){
      alert('데이터 등록자 이메일을 입력 해주세요');
      return false;
    }
    if(regstr_url === ''){
      alert('데이터 등록자URL을 입력 해주세요');
      return false;
    }
    
    if(data_desc === ''){
      alert('설명을 입력 해주세요');
      return false;
    }
    if(keywords === ''){
      alert('키워드를 입력 해주세요');
      return false;
    }
    if(landingPage === ''){
      alert('랜딩페이지를 입력 해주세요');
      return false;
    }

    if(endPointUrl !== '' && endPointUrlChk !== 'Y'){
      alert('엔드포인트URL 중복확인을 해주세요');
      return false;
    }
    return true
  }

  // 가본정보 저장
  const saveDefaultInfo = () => { 
    if(validationCheck() === false) {
      return true;
    }
        
    (async function () {      
      try {
        const datas = {
          pdbase_idx: pdbase_idx,          
          data_title: title, 
          accss_grant: accssGrant, 
          mbr_idx: mbr_idx,
          mangr_name: mangr_name, 
          mangr_tel: mangr_tel, 
          mangr_email: mangr_email_1+'@'+mangr_email_2,
          creatr_name: creatr_name, 
          creatr_tel: creatr_tel, 
          creatr_email: creatr_email_1+'@'+creatr_email_2,
          creatr_url: creatr_url, 
          regstr_name: regstr_name, 
          regstr_tel: regstr_tel, 
          regstr_email: regstr_email_1+'@'+regstr_email_2,
          registr_url: regstr_url, 
          data_desc: data_desc, 
          data_Lang: data_Lang, 
          data_cate: dataCateSel, 
          data_Type: dataTypeSel, 
          keywords: keywords, 
          landingPage: landingPage, 
          license: license, 
          copyright: copyright,
          endPointUrl: endPointUrl,
          endPointDesc: endPointDesc,
          endPointUrlChk: endPointUrlChk,
          deployPeroid: deployPeroid,
          deployPeroid_desc: deployPeroidInput,
          space_resolution: space_resolution,
          time_resolution: time_resolution,
          space_info: space_info,
          time_info: time_info,
          saleBeginDt: saleBeginDt,
          initSaleInfo: 'false'
        };
        
        const axios_host = await Server_ajax_post(`datacenter/setDataCenterBasicInfo`, datas);

        if(axios_host.affectedRows > 0){
          return false;
        }
      } catch (e) {
        console.error(e);
      }
    })();  
  }

  // 저장 버튼 클릭시 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();

    if(saveDefaultInfo() !== true){
      setReRend(true);    
    }

    const nav_link = document.querySelectorAll(".nav-link");
    const tab_pane = document.querySelectorAll(".tab-pane");
    for (let i = 0; i < nav_link.length; i++) {
      nav_link[i].setAttribute("aria-selected", "false");
      nav_link[i].setAttribute("tabindex", "-1");
      nav_link[i].classList.remove("active");
      tab_pane[i].setAttribute("aria-hidden", "true");
      tab_pane[i].classList.remove("active", "show"); 
    }   
    const st = document.getElementById("uncontrolled-tab-example-tab-sale");
    const st_tab = document.getElementById("uncontrolled-tab-example-tabpane-sale"); 
    st.setAttribute("aria-selected", "true");
    st.removeAttribute("tabindex");
    st.classList.add("active");
    st_tab.setAttribute("aria-hidden", "false");
    st_tab.classList.add("active", "show");    
  }
  
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
          <End_point_url_bgk endPointUrlRef={endPointUrlRef}/> {/* url이 증복인 경우 팝업 확인 후 리셋 */}
          <End_point_url_bgk_v2 /> {/* url이 사용 가능한 url 일때 */}

          <div className="exposure_info_wrap">
            <div className="exposure_info_title_wrap">
              <p>추가정보</p>
            </div>
            <div className="exposure_info_input_wrap">
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">엔드포인트URL</div>
                <div className="exposure_info_input_right_wrap">
                  <div className="sp_endpoint_box_url">
                    <p>https://developers.wehago.com/</p>
                    <Form.Control
                      type="text"
                      ref={endPointUrlRef}
                      className="form_input"
                      placeholder="API 호출 URL은 제공 뒷부분에 호출되는 정보입니다."
                      value={endPointUrl} onChange={onChangeEndPointUrl}
                    />
                    <Button onClick={handleEndPointUrlDupChk}>증복확인</Button>
                  </div>
                  <p className="sp_end_text_point">
                    ※ 확정되지 않은 경우라도 예상되는 API 호출 URL 기입 필요합니다.
                  </p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">엔드포인트 설명</div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control
                    as="textarea"
                    rows="5"
                    placeholder="API 호출과 관련한 부가 설명을 작성하세요."
                    value={endPointDesc} onChange={onChangeEndPointDesc} 
                  />
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">배포주기</div>
                <div className="exposure_info_input_right_wrap">
                  <div className="sp_select_input_box">
                    <Form.Control ref={inputGbn} as="select" value={deployPeroid} onChange={onChangeDeployPeriod} >
                      <option>배포주기 선택</option>
                      {
                        deployPeroidLoad === true && (
                          deployPeroidList[0].map((itm, idx) => 
                              <option key={idx} value={itm.sub_cate_code} >{itm.sub_cate_name}</option>    
                          )
                        )
                      }  
                    </Form.Control>
                    <div className="checkbox_wrap" id="sp_add_import_check">
                      <input ref={Deploychkbx} type="checkbox" name='DirectInput' id="delete_center_check_3" value='DirectInput' onChange={onChangeDeployPeroid_desc} />
                      <label
                        className="checkbox_design"
                        htmlFor="delete_center_check_3"
                      >
                        직접 입력
                      </label>
                    </div>
                    <Form.Control ref={inputDirect} type="text" className="form_input" value={deployPeroidInput} onChange={onChangeDeployPeriodInput} />
                  </div>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">공간해상도</div>
                <div className="exposure_info_input_right_wrap">
                  <div className="same_sp_input_box">
                    <Form.Control
                      type="text"
                      className="form_input"
                      placeholder="공간정보가 있는 경우 작성하세요."
                      value={space_resolution} onChange={onChangeSpace_resolution}
                    />
                    <p>※ 공간정보를 표현하는 기본 단위입니다.</p>
                  </div>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">시간해상도</div>
                <div className="exposure_info_input_right_wrap">
                  <div className="same_sp_input_box">
                    <Form.Control
                      type="text"
                      className="form_input"
                      placeholder="예: PnYnMnDTnHnsMnS 형식으로 PT130S면 130초"
                      value={time_resolution} onChange={onChangeTime_resolution}
                    />
                    <p>※ 시간 정보를 표현하는 기본 단위입니다.</p>
                  </div>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">공간정보</div>
                <div className="exposure_info_input_right_wrap">
                  <div className="same_sp_input_box">
                    <Form.Control
                      type="text"
                      className="form_input"
                      placeholder="자유양식으로 위경도 정도 작성하세요."
                      value={space_info} onChange={onChangeSpace_info}
                    />
                    <p>※ 자유양식으로 위경도 정도 작성하세요.</p>
                  </div>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">시간정보</div>
                <div className="exposure_info_input_right_wrap">
                  <div className="same_sp_input_box">
                    <Form.Control
                      type="text"
                      className="form_input"
                      placeholder="예: start YYY-MM-DD, end YYY-MM-DD"
                      value={time_info} onChange={onChangeTime_info}
                    />
                    <p>※ 자유양식으로 시작과 끝이 있는 경우 작성하세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button_s_box" id="sale_make_box_button">
            <Link to="/datacenter/purchasedata">
              <button className="not_search_btn" type="submit">
                목록
              </button>
            </Link>            
            <button className="search_btn" type="submit">
              저장
            </button>            
          </div>
          
      </form>
    </React.Fragment>
  );
};

export default data_product_main;
 
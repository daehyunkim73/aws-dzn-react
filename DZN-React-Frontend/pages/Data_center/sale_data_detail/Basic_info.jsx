import React, { createContext, useEffect, useState, useRef, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Data_product_main from './data_product_main';
import { Server_ajax_get, Server_ajax_post } from '../../../server_ajax';

const DataCntrBaseInfoContext = createContext();

const Basic_info = (props) => {
  const { 
    dtailDataLoadState,
    detailData,
    detailID,
    dzonID,
    setReRend,
    setMainTitle,    
    state
  } = props;

  const [pdbase_idx, setPdbase_idx] = useState('');
  const [dzon_data_idx, setDzon_data_idx] = useState('');
  const [title, setTitle] = useState('');
  const [accssGrant, setAccssGrant] = useState('');
  const [mbr_idx, setMbr_idx] = useState('');
  const [mangr_name, setMangr_name] = useState('');
  const [mangr_tel, setMangr_tel] = useState('');
  const [mangr_email_1, setMangr_email_1] = useState('');
  const [mangr_email_2, setMangr_email_2] = useState('');
  let mangr_email_arr = [];
  const [creatr_name, setCreatr_name] = useState('');
  const [creatr_tel, setCreatr_tel] = useState('');
  const [creatr_email_1, setCreatr_email_1] = useState('');
  const [creatr_email_2, setCreatr_email_2] = useState('');
  let creatr_email_arr = [];
  const [creatr_url, setCreatr_url] = useState('');
  const [regstr_name, setRegstr_name] = useState('');
  const [regstr_tel, setRegstr_tel] = useState('');
  const [regstr_email_1, setRegstr_email_1] = useState('');
  const [regstr_email_2, setRegstr_email_2] = useState('');
  let regstr_email_arr = [];
  const [regstr_url, setRegstr_url] = useState('');
  const [data_desc, setData_desc] = useState('');
  const mangr_email_input = useRef(null);
  const [data_Lang, setData_Lang] = useState('');
  const [dataGbnCateList, setDataGbnCateList] = useState([]);
  const [dataCateSel, setDataCateSel] = useState('');
  const [cateLoad, setCateLoad] = useState(false);
  const [dataTypeSel, setDataTypeSel] = useState('');
  const [keywords, setKeywords] = useState('');
  const [landingPage, setLandingPage] = useState('');
  const [license, setLicense]  = useState('');
  const [copyright, setCopyright]  = useState('');
  const [saleBeginDt, setSaleBeginDt]  = useState('');


  const accGrantArr = [
    {name: "Public", value: "Public"},
    {name: "Private", value: "Private"},
    {name: "Commercial", value: "Commercial"}
  ];

  const emailArr = [
    {name: "????????????", value: ""},
    {name: "naver.com", value: "naver.com"}, 
    {name: "nate.com", value: "nate.com"}, 
    {name: "hanmail.net", value: "hanmail.net"},
    {name: "gmail.com", value: "gmail.com"}, 
    {name: "empal.com", value: "empal.com"}, 
    {name: "netian.com", value: "netian.com"}, 
    {name: "dreamwiz.com", value: "dreamwiz.com"}, 
    {name: "hitel.net", value: "hitel.net"} 
  ];

  //?????????-D, ??????-T, ??????-M, ?????????-R
  const data_Type_Arr = [
    {name: "?????????", value: "D"},
    {name: "??????", value: "T"},
    {name: "??????", value: "M"},
    {name: "?????????", value: "R"}
  ];


  useEffect(() =>{
    setPdbase_idx(detailData.pdbase_idx);
    setDzon_data_idx(detailData.dzon_data_idx);
    setTitle(detailData.data_title);
    setAccssGrant(detailData.accss_grant);
    setMangr_name(detailData.mangr_name);
    setMangr_tel(detailData.mangr_tel);

    mangr_email_arr = detailData.mangr_email.split('@');
    Array.isArray(mangr_email_arr) === true && 
      setMangr_email_1(mangr_email_arr[0])
      setMangr_email_2(mangr_email_arr[1])
    || Array.isArray(mangr_email_arr) === false && 
      setMangr_email_1(detailData.mangr_email)
    
    setCreatr_name(detailData.creatr_name);  
    setCreatr_tel(detailData.creatr_tel);  

    creatr_email_arr = detailData.creatr_email.split('@');
    Array.isArray(creatr_email_arr) === true && 
      setCreatr_email_1(creatr_email_arr[0])
      setCreatr_email_2(creatr_email_arr[1])
    || Array.isArray(creatr_email_arr) === false && 
      setCreatr_email_1(detailData.creatr_email)

    setCreatr_url(detailData.creatr_url);
    setRegstr_name(detailData.regstr_name);
    setRegstr_tel(detailData.regstr_tel);

    regstr_email_arr = detailData.regstr_email.split('@');
    Array.isArray(regstr_email_arr) === true && 
      setRegstr_email_1(regstr_email_arr[0])
      setRegstr_email_2(regstr_email_arr[1])
    || Array.isArray(regstr_email_arr) === false && 
      setRegstr_email_1(detailData.creatr_email)

    setRegstr_url(detailData.registr_url);
    setData_desc(detailData.data_desc);
    setData_Lang(detailData.data_Lang);
    setDataCateSel(detailData.data_cate);
    setDataTypeSel(detailData.data_Type);
    setKeywords(detailData.keywords);
    setLandingPage(detailData.landingPage);
    setLicense(detailData.license);
    setCopyright(detailData.copyright);
    setMbr_idx(detailData.mbr_idx);
    setSaleBeginDt(detailData.saleBeginDt);
  }
  ,[])





  useEffect(()=>{
    (async function () {
      try {        
        const axios_host = await Server_ajax_get(`datacenter/getDataGbnCate`);
        setDataGbnCateList(dataGbnCateList => [...dataGbnCateList, axios_host]);
        setCateLoad(true);
      } catch (e) {
        console.error(error);
      }
    })();
  },[])

 


  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeMangr_name = (e) => {
    setMangr_name(e.target.value);
  }

  const onChangeMangr_tel = (e) => {
    setMangr_tel(e.target.value);
  }
  
  const onChangeMangr_email_1 = (e) => {
    setMangr_email_1(e.target.value);
  }

  const onChangeMangr_email_2 = (e) => {
    setMangr_email_2(e.target.value);
  }
    
  const onChangeCreatr_name = (e) => {
    setCreatr_name(e.target.value);
  }

  const onChangeCreatr_tel = (e) => {
    setCreatr_tel(e.target.value);
  }

  const onChangeCreatr_email_1 = (e) => {
    setCreatr_email_1(e.target.value);
  }

  const onChangeCreatr_email_2 = (e) => {
    setCreatr_email_2(e.target.value);
  }

  const onChangeCreatr_url = (e) => {
    setCreatr_url(e.target.value);
  }
  
  const onChangeRegstr_name = (e) =>{
    setRegstr_name(e.target.value);
  }

  const onChangeRegstr_tel = (e) =>{
    setRegstr_tel(e.target.value);
  } 
  
  const onChangeRegstr_email_1 = (e) =>{
    setRegstr_email_1(e.target.value);
  } 

  const onChangeRegstr_email_2 = (e) =>{
    setRegstr_email_2(e.target.value);
  } 
 
  const onChangeRegstr_url = (e) =>{
    setRegstr_url(e.target.value);
  } 
  
  const onChangeAccssGrant = (e) =>{
    setAccssGrant(e.target.value);
  } 

  const onChangeData_desc = (e) => {
    setData_desc(e.target.value);
  }

  const onSelectMangr_email_sample = (e) => {
    if(e.target.value === '????????????'){
      setMangr_email_2('');
      //mangr_email_input.current.value = '';
      mangr_email_input.current.focus();
    }
  }

  const onSelectCreatr_email_sample = (e) => {
    e.target.value === '????????????' && setCreatr_email_2('');
  }

  const onSelectRegstr_email_sample = (e) => {
    e.target.value === '????????????' && setRegstr_email_2('');
  }
  
  const onChangeData_Lang = (e) => {
    setData_Lang(e.target.value);
  }

  const onChangeDataCateSel = (e) => {
    setDataCateSel(e.target.value);
  }

  const onChangeDataType = (e) => {
    setDataTypeSel(e.target.value);
  }

  const onChangeKeywords = (e) => {
    setKeywords(e.target.value);
  }
  
  const onChangeLandingPages = (e) => {
    setLandingPage(e.target.value);
  }
  
  const onChangeLicense = (e) => {
    setLicense(e.target.value);
  }
  
  const onChangeCopyright = (e) => {
    setCopyright(e.target.value);
  }



  


  return (
    
    <React.Fragment>
        <DataCntrBaseInfoContext.Provider
          value={{
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
          }}
        >

          <div className="exposure_info_wrap">
            <div className="exposure_info_title_wrap">
              <p>????????????</p>
              <span className="exposure_text">
                ??? ?????? ?????? ???????????????.
            </span>
            </div>
            <div className="exposure_info_input_wrap">

              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">?????? <span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control type="text" className="form_input" placeholder="?????? 100????????? ?????? ???????????????." value={title} onChange={onChangeTitle}/>
                  <p>??? ???????????? ?????? ???????????? ???????????? ???????????? ???????????? ????????? ??????????????? ?????????.</p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????????</div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control as="select" value={accssGrant} onChange={onChangeAccssGrant}>
                    <option value=''>???????????? ??????</option>
                    {
                      dtailDataLoadState === true && (
                        accGrantArr.map((itm, idx) => 
                            //<option key={idx} value={itm.value} selected={itm.value === accssGrant ? 'selected' : ''}>{itm.name}</option>    
                            <option key={idx} value={itm.value} >{itm.name}</option>    
                        )
                      )
                    }
                  </Form.Control>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????? ????????? <span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <div className="privacy_wrap">
                    <Form.Control type="text" className="form_input" placeholder="????????? ???????????????." value={mangr_name} onChange={onChangeMangr_name} />
                    <Form.Control type="text" className="form_input privacy_phone_number " placeholder="??????????????? ???????????????." value={mangr_tel} onChange={onChangeMangr_tel} />
                    <Form.Control type="text" className="form_input privacy_email" placeholder="????????? ???????????????." value={mangr_email_1} onChange={onChangeMangr_email_1} />
                    <div>@</div>
                    <input ref={mangr_email_input} list="email_address" className="privacy_email_address" name="email_address" value={mangr_email_2} onChange={onChangeMangr_email_2} onSelect={onSelectMangr_email_sample} />
                    <datalist id="email_address" >
                      <option value="????????????" />
                      <option value="naver.com" />
                      <option value="nate.com" />
                      <option value="hanmail.net" />
                      <option value="gmail.com" />
                      <option value="empal.com" />
                      <option value="netian.com" />
                      <option value="dreamwiz.com" />
                      <option value="hitel.net" />
                    </datalist>
                  </div>

                  <p>??? ???????????? ????????? ???????????? ????????? ???????????????..</p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????? ????????? <span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <div className="privacy_wrap">
                    <Form.Control type="text" className="form_input" placeholder="????????? ???????????????." value={creatr_name} onChange={onChangeCreatr_name}  />
                    <Form.Control type="text" className="form_input privacy_phone_number " placeholder="??????????????? ???????????????." value={creatr_tel} onChange={onChangeCreatr_tel}  />
                    <Form.Control type="text" className="form_input privacy_email" placeholder="????????? ???????????????." value={creatr_email_1} onChange={onChangeCreatr_email_1} />
                    <div>@</div>
                    <input list="email_address" className="privacy_email_address" name="email_address" value={creatr_email_2} onChange={onChangeCreatr_email_2}  onSelect={onSelectCreatr_email_sample} />
                    <datalist id="email_address">
                      <option value="????????????" />
                      <option value="naver.com" />
                      <option value="nate.com" />
                      <option value="hanmail.net" />
                      <option value="gmail.com" />
                      <option value="empal.com" />
                      <option value="netian.com" />
                      <option value="dreamwiz.com" />
                      <option value="hitel.net" />
                    </datalist>
                  </div>
                  <Form.Control type="text" className="form_input" placeholder="???????????? ????????????(???:https://"  value={creatr_url} onChange={onChangeCreatr_url} />

                  <p>??? ???????????? ?????? ??? ???????????? ?????? ?????? ????????? ???????????????.</p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????? ????????? <span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <div className="privacy_wrap">
                    <Form.Control type="text" className="form_input" placeholder="????????? ???????????????." value={regstr_name} onChange={onChangeRegstr_name} />
                    <Form.Control type="text" className="form_input privacy_phone_number " placeholder="??????????????? ???????????????."  value={regstr_tel} onChange={onChangeRegstr_tel} />
                    <Form.Control type="text" className="form_input privacy_email" placeholder="????????? ???????????????." value={regstr_email_1} onChange={onChangeRegstr_email_1} />
                    <div>@</div>
                    <input list="email_address" className="privacy_email_address" name="email_address" value={regstr_email_2} onChange={onChangeRegstr_email_2}  onSelect={onSelectRegstr_email_sample} />
                    <datalist id="email_address">
                      <option value="????????????" />
                      <option value="naver.com" />
                      <option value="nate.com" />
                      <option value="hanmail.net" />
                      <option value="gmail.com" />
                      <option value="empal.com" />
                      <option value="netian.com" />
                      <option value="dreamwiz.com" />
                      <option value="hitel.net" />
                    </datalist>
                  </div>
                  <Form.Control type="text" className="form_input" placeholder="???????????? ????????????(???:https://"  value={regstr_url} onChange={onChangeRegstr_url}  />

                  <p>??? ???????????? ???????????? ?????? ?????? ????????? ???????????????.</p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">?????? <span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control as="textarea" rows="5" placeholder="???????????? ?????? ???????????? ????????? ????????? ??????????????? ?????????." value={data_desc} onChange={onChangeData_desc}  />
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????????</div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control type="text" className="form_input" placeholder="dataset??? ??????????????? ???????????? ???????????????."  value={data_Lang} onChange={onChangeData_Lang}  />
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????????</div>
                <div className="exposure_info_input_right_wrap exposure_info_input_right_right_wrap">
                  <Form.Control as="select" value={dataCateSel} onChange={onChangeDataCateSel}>
                    <option>???????????? ??????</option>
                    {
                      cateLoad === true && (
                        dataGbnCateList[0].map((itm, idx) => 
                            <option key={idx} value={itm.sub_cate_code} >{itm.sub_cate_name}</option>    
                        )
                      )
                    }                
                  </Form.Control>
                  <div className="type_select">
                    <p>??????<span className="red">*</span></p>
                    <Form.Control as="select" value={dataTypeSel} onChange={onChangeDataType}>
                      <option>?????? ??????</option>
                      {
                        data_Type_Arr.map((itm, idx) => 
                            <option key={idx} value={itm.value} >{itm.name}</option>    
                        )
                      }   
                    </Form.Control>
                  </div>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">?????????<span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control type="text" className="form_input" placeholder="?????????(,)??? ?????? (??? : ??????, ??????, ??????, ????????????????????????)"  value={keywords} onChange={onChangeKeywords}  />
                  <p>??? ???????????? ?????? ?????? ???????????? ???????????? ???????????? ?????? ????????? ???????????? ????????? 10??? ?????? ????????? ?????????.</p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">?????? ????????? <span>*</span></div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control type="text" className="form_input" placeholder="https://developers.wehago.com/" value={landingPage} onChange={onChangeLandingPages}  />
                  <p>??? ???????????? URL ????????? ???????????? ?????? ????????? ????????? ??? ????????????.</p>
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">????????????</div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control type="text" className="form_input" placeholder="???????????? ?????? ??????, ????????? ?????? ?????? ?????? ????????????, ????????? ?????? ????????? ???????????????. (???: by CC)" value={license} onChange={onChangeLicense}  />
                </div>
              </div>
              <div className="exposure_info_input_table_wrap">
                <div className="exposure_info_input_left_wrap">??????</div>
                <div className="exposure_info_input_right_wrap">
                  <Form.Control type="text" className="form_input" placeholder="Copyright??? ???????????????.(???: Copyright 2020. ???????????????)" value={copyright} onChange={onChangeCopyright}   />
                </div>
              </div>
            </div>
    
          <Data_product_main dtailDataLoadState={dtailDataLoadState} detailData={detailData} detailID={detailID} dzonID={dzonID} setReRend={setReRend} setMainTitle={setMainTitle}/>
        </div>

      </DataCntrBaseInfoContext.Provider>
    </React.Fragment>
    
  );
}

export default Basic_info;

export function useDataCntrBaseInfoContext() {
  return useContext(DataCntrBaseInfoContext);
}

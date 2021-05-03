import React, { useEffect, useState, useContext, createContext } from "react";
import Authority_setting_detail_first from "./Authority_setting_detail_first";
import Authority_setting_detail_two from "./Authority_setting_detail_two";
import Authority_setting_detail_three from "./Authority_setting_detail_three";
import { useCookies } from "react-cookie";
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈
import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";
import { useCallback } from "react";

const settingContext = createContext();
const Authority_setting = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  //wehago_s,  h_portal_id,  h_selected_company_no,  cell_company_no,  AUTH_R_TOKEN,  AUTH_A_TOKEN
  const globals = require("../../../lib/globals"); //로그인 모듈
  const [originalSvcData, setOriginalSvcData] = useState([]);
  const [originalPrdData, setOriginalPrdData] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [dataLogic, setDataLogic] = useState(false);
  const [crueInfo, setCrueInfo] = useState([]);
  const [filterCrueInfo, setFilterCrueInfo] = useState([]);
  const [authorityLogic, setAuthorityLogic] = useState(false);
  const [saveDataSetting, setSaveDataSetting] = useState(false);
  const [authInfo, setAuthInfo] = useState([]);
  const [treeLogic, setTreeLogic] = useState(false);
  const [prdSelect, setPrdSelect] = useState(""); //권한설정할 상품이 선택되어있는지 판단에 필요.
  //조직도 정보 로직
  const [treeOrigin, setTreeOrigin] = useState([]);
  const [svcClassify, setSvcClassify] = useState("");
  const [devClassify, setDevClassify] = useState("");
  const [menuClassify, setMenuClassify] = useState("");
  const [deletArray, setDeletArray] = useState([]);
  const [saveArray, setSaveArray] = useState([]);
  const [cno, setCno] = useState();
  const [originCrueInfo, setOriginCrueInfo] = useState([]);

  //조직도 정보 api
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectMenu = useCallback(
    (code) => {
      //메뉴별 권한 호출
      setAuthInfo([]);
      setSvcClassify("");
      setDevClassify("");
      setPrdSelect(code);
      setMenuClassify(code);
      let menu_code = code;
      let body = {
        menu_code: menu_code,
      };
      (async function () {
        try {
          const result = await Server_ajax_post("admin/menu_authInfo", body);
          setAuthInfo(result);
          setAuthorityLogic(!authorityLogic);
        } catch (e) {
          return console.error(e);
        }
      })();
    },
    [
      setAuthInfo,
      setSvcClassify,
      setDevClassify,
      setPrdSelect,
      setMenuClassify,
      setAuthorityLogic,
      authorityLogic,
    ]
  );
  const selectDev = useCallback(
    (idx) => {
      //데이터상품 권한 호출
      setAuthInfo([]);
      setMenuClassify("");
      setSvcClassify("");
      setPrdSelect(idx);
      setDevClassify(idx);
      let pdbase_idx = idx;
      let body = {
        pdbase_idx: pdbase_idx,
      };
      (async function () {
        try {
          const result = await Server_ajax_post(
            "admin/data_product_authInfo",
            body
          );
          setAuthInfo(result);
          setAuthorityLogic(!authorityLogic);
        } catch (e) {
          return console.error(e);
        }
      })();
    },
    [
      setAuthInfo,
      setMenuClassify,
      setSvcClassify,
      setPrdSelect,
      setDevClassify,
      setAuthorityLogic,
      authorityLogic,
    ]
  );
  const selectSvc = useCallback(
    (idx) => {
      //서비스상품 권한 호출
      setAuthInfo([]);
      setDevClassify("");
      setMenuClassify("");
      setPrdSelect(idx);
      setSvcClassify(idx);
      let pdsvc_idx = idx;
      let body = {
        pdsvc_idx: pdsvc_idx,
      };
      (async function () {
        try {
          const result = await Server_ajax_post(
            "admin/Service_product_authInfo",
            body
          );
          setAuthInfo(result);
          setAuthorityLogic(!authorityLogic);
        } catch (e) {
          return console.error(e);
        }
      })();
    },
    [
      setAuthInfo,
      setDevClassify,
      setMenuClassify,
      setPrdSelect,
      setSvcClassify,
      setAuthorityLogic,
      authorityLogic,
    ]
  );

  const saveAuth = useCallback(() => {
    if (svcClassify !== "") {
      //서비스상품 권한설정
      let body = { saveArray, deletArray, cno, svcClassify };
      (async function () {
        try {
          await Server_ajax_post("admin/authInfoSave_svc", body);
        } catch (e) {
          return console.error(e);
        }
      })();
    } else if (devClassify !== "") {
      //데이터상품 권한설정
      let body = { saveArray, deletArray, cno, devClassify };
      (async function () {
        try {
          await Server_ajax_post("admin/authInfoSave_dev", body);
        } catch (e) {
          return console.error(e);
        }
      })();
    } else if (menuClassify !== "") {
      //메뉴 권한설정
      let body = { saveArray, deletArray, cno, menuClassify };
      (async function () {
        try {
          await Server_ajax_post("admin/authInfoSave_menu", body);
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [svcClassify, devClassify, menuClassify, saveArray, deletArray, cno]);
  useEffect(() => {
    //매뉴, 데이터, 서비스 목록 호출
    (async function () {
      try {
        const result = await Server_ajax_get("admin/Service_product_list_auth");
        setOriginalSvcData(result);

        const result1 = await Server_ajax_get("admin/Data_product_list_auth");
        setOriginalPrdData(result1);

        const result2 = await Server_ajax_get("admin/menu_list_auth");
        setMenuList(result2);

        setDataLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);
  useEffect(() => {
    //직원정보 API 결과 중 주부서인것만 필터
    setCrueInfo([]);
    originCrueInfo
      .filter((x) => {
        return x.is_primary === "T" && x.employee_status === 2;
      })
      .map((c) => {
        setCrueInfo((crueInfo) => [...crueInfo, c]);
      });
  }, [authorityLogic === true]);

  useEffect(() => {
    //직원정보 및 조직도 호출
    const idx = cookies.h_selected_company_no;
    const employeeStatus = 2;
    setCno(idx);
    const subUrl = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree/employee`;
    const subUrl1 = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree?employeeStatus=${employeeStatus}&portalIdYn=Y`;
    Ajax.get(subUrl)
      .then(function (response) {
        let result = JSON.parse(response);
        setOriginCrueInfo(result.resultData);
        setAuthorityLogic(!authorityLogic);
      })
      .catch((e) => {
        console.log(e);
      });
    Ajax.get(subUrl1)
      .then(function (response) {
        let result = JSON.parse(response);
        setTreeOrigin(result.resultData);
        setTreeLogic(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    //db에서 가져온 권한목록에 따른 필터
    setFilterCrueInfo([]);
    authInfo.map((s) => {
      crueInfo
        .filter((x) => {
          return x.portal_id === s.mbr_id;
        })
        .map((c) => {
          setFilterCrueInfo((filterCrueInfo) => [...filterCrueInfo, c]);
        });
    });
    setSaveDataSetting(!saveDataSetting);
  }, [authorityLogic]);

  useEffect(() => {
    //저장대기배열
    setSaveArray([]);
    filterCrueInfo.map((c) => {
      setSaveArray((saveArray) => [...saveArray, c.portal_id]);
    });
  }, [saveDataSetting]);

  return (
    <React.Fragment>
      <settingContext.Provider
        value={{
          originalSvcData,
          setOriginalSvcData,
          setAuthInfo,
          authInfo,
          setAuthorityLogic,
          authorityLogic,
          filterCrueInfo,
          treeOrigin,
          setTreeOrigin,
          treeLogic,
          crueInfo,
          setCrueInfo,
          filterCrueInfo,
          setFilterCrueInfo,
          prdSelect,
          setPrdSelect,
          originalPrdData,
          menuList,
          selectMenu,
          selectDev,
          selectSvc,
          svcClassify,
          setSvcClassify,
          devClassify,
          setDevClassify,
          menuClassify,
          setMenuClassify,
          deletArray,
          setDeletArray,
          saveAuth,
          saveArray,
          setSaveArray,
          setSaveDataSetting,
          saveDataSetting,
          cno,
        }}
      >
        <div className="Authority_setting_wrap">
          <div className="page_title_wrap">
            <p className="page_title">권한관리</p>
            <div className="page_title_btn">
              <p>Home</p>
              <img
                className="caption_img"
                src="../image/Center/Dashboard/view_more.png"
              />
              <p>회사설정</p>
              <img
                className="caption_img"
                src="../image/Center/Dashboard/view_more.png"
              />
              <p>권한관리</p>
            </div>
          </div>
          <div className="sale_create_data_detail_wrap ">
            <Authority_setting_detail_first />
          </div>
          <div>
            <Authority_setting_detail_two />
          </div>
          <div className="cs">
            <Authority_setting_detail_three />
          </div>
        </div>
      </settingContext.Provider>
    </React.Fragment>
  );
};

export default Authority_setting;
export function usesettingContext() {
  return useContext(settingContext);
}

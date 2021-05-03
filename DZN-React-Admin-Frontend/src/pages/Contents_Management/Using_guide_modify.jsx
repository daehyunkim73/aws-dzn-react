import React, { useEffect, useState, useCallback } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Post_gaci from "../../Big_component/Post_gaci";
import Use_contents_delete_popup from "../popup/Popup_use_guide/Use_contents_delete_popup";
import Use_Modify_popup from "../popup/Popup_use_guide/Use_Modify_popup";
import Use_Preview_delete_popup from "../popup/Popup_use_guide/Use_Preview_popup";
import { useRef } from "react";
import { image_preview } from "../../../func_src/imageFile_preview";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router";
import { Server_ajax_post } from "../../../Server_ajax";

function Using_guide_Big() {
  const table_list_mondiy_delete = document.querySelectorAll(
    ".list_modify .table_delete_btn"
  );
  const Admin_user_Use_contents_Delete_popup_bgk = document.getElementById(
    "Admin_user_Use_contents_Delete_popup_bgk"
  );

  for (let i = 0; i < table_list_mondiy_delete.length; i++) {
    table_list_mondiy_delete[i].addEventListener("click", () => {
      Admin_user_Use_contents_Delete_popup_bgk.style.display = "table";
    });
  }
}

const Using_guide_modify = (props) => {
  const history = useHistory();
  const guideKey = props.match.params.useguide_mast_idx;
  const [guideMastContent, setGuideMastContent] = useState(); // 가이드 목차 내용
  const [guideMastContentValue, setGuideMastContentValue] = useState(); // 어느 가이드 목차 내용을 수정했는지 기억하는 value값
  const [guideTitle, setGuideTitle] = useState(); // 가이드 목차
  const [guideMainTitle, setGuideMainTitle] = useState(); // 가이드 타이틀
  const [guideMainTitleValue, setGuideMainTitleValue] = useState(); // 가이드 타이틀 값 ( 첫번째 에디터에 들어갈 값 )
  const [guideTitleLogic, setGuideTitleLogic] = useState(false);
  const [guideSaveLogic, setGuideSaveLogic] = useState(false);
  const [guideDelArray, setGuideDelArray] = useState([]); // 삭제한 목차 값을 저장하는 배열
  const [image_preview_data, setImage_preview_data] = useState([]);
  const [image_preview_state, setImage_preview_state] = useState(); // 몇번째 게시판에서 이미지를 추가했는지 기억
  const editor_ref = useRef();
   
  let valueLogic = false; //유효성 검사

  const guideMastContentRef = useRef();
  const guideTitleRef = useRef([]);
  const guideContentRef = useRef([]);

  useEffect(() => {
    Using_guide_Big();
    return () => {
      Using_guide_Big();
    };
  });

  useEffect(() => {
    // 값이 없으면 초기값 0 값이 있으면 저장된 값으로 받아옴
    console.log(guideKey);
    const data = {
      useguide_mast_idx: guideKey,
    };
    (async function () {
      try {
        console.log("sksksk32skskksksk");
        const service_by_id = await Server_ajax_post(
          `contents_management/getGuideDetailList`,
          data
        );
        if (service_by_id.length >= 1) {
          setGuideTitle((guideTitle) => service_by_id);
          setGuideMainTitleValue(service_by_id[0].title);
          setGuideMainTitle(service_by_id[0].main_title);
          setGuideTitleLogic(true);
          console.log("guideTitle", guideTitle);

          // const main_div = document.createElement("div"); // 가장 상단에 들어가는 설명 summernote
          // main_div.innerHTML = service_by_id[0].main_content;
          // guideMastContentRef.current.noteEditable[0]
          //   .querySelector("p")
          //   .append(main_div);
          // service_by_id.map((item, idx) => {
          //   const content_div = document.createElement("div"); // 여러개 추가할 수 있는 목차 summernote
          //   content_div.innerHTML = item.content;
          //   guideContentRef.current[idx].noteEditable.append(content_div);
          // });
        } else {
          setGuideTitle((guideTitle) => [
            {
              title: "",
              content: "",
            },
          ]);
          setGuideTitleLogic(true);
        }
      } catch (e) {
        return console.error(e);
      }
    })();

    (async function () {
      try {
        await Server_ajax_post(`contents_management/getGuideDetailList`, data);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  // 목차에 입력한 값을 인식하여 value 값을 바꿔줌 ( react에서 value 값을 지정하면 입력 못하는 오류로 인한 기능 )
  const handleGuideInputData = () => {
    setGuideTitle([]);
    guideTitle.map((item, idx) => {
      setGuideTitle((guideTitle) => [
        ...guideTitle,
        {
          title: guideTitleRef.current[idx].value,
          main_title: guideMainTitle,
          content: guideContentRef.current[idx].noteEditable[0].innerHTML,
          useguide_desc_idx: item.useguide_desc_idx,
        },
      ]);
    });
  };

  useEffect(() => {
    if (guideTitleLogic === true && guideTitle.length >= 1) {
      Object.values(guideTitle).map((item, idx) => {
        guideTitleRef.current[idx] =
          guideTitleRef.current[idx] || React.createRef();
        guideContentRef.current[idx] =
          guideContentRef.current[idx] || React.createRef();
      });
    } else {
      guideTitleRef.current[0] = guideTitleRef.current[0] || React.createRef();
      guideContentRef.current[0] =
        guideContentRef.current[0] || React.createRef();
    }
  }, [guideTitle]);

  // 결제정보 라이선스 방식 추가 기능
  const handleAddPayLic = useCallback(() => {
    setGuideTitle((guideTitle) => [
      ...guideTitle,
      {
        title: "",
        content: "",
      },
    ]);
  }, [guideTitle]);

  // 결제정보 라이선스 방식 삭제 기능
  const handleRemoveCallNumPrice = useCallback(
    (idx, list_cnt) => () => {
      guideTitle.map((val, cnt) => {
        if (Number(list_cnt) === cnt) {
          setGuideTitle(guideTitle.splice(guideTitle.splice(cnt, 1)));
        }
      });
      if (idx) {
        setGuideDelArray(() => [...guideDelArray, idx]);
      }
    },
    [guideTitle]
  );

  // 이미지 미리보기
  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        insertImage(reader.result);
      };
      reader.readAsDataURL(images[i]);
    }
  };

  // // 이미지 추가
  // const onImageUpload = (idx) => (fileList) => {
  //   setImage_preview_state(idx);
  //   const reader = new FormData();
  //   [].map.call(fileList, (file_info) => {
  //     reader.append("image", file_info);
  //     console.log("fileList", fileList);
  //   });
  //   image_preview(reader, setImage_preview_data);
  // };

  // // 이미지 미리보기
  // useEffect(() => {
  //   image_preview_data.map((c) => {
  //     const div = document.createElement("div");
  //     const img = document.createElement("img");
  //     img.className = "guide_image_fixed";
  //     img.src = `http://localhost:7081/uploade/image/${c}`;
  //     div.append(img);
  //     return guideContentRef.current[image_preview_state].noteEditable.append(
  //       div
  //     );
  //   });
  // }, [image_preview_data]);

  // 적용하기 버튼
  const ModifySaveEvtBtn = () => {
    guideTitle.map((item, idx) => { //유효성 검사
      if(!guideTitleRef.current[idx].value){ // 한개라도 비어있으면 true로 변환
        valueLogic = true;
      } 
    })
    if(valueLogic === true){
      alert("목차를 모두 작성해주세요."); 
      const Admin_user_Usemodify_popup_bgk = document.getElementById(
        "Admin_user_Usemodify_popup_bgk"
      );
      Admin_user_Usemodify_popup_bgk.style.display = "none";
    }
    else if (
      guideMastContentRef.current.noteEditable[0].innerHTML === "<p><br></p>" ||
      !guideMastContentRef.current.noteEditable[0].innerHTML
    ) {
      alert("가이드 설명을 작성해주세요.");
      const Admin_user_Usemodify_popup_bgk = document.getElementById(
        "Admin_user_Usemodify_popup_bgk"
      );
      Admin_user_Usemodify_popup_bgk.style.display = "none";
    } else {
      setGuideMastContent(
        guideMastContentRef.current.noteEditable[0].innerHTML
      );
      setGuideTitle([]);
      guideTitle.map((item, idx) => {
        if (guideTitleRef.current[idx].value) {
          console.log(guideContentRef.current[idx].noteEditable[0].innerHTML);
          setGuideTitle((guideTitle) => [
            ...guideTitle,
            {
              title: guideTitleRef.current[idx].value,
              content: guideContentRef.current[idx].noteEditable[0].innerHTML,
              useguide_desc_idx: item.useguide_desc_idx,
            },
          ]);
        } else {
          guideTitle.splice(guideTitle.splice(idx, 1));
        }
      });
      setGuideSaveLogic(true); // 적용하기 실행
    }
  };

  //적용하기 실행
  useEffect(() => {
    if (guideSaveLogic === true) {
      let datas = {
        useguide_mast_idx: guideKey,
        guideMastContent: guideMastContent,
        guideArray: guideTitle,
        guideDelArray: guideDelArray,
      };

      (async function () {
        try {
          await Server_ajax_post(
            `contents_management/postGuideDetailModify`,
            datas
          );
          const Admin_user_Usemodify_popup_bgk = document.getElementById(
            "Admin_user_Usemodify_popup_bgk"
          );
          Admin_user_Usemodify_popup_bgk.style.display = "none";
          history.push(`/admin/usingguide/detail/${guideKey}`);
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [guideSaveLogic === true]);

  const Modify_gaci_Click = () => {
    const Admin_user_Usemodify_popup_bgk = document.getElementById(
      "Admin_user_Usemodify_popup_bgk"
    );
    Admin_user_Usemodify_popup_bgk.style.display = "table";
  };

  const Use_preview_popup_Click = () => {
    setGuideTitle([]);
    guideTitle.map((item, idx) => {
      setGuideTitle((guideTitle) => [
        ...guideTitle,
        {
          title: guideTitleRef.current[idx].value,
          content: guideContentRef.current[idx].noteEditable[0].innerHTML,
          useguide_desc_idx: item.useguide_desc_idx,
          main_content: guideMastContentRef.current.noteEditable[0].innerHTML,
        },
      ]);
    });
    const Admin_user_Use_preview_delete_popup_bgk = document.getElementById(
      "Admin_user_Use_preview_delete_popup_bgk"
    );
    Admin_user_Use_preview_delete_popup_bgk.style.display = "table";
  };

  const onInit = (idx) => (func) => {
    guideTitle.map((item, cnt) => {
      if (idx === cnt && !guideTitle[cnt].content !== true ) {
        func.replace(item.content);
      }
    });
  };

  return (
    <React.Fragment>
      <Use_contents_delete_popup />
      <Use_Modify_popup ModifySaveEvtBtn={ModifySaveEvtBtn} />
      {guideTitleLogic === true && (
        <Use_Preview_delete_popup
          guideMainTitle={guideMainTitle}
          guideTitle={guideTitle}
        />
      )}
      <div className="using_guide_detail_wrap using_guide_modify_wrap">
        <div className="Page_same_text clearfix">
          <p className="backoffice_title">
            {guideTitleLogic === true && guideMainTitle}
          </p>
        </div>
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <div className="guide_list_wrap">
              <Jumbotron>
                <p className="guide_detail_box_title">목차</p>
                {guideTitleLogic === true &&
                  guideTitle.map((item, idx) => {
                    return (
                      <div className="list_modify" key={idx}>
                        <div className="list_modify_sub">
                          <input
                            type="text"
                            ref={(el) => (guideTitleRef.current[idx] = el)}
                            value={item.title}
                            onChange={handleGuideInputData}
                            className="form-control"
                            placeholder="목차를 입력해주세요."
                          />
                          {/* 0909 */}
                          {idx === guideTitle.length - 1 && (
                            <button
                              className="table_view_btn"
                              value={idx}
                              onClick={handleAddPayLic}
                            >
                              추가
                            </button>
                          )}

                          {guideTitle.length - 1 !== 0 && (
                            <button
                              className="table_view_btn"
                              onClick={handleRemoveCallNumPrice(
                                item.useguide_desc_idx,
                                idx
                              )}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </Jumbotron>
              {guideTitleLogic === true && (
                <Post_gaci
                  guideTitle={guideTitle}
                  guideMastContentRef={guideMastContentRef}
                  guideMainTitleValue={guideMainTitleValue}
                />
              )}
              {guideTitleLogic === true &&
                guideTitle.map((item, idx) => {
                  return (
                    <div className="guide_join" key={idx}>
                      <p className="guide_list_title">{item.title}</p>
                      <div
                        id={"guide_summernote_" + idx}
                        className="guide_summernote_wrap"
                      >
                        <ReactSummernote
                          ref={(el) => (guideContentRef.current[idx] = el)}
                          options={{
                            height: 350,
                            dialogsInBody: true,
                            code: "hi",
                            toolbar: [
                              ["style", ["style"]],
                              ["font", ["bold", "underline", "clear"]],
                              ["fontname", ["fontname"]],
                              ["para", ["ul", "ol", "paragraph"]],
                              ["table", ["table"]],
                              ["insert", ["link", "picture", "video"]],
                              ["view", ["fullscreen", "codeview"]],
                            ],
                          }}
                          onImageUpload={onImageUpload}
                          onInit={onInit(idx)}
                        />
                      </div>
                    </div>
                  );
                })}

              <div className="guide_list_btn">
                <button
                  className="table_view_btn"
                  onClick={Use_preview_popup_Click}
                >
                  미리보기
                </button>
                <button className="table_view_btn" onClick={Modify_gaci_Click}>
                  적용하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Using_guide_modify;

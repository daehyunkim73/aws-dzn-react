// 이미지 미리보기
export function FileNameChange(
  e,
  imgArray,
  setImgArray,
  formData,
  setFormData,
  setEv_target,
  setImgFileName,
  setImgSaveLogic
) {
  let reader = new FileReader();
  const Form_data = new FormData();
  const ev_tg_name = e.target.name;
  const file_name = e.target.files[0].name;
  const file_data = e.target.files[0];
  let Form_path;

  Form_data.append("ScImgFormData", e.target.files[0]);
  console.log("Form_data", Form_data);
  console.log("e.target.files[0]", e.target.files[0]);

  setImgFileName(file_name);
  setEv_target(ev_tg_name);
  setFormData(Form_data);

  setImgSaveLogic(true);
}

// 이미지 미리보기 삭제
export function FileRemove(e, imgArray, setImgArray, formData, setFormData) {
  const ev_tg_name = e.target.name;
  console.log("hi", ev_tg_name);
  const svc_sc_title_ref = document.getElementsByClassName("svc_sc_title");
  const svc_sc_content_ref = document.getElementsByClassName("svc_sc_content");
  if (imgArray[ev_tg_name]) {
    Object.values(svc_sc_title_ref).map((val, cnt) => {
      if (val.name === ev_tg_name + "title") {
        val.value = "";
      }
    });
    Object.values(svc_sc_content_ref).map((val, cnt) => {
      if (val.name === ev_tg_name + "content") {
        val.value = "";
      }
    });
    setImgArray({
      ...imgArray,
      [ev_tg_name]: {
        scrsht_file: undefined,
        file_path: undefined,
        scrsht_title: undefined,
        scrsht_desc: undefined,
      },
    });
    setFormData({
      ...formData,
      [ev_tg_name]: undefined,
    });
  }
}

// 스크린샷 제목 and 설명 클래스 가져오기
export function sc_text_fc(titleClass, contentClass) {
  const svc_sc_title_class = document.getElementsByClassName(titleClass);
  const svc_sc_content_class = document.getElementsByClassName(contentClass);

  return [svc_sc_title_class, svc_sc_content_class];
}

// 스크린샷, 스크린샷 제목, 스크린샷 설명 저장 버튼
export function SalseSaveBtn(titleClass, contentClass, imgArray) {
  const svc_sc_title_class = document.getElementsByClassName(titleClass);
  const svc_sc_content_class = document.getElementsByClassName(contentClass);

  Object.values(imgArray).map((val, cnt) => {
    if (!val !== true) {
      Object.values(svc_sc_title_class).map((item, index) => {
        if (index === cnt && val.file_path != "") {
          val.scrsht_title = item.value;
        }
      });
      Object.values(svc_sc_content_class).map((item, index) => {
        if (index === cnt && val.file_path != "") {
          val.scrsht_desc = item.value;
        }
      });
    }
  });
}

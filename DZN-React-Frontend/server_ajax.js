import Ajax from "./lib/ajax-3rd-custom";
import globals from "./lib/globals";
import { uploadFile, downloadFile } from "./lib/s3ObjectUtils-3rd-custom";
let startTime = 0;
// 인증 통신

export async function Server_ajax_get(url) {
  try {
    const ajax_host = await Ajax.get(`${globals.developer_url}/${url}`);
    const Json_parse_data = await JSON.parse(ajax_host);
    return Json_parse_data;
  } catch (e) {
    console.error(e);
    return [] || {} || "";
  }
}

export async function Server_ajax_post(url, data) {
  try {
    const ajax_host = await Ajax.post(`${globals.developer_url}/${url}`, data, {
      contextType: "application/json",
    });

    if (ajax_host) {
      const Json_parse_data = await JSON.parse(ajax_host);
      return Json_parse_data;
    }
  } catch (e) {
    console.error(e);
    return [] || {} || "";
  }
}

// 비 인증 통신

export async function UncertApi_ajax_get(url, signature) {
  try {
    const Un_signature_url = globals.unCertApiUrl + url;
    const Un_signature_result = await Ajax.get(Un_signature_url, {
      signature: signature,
    });
    const result = JSON.parse(Un_signature_result);
    return result;
  } catch (e) {
    console.error(e);
    return [] || {} || "";
  }
}

export async function User_info() {
  //사용자 정보
  try {
    const User_cno = await Ajax.get(
      `${globals.certApiUrl}/common/user/usersimpleinfo`
    );
    const result_User_cno = JSON.parse(User_cno);
    return result_User_cno;
  } catch (e) {
    return console.error(e);
  }
}

//이미지

const handleUploadSuccess = (param) => {
  // console.log("upload_success " + param.newFileName && param.newFileName)
};

const handleUploadError = (message) => {
  console.log("upload_error ", message);
};

const handleUploadCancel = (message) => {
  console.log("upload_cancel ", message);
};

const handleUploadProgress = (param) => {
  let evt = param.event;
  let percentComplete = Math.round((evt.loaded * 100) / evt.total); // 업로드된 퍼센테이지
  let currentTime = new Date().getTime(); // 현재시간
  let secondsElapsed = (currentTime - startTime) / 1000; // 경과시간
  let bytesPerSecond = secondsElapsed ? evt.loaded / secondsElapsed : 0; // 초당 byte 다운속도
  let remainingBytes = evt.total - evt.loaded; // 남은 크기
  let secondsRemaining = secondsElapsed
    ? (remainingBytes / bytesPerSecond).toFixed(0)
    : "남은시간 계산중.."; // 남은시간
  let speedPerSecond,
    ext = ""; // 전송속도
  if ((bytesPerSecond / 1024).toFixed(0) < 1024) {
    speedPerSecond = (bytesPerSecond / 1024).toFixed(2);
    ext = "Kb";
  } else if ((bytesPerSecond / 1024 / 1024).toFixed(0) < 1024) {
    speedPerSecond = (bytesPerSecond / 1024 / 1024).toFixed(2);
    ext = "Mb";
  } else {
    speedPerSecond = (bytesPerSecond / 1024 / 1024 / 1024).toFixed(0);
    ext = "Gb";
  }

  let statusText =
    percentComplete +
    "% 업로드 중 => 전송속도 " +
    speedPerSecond +
    "(" +
    ext +
    "), 남은시간 " +
    secondsRemaining +
    "초";
  console.log(statusText);
};

// const setThumbnail = (evt) => {
//   let reader = new FileReader();
//   reader.onload = function (e) {
//     let img = document.createElement('img');
//     img.setAttribute('src', e.target.result);
//     img.style.width = '100px';
//     img.style.height = '100px';
//     document.getElementById("Icon_img_file").appendChild(img);
//   };
//   reader.readAsDataURL(evt.target.files[0]);
// }

export function setThumbnail(evt) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      res(e.target.result);
    };
    reader.onerror = function (e) {
      rej(e);
    };
    reader.readAsDataURL(evt);
  });
}

export async function Image_uploade(file_info, service_code, service_type) {
  try {
    let fileUploadData = {
      file: file_info, // 업로드할 파일 객체
      serviceKey: "",
      serviceCode: service_code,
      bucketType: service_type, // S: 서비스, C: 회사, U: 사용자
      handleSuccess: handleUploadSuccess, // 업로드 성공 시, 콜백 메소드
      handleError: handleUploadError, // 업로드 실패 시, 콜백 메소드
      handleProgress: handleUploadProgress, // 업로드 진행상황, 콜백 메소드
      handleCancel: handleUploadCancel, // 업로드 취소 시, 콜백 메소드
      isPublic: true, // 파일이 공개되도 되는지 여부 (특정 케이스가 아니라면 false 기본)
      isWedrive: false, // 위드라이브에 저장할 경우 true, 일반적으로 저장하는 케이스는 false
      wedriveToken: "", // isWedrive 값이 true 일 경우 위드라이브 토큰 값, false일 경우 항목 없어도 됨
      wedrivePath: "", // isWedrive 값이 true 일 경우 위드라이브 저장 경로 값, false일 경우 항목 없어도 됨
      async: true, // 비동기 여부
    };
    const file_url = await uploadFile(fileUploadData);
    return file_url;
  } catch (e) {
    return console.error(e);
  }
}

export async function Image_download(
  org_filename,
  uuvid_toek,
  service_code,
  service_type
) {
  const token_split = uuvid_toek.split("/")[4];
  let fileDownload = {
    // https://s3.wehago.com/company_205686/https://s3.wehago.com/company_205686/
    orgFileName: org_filename, // 다운로드할 원본파일명
    fileName: token_split, // 파일명 UUID
    serviceKey: "",
    serviceCode: service_code,
    bucketType: service_type, // S: 서비스, C: 회사, U: 사용자
    handleSuccess: handleUploadSuccess, // 다운로드 성공 시, 콜백함수
    handleError: handleUploadError, // 다운로드 실패 시, 콜백함수
    handleProgress: handleUploadProgress, // 다운로드 진행상황 콜백함수
    async: true, // 비동기 여부
    file_download_url: uuvid_toek,
  };
  downloadFile(fileDownload);
}

export async function Image_deleted() {}

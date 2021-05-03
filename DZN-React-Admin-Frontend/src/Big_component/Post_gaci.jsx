import React, { useState, useRef } from "react";
// import JoditEditor from "jodit-react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";

const Post_gaci = ({ guideTitle ,guideMastContentRef, guideMainTitleValue }) => {
    const onInit = (func) => {
    if(!guideTitle[0].main_content !== true ) func.replace(guideTitle[0].main_content);
  };
  return (
    <React.Fragment>
      <div id={"guide_summernote_main"} className="guide_summernote_wrap">
        <ReactSummernote
          value="Default value"
          ref={guideMastContentRef}
          onInit={onInit}
          options={{
            height: 350,
            dialogsInBody: true,
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
        />
      </div>
    </React.Fragment>
  );
};

export default Post_gaci;

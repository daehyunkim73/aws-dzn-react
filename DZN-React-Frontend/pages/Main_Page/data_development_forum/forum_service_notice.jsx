import React from 'react';
import Forum_notice_icon from '../../../image/Dev_Center/Forum/notice_icon.png';

const Forum_service_notice = () => {
  return (
    <div className="notice_wrap">
        <div className="notice_content_wrap">
            <div className="notice_img_wrap">
                <img src={Forum_notice_icon} alt=""/>
            </div>
            <div className="notice_text_wrap">
                <p>서비스 개발자 포럼입니다. 해결되지 않는 사항은</p>
                <p className="notice_text">문의하기</p>
                <p>를 이용해보세요.</p>
            </div>
        </div>
    </div>
  );
}

export default Forum_service_notice;

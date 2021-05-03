import React from "react";
import Form from "react-bootstrap/Form";
import Pagination from "../../Main_Page/component/Pagination";
import Forum_notice from "./forum_service_notice";
import { Link } from "react-router-dom";
import Forum_file from "../../../image/Dev_Center/Forum/file.png";
import Forum_check_blue from "../../../image/Dev_Center/Forum/check_blue.png";
import Forum_check_gray from "../../../image/Dev_Center/Forum/check_gray.png";
import Forum_profile from "../../../image/Center/Developers_header/profile.png";

const Forum_service_main = () => {
  return (
    <React.Fragment>
      <div className="data_forum_wrap">
        <div className="data_forum_input">
          <Form.Control as="select" className="search_select">
            <option>카테고리 선택</option>
            <option>사용방법</option>
            <option>문제해결</option>
            <option>자유토론</option>
            <option>데이터분석</option>
            <option>빅 데이터</option>
          </Form.Control>
          <Form.Control
            type="text"
            className="form_input"
            placeholder="제목 및 내용을 입력해주세요."
          />
          <Link to="/forum/service/write">
            <button>글 쓰기</button>
          </Link>
          <button className="forum_search">검색</button>
        </div>
        <Forum_notice />
        <div className="data_forum_post">
          <div className="forum_post_title_wrap">
            <p>
              게시글 [총 <span>2000</span>건]
            </p>
            <div className="forum_post_btn_wrap">
              <div className="forum_post_btn forum_post_btn_active">
                <img src={Forum_check_blue} alt="check_gray" />
                <p>최신 게시글</p>
              </div>
              <div className="forum_post_btn">
                <img src={Forum_check_gray} alt="check_gray" />
                <p>인기 게시글</p>
              </div>

              <div className="forum_post_btn">
                <img src={Forum_check_gray} alt="check_gray" />
                <p>내가 쓴 글 보기</p>
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <Link to="/forum/service/content">
              <div className="forum_post_table_title">
                <img src={Forum_profile} alt="profile" />
                <p className="forum_post_category">[사용 방법]</p>
                <p>서비스를 만들었는데 어디다가 파나요 ?</p>
              </div>
              <div className="forum_post_table_content">
                <p>
                  서비스 URL: 오류 현상: 짐작되는 원인:response_type = token
                  으로 넘기면 최종 3단계에서 cors 오류가 뜨고
                  <br />
                  response_type = code 로 넘기면 아래 2단계에서 cors오류가
                  뜹니다.
                  <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
                </p>
              </div>
              <div className="forum_post_table_footer">
                <div>
                  <p>작성자:</p>
                  <p className="forum_footer_content">홍길동</p>
                </div>
                <div>
                  <p>작성일:</p>
                  <p className="forum_footer_content">2020-01-20</p>
                </div>
                <div>
                  <p>답변 수:</p>
                  <p className="forum_footer_content">5</p>
                </div>
                <div>
                  <p>조회:</p>
                  <p className="forum_footer_content">50</p>
                  <img src={Forum_file} alt="file" />
                </div>
              </div>
            </Link>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
          <div className="forum_post_table_wrap">
            <div className="forum_post_table_title">
              <img src={Forum_profile} alt="profile" />
              <p className="forum_post_category">[사용 방법]</p>
              <p>서비스를 만들었는데 어디다가 파나요 ?</p>
            </div>
            <div className="forum_post_table_content">
              <p>
                서비스 URL: 오류 현상: 짐작되는 원인:response_type = token 으로
                넘기면 최종 3단계에서 cors 오류가 뜨고
                <br />
                response_type = code 로 넘기면 아래 2단계에서 cors오류가 뜹니다.
                <br />좀 읽어보니 서버프로그램에서 oauth 인증과정을 거치라..
              </p>
            </div>
            <div className="forum_post_table_footer">
              <div>
                <p>작성자:</p>
                <p className="forum_footer_content">홍길동</p>
              </div>
              <div>
                <p>작성일:</p>
                <p className="forum_footer_content">2020-01-20</p>
              </div>
              <div>
                <p>답변 수:</p>
                <p className="forum_footer_content">5</p>
              </div>
              <div>
                <p>조회:</p>
                <p className="forum_footer_content">50</p>
                <img src={Forum_file} alt="file" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pagination />
    </React.Fragment>
  );
};

export default Forum_service_main;

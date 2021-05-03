import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import globals from "../../../../lib/globals";
import Ajax from "../../../../lib/ajax-3rd-custom";
import { Link } from "react-router-dom";

const Left_data_popular = () => {
  const [popularData, setPopularData] = useState([]);

  useEffect(() => {
    const url = `${globals.certApiUrl}/BDObjectStorage/getPopularDataList?metadata_type=statistics`;

    Ajax.get(url)
      .then(function (response) {
        let result = JSON.parse(response);
        setPopularData(result.resultData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="section_big_white_box">
        <Card title="인기 데이터" className="dataApp_white_card">
          <Card.Header className="card_header">
            <h4 className="popular_data">인기 데이터</h4>
          </Card.Header>
          <Card.Body style={{ textAlign: "left" }}>
            {popularData.map((item, index) => {
              return (
                <div className="famouse_data_wrap" key={index}>
                  <a
                    target="_blank"
                    href={`https://dataportal.wehago.com/#/datastore/detail/data/${item.identifier}`}
                  >
                    <div className="big_famouse_data">
                      <div className="first_data_app_style">{index + 1}</div>
                      <div className="second_data_app_style">{item.title}</div>
                      <div className="three_data_app_style">
                        {item.publisher_name}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Left_data_popular;

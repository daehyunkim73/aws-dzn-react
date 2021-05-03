import React, { useCallback, useEffect, useState } from 'react';

let link_array = [1];
let page_array = [];

const Pagenation_link = (props) => {
    useEffect(() => {
        page_array.push(props.same_page_nation_num); //Sales_managment_table에서 좌우 버튼이 감지될때마다 push
        if (page_array.length >= 2) { //처음 화면에 나올때는 splice가 안되지만 렌더링이후에는 splice가 먹음
            page_array.splice(0, 1);
        }
    }, [props.same_page_nation_num]);

    const page_nation_link = useCallback(() => {
        props.setData(props.link_index);
        link_array.push(props.link_index);

        for (let a = 0; a < page_array.length; a++) {
            for (let b = a + 1; b < link_array.length; b++) {
                if (page_array[a] === link_array[b]) { //좌우 이동버튼 클릭은 useEffect로 감지가 되서 배열에 잘 들어가지만 숫자 이동클릭은 안들어가기때문에 클릭했을때 같다면 splice가 되면 안되니깐 막기
                    link_array.splice(0, 1);
                    return props.Post_Data;
                } else if (page_array[a] !== link_array[b]) {
                    if (link_array.length === 2) {
                        link_array.splice(0, 1);
                    }
                    props.setPost_Data(props.Post_Data.splice(10));
                }
            }
        }
    }, [props.Post_Data]);

    return (
        <React.Fragment>
            <div className="number_btn_wrap">
                <p onClick={page_nation_link}>{props.link_index}</p>
            </div>
        </React.Fragment>
    )
}

export default Pagenation_link;
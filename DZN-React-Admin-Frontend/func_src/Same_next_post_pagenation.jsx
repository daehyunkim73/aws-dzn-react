export function Same_page_nation_next
    (oper_page_num, all_gaci_data, page_gaci_data, setPage_gaci_data, page_state, setNumber_arr, number_arr, setPage_nat_num_state, page_num) {
    if (all_gaci_data[all_gaci_data.length - 1] === page_gaci_data[page_gaci_data.length - 1]) { //마지막 요소 가져오기, 마지막과 마지막이 같으면
        return page_gaci_data;
    } else {
        if (page_state === 'big_next_nation') {
            all_gaci_data.map((v, i) => {
                setNumber_arr([]); //push를하면 계속 데이터추가가되면 에러가 뜸, 추가되고 다시 추가되는 시점에서 비우고 새로운 데이터 추가
                if (i < all_gaci_data.length / oper_page_num) {
                    i++;
                    setNumber_arr(number_arr.push(i));
                }
            });
            const page_last_number = number_arr[number_arr.length - 1];
            setPage_nat_num_state(page_last_number);
        }
        if (page_state === 'next_nation') {
            setPage_nat_num_state(page_num + 1);
        }
    }
}

export function Same_page_nation_prev(page_state, page_num, setPost, gaci_post, setPage_num) {
    if (page_state === 'big_prev_nation' || 'prev_nation') {
        if (page_num === 1) {
            return page_num;
        } else {
            if (page_state === 'big_prev_nation') {
                setPage_num(1);
            }
            if (page_state === 'prev_nation') {
                setPage_num(page_num - 1);
            }
        }
    }
}
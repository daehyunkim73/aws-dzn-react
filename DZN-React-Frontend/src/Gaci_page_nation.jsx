export function Page_nation_post(page_nation, now_post, chagne_post_fun, mov_post) {
    for (let i = (page_nation * 10) - 10; i < (page_nation * 10); i++) {
        if (i > now_post.length - 1) {
            i++;
        } else {
            let forum_main_list_page = now_post[i];
            chagne_post_fun(mov_post => [...mov_post, forum_main_list_page]);
        }
    }
}

export function Page_nation_factory(page_nation, now_post, field_list=10) {
    const page_arr_result = [];
    for (let i = (page_nation * field_list) - field_list; i < (page_nation * field_list); i++) {
        if (i > now_post.length - 1) {
            i++;
        } else {
            page_arr_result.push(now_post[i]);
            this.resultPageing = page_arr_result; //페이지네이션 게시글
        }
    }
}

export const Page_nation_data = (page_nation, now_post, field_list=10) => {
    let page_arr_result = [];    
    for (let i = (page_nation * field_list) - field_list; i < (page_nation * field_list); i++) {
        if (i > now_post.length - 1) {
            i++;
        } else {
            page_arr_result = page_arr_result.concat(now_post[i]);            
        }
    }
    return page_arr_result;
}

export default Page_nation_post;
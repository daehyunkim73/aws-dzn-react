export function Page_nation_post(oper_post_num, page_nation, now_post, chagne_post_fun, mov_post) {
  for (let i = page_nation * oper_post_num - oper_post_num; i < page_nation * oper_post_num; i++) {
    if (i > now_post.length - 1) {
      i++;
    } else {
      chagne_post_fun((mov_post) => [...mov_post, now_post[i]]);
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
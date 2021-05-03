function Page_nation_post(oper_post_num, page_nation, now_post, chagne_post_fun) {
  
  for (
    let i = page_nation * oper_post_num - oper_post_num; i < page_nation * oper_post_num; i++) {
    if (i > now_post.length - 1) {
      i++;
    } else {
      chagne_post_fun((data) =>  [...data, now_post[i]]);
    }
  }
}

export default Page_nation_post;

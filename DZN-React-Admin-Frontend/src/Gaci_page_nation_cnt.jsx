function Page_nation_post(page_nation, now_post, chagne_post_fun, mov_post, cnt) {
    for (let i = (page_nation * cnt) - cnt; i < (page_nation * cnt); i++) {
        if (i > now_post.length - 1) {
        } else {
            let forum_main_list_page = now_post[i];
            chagne_post_fun(mov_post => [...mov_post, forum_main_list_page]);
        }
    }
  }

export default Page_nation_post;

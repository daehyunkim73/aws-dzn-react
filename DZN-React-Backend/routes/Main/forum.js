const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const path = require("path");
const multer = require("multer");
const uploade = multer({ //수정(예정)
  storage: multer.diskStorage({
    destination(req, file, done) {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        done(null, "uploade/image");
      } else {
        done(null, "uploade/file");
      }
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
});
router.post("/forum_uploade_image_preview", uploade.array("image"), (req, res) => { //수정(예정)
  res.json(req.files.map((v) => v.filename));
});
router.post("/forum_uploade_img", uploade.array("image"), (req, res) => { //수정(예정)
  res.json(req.files.map((v) => v.path));
});
router.get("/froum_file_post", (req, res, next) => { //수정(예정)
  try {
    let sql = "SELECT * FROM tbl_forum_file";
    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/forum_wirteing_save", async (req, res, next) => { //수정(예정) 이미지, 게시글 저장
  try {
    let froum_data = req.body;
    let sql =
      `
    INSERT INTO tbl_forum_mast(forum_gbn, cate_code, title, \`desc\`, mbr_idx, regDt, post_writer) 
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;
    let params = [
      froum_data.forum_cart_code,
      froum_data.forum_select,
      froum_data.forum_title,
      froum_data.forum_content,
      froum_data.mbr_info_idx,
      froum_data.forum_date,
      froum_data.mbr_post_writer,
    ];
    let forum_id = null;
    let forum_sql = "INSERT INTO tbl_forum_file(forum_post_idx, forum_file_path) VALUES(?, ?)";
    conn.query(sql, params, async (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        forum_id = rows.insertId;
        if (froum_data.forum_data_imfl) {
          if (Array.isArray(froum_data.forum_data_imfl)) {
            await Promise.all(
              froum_data.forum_data_imfl.map((image) => {
                let forum_params = [forum_id, image];
                conn.query(forum_sql, forum_params, (err, rows) => {
                  if (err) {
                    return console.error(err);
                  }
                });
              })
            );
            res.send(null);
          } else {
            let forum_params = [forum_id, froum_data.forum_data_imfl];
            conn.query(forum_sql, forum_params, (err, rows) => {
              if (err) {
                return err;
              } else {
                res.json(rows);
              }
            });
          }
        } else {
          res.send(null);
        }
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//-------------

router.get("/data_forum_main_list", (req, res, next) => {
  const forum_gbn_division = req.query;
  let sql = `SELECT * FROM tbl_forum_mast where forum_gbn=${forum_gbn_division.forum_gbn} order by forum_idx desc`;

  conn.query(sql, (err, rows) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/contents_view", (req, res) => {
  let forum_detail_id = req.query.id;
  let up_sql = `UPDATE tbl_forum_mast SET vw_cnt = vw_cnt+1 where forum_idx=${forum_detail_id}`;
  conn.query(up_sql, (err) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(null);
    }
  });
})

router.get("/data/contents", (req, res, next) => { //상세페이지
  try {
    let forum_detail_id = req.query.id;
    let sql =
      `
      SELECT A.forum_idx AS mast_forum_idx, A.cate_code, A.title, A.vw_cnt, A.desc AS forum_post_desc, 
      A.post_writer, A.mbr_idx AS post_mbr_idx,
      A.regDt AS mast_forum_regdt, B.* 
      FROM tbl_forum_mast AS A 
      LEFT JOIN tbl_forum_answr AS B
          ON A.forum_idx=B.forum_idx 
      WHERE A.forum_idx=${forum_detail_id}
      
      UNION ALL
      
      SELECT B.forum_idx AS mast_forum_idx, A.cate_code, A.title, A.vw_cnt, A.desc AS forum_post_desc, 
      A.post_writer, A.mbr_idx AS post_mbr_idx,
      A.regDt AS mast_forum_regdt, C.* 
      FROM tbl_forum_answr AS B
      INNER JOIN tbl_forum_answr AS C
          ON B.frm_awr_idx = C.forum_idx
      LEFT JOIN tbl_forum_mast AS A
          ON A.forum_idx=B.forum_idx 
      WHERE B.forum_idx=${forum_detail_id}
   `

    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        if (rows.length === 0 || !rows) {
          return res.status(404).send('게시글이 존재하지 않습니다.')
        }
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/data_forum_comment_lists", (req, res, next) => { //댓글 정보
  try {
    let sql =
      `
      SELECT A.forum_idx AS mast_forum_idx, A.cate_code, A.title, A.vw_cnt, A.desc AS forum_post_desc, 
      A.regDt AS mast_forum_regdt, B.* 
      FROM tbl_forum_mast AS A 
      LEFT JOIN tbl_forum_answr AS B
          ON A.forum_idx=B.forum_idx 
      
      UNION ALL
      
      SELECT B.forum_idx AS mast_forum_idx, A.cate_code, A.title, A.vw_cnt, A.desc AS forum_post_desc, 
      A.regDt AS mast_forum_regdt, C.* 
      FROM tbl_forum_answr AS B
      INNER JOIN tbl_forum_answr AS C
          ON B.frm_awr_idx = C.forum_idx
      LEFT JOIN tbl_forum_mast AS A
          ON A.forum_idx=B.forum_idx 
  `

    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/forum_comment_up", async (req, res, next) => { //댓글 등록
  try {
    let forum_comment_bd = req.body;
    let forum_post = await `SELECT * FROM tbl_forum_mast where forum_idx=${forum_comment_bd.forum_post_idx}`;
    if (!forum_post) {
      return res.status(404).send("Detail post is not exists");
    }
    let sql = await "INSERT INTO tbl_forum_answr(forum_idx, `desc`, mbr_idx, regDt) VALUES(?, ?, ?, ?)";
    let params = [
      forum_comment_bd.gaci_idx_comment,
      forum_comment_bd.comment_contents,
      forum_comment_bd.comment_mbr_idx,
      forum_comment_bd.comment_date
    ];
    conn.query(sql, params, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/user_writing_post', (req, res) => { //내가 쓴글 보기
  const forum_post_info = req.body;
  if (forum_post_info.search_select_value && !forum_post_info.search_title_desc_value) { //카테고리 검색
    const sql = 'SELECT * FROM tbl_forum_mast where forum_gbn=? AND cate_code=? AND mbr_idx=? order by forum_idx desc'
    const params =
      [
        forum_post_info.forum_gbn,
        forum_post_info.search_select_value,
        forum_post_info.user_cno
      ];

    conn.query(sql, params, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    })
  }

  if (forum_post_info.search_select_value && forum_post_info.search_title_desc_value) {
    if (forum_post_info.search_select_value === '카테고리 선택') { //문자열 검색
      const sql =
        `
      SELECT * FROM tbl_forum_mast where forum_gbn=? AND mbr_idx=? AND 
      (\`desc\` like "%${forum_post_info.search_title_desc_value}%" OR 
      title like "%${forum_post_info.search_title_desc_value}%") order by forum_idx desc
      `;

      const params = [
        forum_post_info.forum_gbn,
        forum_post_info.user_cno
      ]

      conn.query(sql, params, (err, rows) => {
        if (err) {
          return console.error(err);
        } else {
          res.json(rows);
        }
      })
    } else { // 카테고리 + 문자열 검색
      const sql =
        `
      SELECT * FROM tbl_forum_mast where forum_gbn=? AND cate_code=? AND mbr_idx=? AND 
      (\`desc\` like "%${forum_post_info.search_title_desc_value}%" OR 
      title like "%${forum_post_info.search_title_desc_value}%")  order by forum_idx desc
      `;
      const params = [
        forum_post_info.forum_gbn,
        forum_post_info.search_select_value,
        forum_post_info.user_cno
      ]
      conn.query(sql, params, (err, rows) => {
        if (err) {
          return console.error(err);
        } else {
          res.json(rows);
        }
      })
    }
  } else if (!forum_post_info.search_select_value && !forum_post_info.search_title_desc_value) {
    const sql = 'SELECT * FROM tbl_forum_mast where forum_gbn=? AND mbr_idx=? order by forum_idx desc'
    const params = [forum_post_info.forum_gbn, forum_post_info.user_cno];

    conn.query(sql, params, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        return res.json(rows);
      }
    })
  }
});

router.post('/forum_post_updated', (req, res) => {
    console.log('req', req.body);
    const sql = `UPDATE tbl_forum_mast SET title=?, cate_code=?, \`desc\`=? where forum_idx=${req.body.update_post_id}`;
    const params = [req.body.update_title, req.body.update_cate, req.body.update_desc];

    conn.query(sql, params, (err, rows) => {
      if(err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    })
})

router.post('/forum_post_deleted', (req, res) => {
  console.log('body_data', req.body);
  const sql = 'DELETE FROM tbl_forum_mast where forum_idx=?'
  const params = [req.body.post_id];

  conn.query(sql, params, (err, rows) => {
    if(err) {
      return console.error(err);
    } else {
      res.json({result: 200});
    }
  })
})

router.post('/forum_post_search', (req, res) => { //forum 게시물 검색
  if (req.body.category_data && !req.body.post_title_desc) {
    const sql = 'SELECT * FROM tbl_forum_mast where forum_gbn=? AND cate_code=? order by forum_idx desc'
    const params = [req.body.Developement_division, req.body.category_data];

    conn.query(sql, params, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    })
  }

  if (req.body.category_data && req.body.post_title_desc) {
    if (req.body.category_data === '카테고리 선택') {
      const sql =
        `
      SELECT * FROM tbl_forum_mast where forum_gbn=? AND 
      (\`desc\` like "%${req.body.post_title_desc}%" OR 
      title like "%${req.body.post_title_desc}%") order by forum_idx desc
      `;
      const params = [req.body.Developement_division]
      conn.query(sql, params, (err, rows) => {
        if (err) {
          return console.error(err);
        } else {
          res.json(rows);
        }
      })
    } else {
      const sql =
        `
      SELECT * FROM tbl_forum_mast where forum_gbn=? AND cate_code=? AND
      (\`desc\` like "%${req.body.post_title_desc}%" OR 
      title like "%${req.body.post_title_desc}%") order by forum_idx desc
      `;
      const params = [req.body.Developement_division, req.body.category_data]
      conn.query(sql, params, (err, rows) => {
        if (err) {
          return console.error(err);
        } else {
          res.json(rows);
        }
      })
    }
  }
})

module.exports = router
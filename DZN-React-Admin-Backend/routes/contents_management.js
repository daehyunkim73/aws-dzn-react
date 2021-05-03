const express = require("express");
const router = express.Router();
const db_config = require("../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");

const uploade = multer({
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

// ADMIN 공지사항 조회
router.post('/notice_main_list', (req, res, next) => {
  const searchData = req.body.searchData;
        let where = ' where 0=0 ';
        let type = 'uptDt'
		
        if(searchData){
            const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
            const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
            const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;

            if(startDate !== undefined && startDate !== '') {
              where += ` and regDt >= '${startDate}' and regDt <= '${endDate}'`;
          }

            if(searchTerm !== undefined && searchTerm !== '') {
                where += ` and (ntc_title like '%${searchTerm}%'`;
                where += ` or  ntc_desc like '%${searchTerm}%')`;
            }
        }
		
  let sql = `
			select * 
			from tbl_notice 
			${where} ORDER BY ${type} DESC
			`;
			  
  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});

//ADMIN 공지사항 상세페이지
router.get("/admin/notice/content/:id", (req, res, next) => {
  try {
    let notice_detail_id = req.params.id;
    console.log("notice_detail_id", notice_detail_id);
    let sql = `SELECT tn.* FROM datadevcenterdb.tbl_notice tn where ntc_idx=${notice_detail_id}`;

    conn.query(sql, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });
  } catch (e) {
    console.error(e);
  }
});

//ADMIN 공지사항 삭제

router.post("/notice_delete_checked", (req, res, next) => {
  try {
    let DelArray = req.body.delArray;
    console.log(DelArray);
    let sql = `DELETE FROM tbl_notice WHERE ntc_idx IN (
      ${DelArray.join(",")}
      )`
    conn.query(sql, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });

  } catch (e) {
    console.error(e);
  }
});

//ADMIN 공지사항 글작성 INSERT
router.post("/notice_writing_save", async (req, res, next) => {
  try {
    let notice_body = req.body;
    let params = [
      notice_body.notice_category, //타입코드
      notice_body.notice_title, //제목
      notice_body.notice_content, //내용
      notice_body.notice_date, //날짜
      notice_body.notice_date, 
      notice_body.notice_writer,
    ];
    console.log("notice_body", notice_body);
    let sql = await "INSERT INTO tbl_notice(ntc_type, ntc_title, ntc_desc, regDt, uptDt, adm_id) VALUES(?,?,?,?,?,?)";
    console.log("sql", sql);

    conn.query(sql, params, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 공지사항 업데이트
router.post("/notice_writing_update", (req, res, next) => {
  try {
    let notice_body = req.body;
    let params = [
      notice_body.notice_category, //카테고리 선택값
      notice_body.notice_title, //제목
      notice_body.notice_content, //내용
      notice_body.notice_writer, //작성자
      notice_body.notice_date, //날짜
      notice_body.notice_idx, //idx
    ];
    console.log(params,"params")
    let sql = `UPDATE tbl_notice SET ntc_type=?, ntc_title=?, ntc_desc=?, adm_id=?, uptDt=? WHERE ntc_idx=?`;
    conn.query(sql, params, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    })
} catch(e){
  console.error(e);
  next(e);
}
});

// 공지사항 카테고리 리스트
router.get("/noticeCateList", (req, res, next) => {
  try {
    const sql = `
    SELECT * FROM tbl_code WHERE main_cate_name = "공지사항 카테고리" 
      `;
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//ADMIN FAQ 메인리스트

router.post('/faq_main_list', (req, res, next) => {
  const searchData = req.body.searchData;
        let where = ' where 0=0 ';
        let type = 'uptDt'
		
        if(searchData){
            const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
            const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
            const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;
			const category_val = searchData.category_val === '' ? '' : searchData.category_val;
			
			console.log('startDate',startDate);
			console.log('endDate',endDate);
			console.log('searchTerm',searchTerm);
			console.log('category_val',category_val);
			
            if(startDate !== undefined && startDate !== '') {
                where += ` and ${type} >= '${startDate}' and ${type} <= '${endDate}'`;
            }

            if(searchTerm !== undefined && searchTerm !== '') {
                where += ` and (faq_title like '%${searchTerm}%'`;
                where += ` or  faq_desc like '%${searchTerm}%')`;
            }
			if(category_val !== undefined && category_val !== '') {
                where += ` and (faq_type_code like '%${category_val}%')`;
            }
        }
		
  let sql = `
			select * 
			from tbl_faq 
			${where} ORDER BY ${type} DESC
			`;
  
  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});

//ADMIN FAQ 상세페이지

router.get("/admin/faq/detail/:id", (req, res, next) => {
  try {
    let faq_detail_id = req.params.id;
    console.log("notice_detail_id", faq_detail_id);
    let sql = `SELECT tn.* FROM tbl_faq tn where faq_idx=${faq_detail_id}`;

    conn.query(sql, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });
  } catch (e) {
    console.error(e);
  }
});

//ADMIN 카테고리 조회
router.get("/faq_category_list", (req, res, next) => {
  try {
    const sql = `
    SELECT * FROM tbl_code WHERE main_cate_code = "faq_gbn_cate" 
      `;
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
  }
});

// 카테고리 추가
router.post("/add_category", (req, res, next) => {
  try {
    let category = req.body;
    let delArray = req.body.delArray;

    const ins_sql = `
      INSERT INTO tbl_code (
        main_cate_code,
        main_cate_name,
        sub_cate_name
      ) VALUES (
        "faq_gbn_cate", "FAQ 카테고리", ?
        )
          `;
    const upt_sql = `
      UPDATE tbl_code SET sub_cate_name=? WHERE code_idx=?
    `;
    const del_sql = `
      DELETE FROM tbl_code WHERE code_idx IN (
        ${delArray.join(",")}
        )
    `;
    if (category.categoryArray) {
      if (Array.isArray(category.categoryArray)) {
      Promise.all(
          category.categoryArray.map((item) => {
            console.log(item,"================");
            if (delArray.length > 0) {
              conn.query(del_sql, (err, rows) => {
                if (err) {
                  console.error(err);
                }
              });
            }
            if (item.code_idx) {
              const upt_params = [
                item.sub_cate_name,
                item.code_idx,
              ];
              conn.query(upt_sql, upt_params, (err, rows) => {
                if (err) {
                  console.error(err);
                }
              });
            } else {
              const ins_params = [
                item.sub_cate_name,
              ];
              conn.query(ins_sql, ins_params, (err, rows) => {
                if (err) {
                  console.error(err);
                }
              });
            }
          })
        );
      }
    }
    res.send(null);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//ADMIN FAQ 글작성 INSERT
router.post("/faq_writing_save", async (req, res, next) => {
  try {
    let faq_body = req.body;
    let params = [
      faq_body.faq_category, //타입코드
      faq_body.faq_title, //제목
      faq_body.faq_content, //내용
      faq_body.faq_date, //날짜
      faq_body.faq_date, //날짜
      faq_body.faq_writer,
    ];

    let sql = await "INSERT INTO tbl_faq(faq_type_code, faq_title, faq_desc, regDt, uptDt, adm_id) VALUES(?,?,?,?,?,?)";

    conn.query(sql, params, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//ADMIN FAQ 삭제

router.post("/faq_delete_checked", (req, res, next) => {
  try {
    let DelArray = req.body.delArray;
    let sql = `DELETE FROM tbl_faq WHERE faq_idx IN (
      ${DelArray.join(",")}
      )`
    conn.query(sql, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });

  } catch (e) {
    console.error(e);
  }
});

// faq 업데이트
router.post("/faq_writing_update", (req, res, next) => {
  try {
    let faq_body = req.body;
    let params = [
      faq_body.faq_category, //카테고리 선택값
      faq_body.faq_title, //제목
      faq_body.faq_content, //내용
      faq_body.faq_date, //날짜
      faq_body.faq_writer,
      faq_body.faq_idx, //idx
    ];
    let sql = `UPDATE tbl_faq SET faq_type_code=?, faq_title=?, faq_desc=?, uptDt=?, adm_id=? WHERE faq_idx=?`;
    conn.query(sql, params, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    })
} catch(e){
  console.error(e);
  next(e);
}
});


//ADMIN 문의하기 메인리스트

router.post("/question_main_list", (req, res, next) => {
  try{
    const {searchTerm, searchStartDate, searchEndDate} = req.body;

    let where = ' WHERE 0=0 '

    if(searchStartDate !== undefined && searchStartDate !== '') {
      where += ` AND tq.regDt > '${searchStartDate} 00:00:00' AND tq.regDt < '${searchEndDate} 23:59:59'`;
    }

    if(searchTerm !== undefined && searchTerm !== '') {
        where += ` AND (tq.mbr_id LIKE '%${searchTerm}%' OR tq.title LIKE '%${searchTerm}%' OR tq.desc LIKE '%${searchTerm}%')`;
    }

    let sql = `
        SELECT tq.qst_idx AS tq_idx,
          tq.qst_type_code AS tq_type_code,
          tc.sub_cate_name AS tq_type_name,
          tq.title AS tq_title,
          tq.desc AS tq_desc,
          tq.regDt AS tq_regDt,
          tq.mbr_id AS tq_id,
          ta.title AS ta_title,
          ta.desc AS ta_desc, 
          ta.regDt AS ta_regDt,
          ta.adm_id AS ta_id,
          tm.mbr_name AS ta_name,
          ta.awr_idx AS awr_idx
        FROM tbl_quest AS tq
        LEFT OUTER JOIN tbl_answer AS ta
          ON tq.qst_idx = ta.qst_idx
        INNER JOIN tbl_code AS tc
          ON tq.qst_type_code = tc.sub_cate_code
            AND tc.main_cate_code = 'question_type'
        LEFT OUTER JOIN tbl_member AS tm
          ON ta.adm_id = tm.mbr_id
        ${where}       
        ORDER BY tq.regDt DESC
        `;      
    conn.query(sql, (err, rows) => {
      if(err) { 
        throw new Error(err);
      } 
      else res.json(rows);
    });
  } catch(e) {
    console.error(e);
  }
});
//ADMIN 문의하기 quest 상세페이지
router.get("/question_detail/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = `
        SELECT tq.qst_idx AS tq_idx,
          tq.qst_type_code AS tq_type_code,
          tc.sub_cate_name AS tq_type_name,
          tq.title AS tq_title,
          tq.desc AS tq_desc,
          tq.regDt AS tq_regDt,
          tq.mbr_id AS tq_id,
          tmq.mbr_name AS tq_name,
          ta.title AS ta_title,
          ta.desc AS ta_desc, 
          ta.regDt AS ta_regDt,
          ta.adm_id AS ta_id,
          tm.mbr_name AS ta_name,
          ta.awr_idx AS awr_idx
        FROM tbl_quest AS tq
        LEFT OUTER JOIN tbl_answer AS ta
          ON tq.qst_idx = ta.qst_idx
        INNER JOIN tbl_code AS tc
          ON tq.qst_type_code = tc.sub_cate_code
            AND tc.main_cate_code = 'question_type'
        LEFT OUTER JOIN tbl_member AS tmq
          ON tq.mbr_id = tmq.mbr_id
        LEFT OUTER JOIN tbl_member AS tm
          ON ta.adm_id = tm.mbr_id
        WHERE tq.qst_idx=${id}
  `

  conn.query(sql, (err, rows) => {
    if(err) { 
      throw new Error(err);
    } 
    else res.json(rows[0]);
  });
  
});

//ADMIN 문의하기 답변작성 INSERT
router.post('/quest_answer_save', (req, res, next) => {
  try {
    const {questIdx, title, content, date, adminId} = req.body;      
  
    const sql = `INSERT INTO tbl_answer(qst_idx, title, \`desc\`, regDt, adm_id) 
                 VALUES(?,?,?,?,?)`;
    const params = [questIdx, title, content, date, adminId];
    
    conn.query(sql, params, (err, rows) => {
      if(err) throw new Error(err);
      else res.json(rows);
    })
  } catch (e) {
      console.error(e);
      next(e);
  }
});

//ADMIN 문의하기 답변작성 INSERT
router.post('/quest_answer_update', (req, res, next) => {
  try {
    const {questIdx, title, content, date, adminId} = req.body;      
  
    const sql = `UPDATE tbl_answer 
                 SET title=?, \`desc\`=?, uptDt=?, adm_id=?
                 WHERE qst_idx=?`;
    const params = [title, content, date, adminId, questIdx];    
    conn.query(sql, params, (err, rows) => {
      if(err) throw new Error(err);
      else res.json(rows);
    })
  } catch (e) {
      console.error(e);
      next(e);
  }
});

//ADMIN 업데이트 메인리스트

router.post('/update_main_list', (req, res, next) => {  
	const {searchStartDate, searchEndDate, searchTerm } = req.body;
  let where = ' where 0=0 ';

  const startDate = searchStartDate === '' ? '' : searchStartDate;
  const endDate = searchEndDate === '' ? '' : searchEndDate;
  const searchData = searchTerm === '' ? '' : searchTerm;			

  if(startDate !== undefined && startDate !== '') {
    where += ` and (upt_dt >= '${startDate}' and upt_dt <= '${endDate}') `;
  }

  if(searchData !== undefined && searchData !== '') {
    where += ` and (upt_title like '%${searchData}%' or \`desc\` like '%${searchData}%') `;                
  }

  const sql = `SELECT * from tbl_update ${where} ORDER BY upt_dt DESC`;
  
  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});

//ADMIN 업데이트 삭제
router.post("/update_delete_checked", (req, res, next) => {
  try {
    const {deleteIdxs} = req.body;    
    const sql = `DELETE FROM tbl_update WHERE upt_idx IN (${deleteIdxs})`;
    
    conn.query(sql, [], (err, rows) => {
      if(err) throw new Error(err);
      else res.json(rows);
    });    
  } catch (e) {
    console.error(e);
  }
});

// ADMIN 업데이트 카테고리 가져오기
router.get("/update_get_category", (req, res, next) => {
  try{  
    const sql = `SELECT UPT_MAIN_CODE, UPT_MAIN_NAME FROM TBL_UPDATE_MAIN`;
    conn.query(sql, [], (err, rows) => {
      if(err) throw new Error(err);
      else res.json(rows);
    })
  }catch(e) {
    console.log(e);
    next(e);
  }
});

//ADMIN 업데이트 글작성 INSERT
router.post("/update_writing_save", (req, res, next) => {
  try {
    const {title, content, cateCode, date, adminId } = req.body; 
    const sql = `INSERT INTO tbl_update(upt_title, \`desc\`, upt_title_desc_code, regDt, upt_dt, adm_id) 
                 VALUES(?,?,?,?,?,?)`;
    const params = [title, content, cateCode, date, date, adminId];
    
    conn.query(sql, params, (err, rows) => {
      if(err) throw new Error(err);
      else res.json(rows);
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//ADMIN 업데이트 상세페이지
router.get("/admin/update/detail/:id", (req, res, next) => {
  try {
    let detail_id = req.params.id;    
    let sql = `SELECT * FROM tbl_update WHERE upt_idx=${detail_id}`;

    conn.query(sql, (err, rows) => {
      if(err) throw new Error(err) 
      else res.json(rows[0]);
    });
  } catch (e) {
    console.error(e);
  }
});

//ADMIN 업데이트 글작성 UPDATE
router.post("/update_writing_update", (req, res, next) => {
  try {
    const { uptIdx, categoryCode, title, content, date, adminId } = req.body;    
    const sql = `
      UPDATE tbl_update 
      SET upt_title=?, upt_title_desc_code=?, \`desc\`=?, upt_dt=?, adm_id=?
      WHERE upt_idx = ?
    `
    const params = [title, categoryCode, content, date, adminId, uptIdx];
    conn.query(sql, params, (err, rows) => {
      if(err) throw new Error(err);
      else res.json(rows);
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 이용 가이드 데이터, 서비스 개발자 센터 리스트
router.get("/guideTitleList", (req, res, next) => {
  try {
    const sql = `
      SELECT * FROM tbl_useguide_mast
          `;
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 가이드 이미지 업로드
router.post(
  "/guide_uploade_image_preview",
  uploade.array("image"),
  (req, res) => {
    //img
    res.json(req.files.map((v) => v.filename));
  }
);

router.post("/getGuideDetailList", (req, res, next) => {
  try {
    let useguide_mast_idx = req.body;
    console.log(useguide_mast_idx);
    const sql = `
    SELECT a.*,b.title AS main_title, b.content AS main_content FROM tbl_useguide_desc a RIGHT JOIN tbl_useguide_mast b ON a.useguide_mast_idx = b.useguide_mast_idx WHERE b.useguide_mast_idx = ?
          `;
    const params = [useguide_mast_idx.useguide_mast_idx];
    conn.query(sql, params, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/postGuideDetailModify", (req, res, next) => {
  try {
    let guide = req.body;
    let useguide_mast_idx = req.body.useguide_mast_idx;
    let guideDelArray = req.body.guideDelArray;
    let reg = new Date();
    const mast_sql = `
      UPDATE tbl_useguide_mast SET content=?, uptDt=? WHERE useguide_mast_idx=?
    `;
    const desc_ins_sql = `
      INSERT INTO tbl_useguide_desc (
        useguide_mast_idx,
        title,
        content,
        regDt,
        uptDt
      ) VALUES (?, ?, ?, ?, ?)
          `;
    const desc_upt_sql = `
      UPDATE tbl_useguide_desc SET title=?, content=?, uptDt=? WHERE useguide_desc_idx=?
    `;
    const desc_del_sql = `
      DELETE FROM tbl_useguide_desc WHERE useguide_desc_idx IN (
        ${guideDelArray.join(",")}
        )
    `;

    const mast_params = [guide.guideMastContent, reg, useguide_mast_idx];
    conn.query(mast_sql, mast_params, async (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        if (guide.guideArray) {
          if (Array.isArray(guide.guideArray)) {
            await Promise.all(
              guide.guideArray.map((item) => {
                if (guideDelArray.length > 0) {
                  conn.query(desc_del_sql, (err, rows) => {
                    if (err) {
                      console.error(err);
                    }
                  });
                }
                if (item.useguide_desc_idx) {
                  const desc_upt_params = [
                    item.title,
                    item.content,
                    reg,
                    item.useguide_desc_idx,
                  ];
                  conn.query(desc_upt_sql, desc_upt_params, (err, rows) => {
                    if (err) {
                      console.error(err);
                    }
                  });
                } else {
                  const desc_params = [
                    useguide_mast_idx,
                    item.title,
                    item.content,
                    reg,
                    reg,
                  ];
                  conn.query(desc_ins_sql, desc_params, (err, rows) => {
                    if (err) {
                      console.error(err);
                    }
                  });
                }
              })
            );
          }
        }
        res.send(null);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/admin_forum_post_list", (req, res, next) => {
  //메인 게시물 전체
  try {
    const sql = `
      SELECT * FROM tbl_forum_mast AS A
      LEFT JOIN tbl_forum_file AS B
         ON A.forum_idx = B.forum_post_idx
         order by forum_idx desc
      `;

    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        if (rows.length === 0) {
          res.status(404).send("게시물이 존재하지 않습니다.");
        } else {
          res.json(rows);
        }
      }
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/post_comments_list", (req, res, next) => {
  try {
    const sql = "SELECT * FROM tbl_forum_answr";

    conn.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });

  } catch (e) {
    console.error(e);
    return next(e);
  }
});


module.exports = router;

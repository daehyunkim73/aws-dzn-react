const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
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
//★★★★★★★★★★★★★공지사항★★★★★★★★★★★★★
//notice1 메인페이지
router.get("/notice_main_list", (req, res, next) => {
  let sql = `SELECT tn.*,DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat FROM tbl_notice tn order by uptDt, regDt desc`;
  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});
//notice2 상세페이지
router.get("/notice/content", (req, res, next) => {
  try {
    let notice_detail_id = req.query.id;
    let sql = `SELECT tn.*, DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat FROM tbl_notice tn where ntc_idx=${notice_detail_id}`;
    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        let up_sql = `UPDATE tbl_notice SET ntc_vw_cnt = ntc_vw_cnt + 1 WHERE ntc_idx = ${notice_detail_id}`;
        conn.query(up_sql, (err, up_rows) => {
          if (err) {
            return console.error(err);
          } else {
            res.json(rows);
          }
        });
      }
    });
  } catch (e) {
    console.error(e);
  }
});
//★★★★★★★★★★★★★ FAQ ★★★★★★★★★★★★★
//faq1 메인페이지
router.get("/faq_all_list", (req, res, next) => {
  try {
    let where = ` WHERE 0=0 `;
    const { cate, search } = req.query;

    let sql = `SELECT  tf.*, tc.sub_cate_name,
        DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat
        FROM datadevcenterdb.tbl_faq tf INNER JOIN tbl_code AS tc
      ON tf.faq_type_code = tc.sub_cate_name AND main_cate_code = 'faq_gbn_cate'`;

    if (cate !== "" && cate !== null && cate !== undefined && cate !== "0") {
      console.log("전체가 아님");
      where += ` AND tf.faq_type_code = '${cate}'`;
    }

    if (search !== "" && search !== null && search !== undefined) {
      where += ` AND (tf.faq_title LIKE '%${search}%' OR tf.faq_desc LIKE '%${search}%') `;
    }

    sql += `${where} ORDER BY regDtFormat DESC `;

    conn.query(sql, (err, rows) => {
      if (err) {
        throw new Error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
  }
});
//faq2 상세페이지
router.get("/faq/content/list", (req, res, next) => {
  try {
    let faq_idx = req.query.id;
    let sql = `select tf.*,
        DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat
        from datadevcenterdb.tbl_faq tf 
        where faq_idx = ${faq_idx}`;
    conn.query(sql, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/faq/category", (req, res, next) => {
  try {
    let sql = `SELECT * FROM tbl_code WHERE main_cate_code = "faq_gbn_cate"`;

    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
  }
});

//★★★★★★★★★★★★★문의하기★★★★★★★★★★★★★
//quest1 메인페이지
router.get("/question_main_list", (req, res, next) => {
  try {
    const { mbr_id, type, state, search } = req.query;

    // let where = ` WHERE mbr_id = '${mbr_id}'`;
    let where = ` WHERE 0=0 `;
    let sql = `       
      SELECT tq.rnum AS rnum,
              tq.qst_idx AS qstIdx,
              tq.mbr_id AS mbrId,
              tq.qst_type_code AS qstTypeCode,
              tc.sub_cate_name AS qstTypeName,
              tq.regDt AS qstRegDate,
              tq.title AS qstTitle,
              tq.desc AS qstDesc,
              ta.awr_idx AS awrIdx,
              ta.title AS adminTitle,
              ta.desc AS adminDesc,
              ta.regDt AS adminReq FROM (            
      SELECT @rownum:=@rownum+1 AS rnum, tq.* 
      FROM tbl_quest AS tq, (SELECT @ROWNUM := 0) R
      ) AS tq
      LEFT OUTER JOIN tbl_answer AS ta
      ON tq.qst_idx = ta.qst_idx
          INNER JOIN tbl_code AS tc
      ON tq.qst_type_code = tc.sub_cate_code AND main_cate_code = 'question_type'    
    `;

    if (type !== "" && type !== null && type !== undefined) {
      where += ` AND  tq.qst_type_code = ${type}`;
    }
    if (state !== "" && state !== null && state !== undefined) {
      if (state === "0") where += ` AND ta.awr_idx IS NULL `;
      else where += ` AND  ta.awr_idx IS NOT NULL `;
    }
    if (search !== "" && search !== null && search !== undefined) {
      where += ` AND (tq.title LIKE '%${search}%' OR tq.desc LIKE '%${search}%') `;
    }

    sql += `${where} ORDER BY rnum DESC `;

    conn.query(sql, (err, rows) => {
      if (err) {
        throw new Error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
  }
});
//★★★★★★★★★★★★★문의하기★★★★★★★★★★★★★
//quest2 상세페이지
router.get("/question/content/list", (req, res, next) => {
  try {
    const qst_idx = req.query.qst_idx;

    const sql = `SELECT tq.qst_idx AS tqIdx,
        tq.regDt AS tqRegDt,
        tq.qst_type_code AS tqTypeCode,
        tc.sub_cate_name AS tqTypeName,
        tq.title AS tqTitle, 
        tq.desc AS tqDesc, 
        ta.title AS taTitle, 
        ta.desc AS taDesc, 
        ta.regDt AS taRegDt, 
        IF(ta.awr_idx is not null, '답변등록', '답변미등록' ) AS stat
            FROM tbl_quest AS tq 
        LEFT OUTER JOIN tbl_answer AS ta 
          ON tq.qst_idx = ta.qst_idx 
        INNER JOIN tbl_code AS tc
          ON tq.qst_type_code = tc.sub_cate_code 
            AND main_cate_code = 'question_type'
        WHERE tq.qst_idx = ${qst_idx}`;

    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
  }
});
//★★★★★★★★★★★★★문의하기★★★★★★★★★★★★★
//quest3 글저장
router.post("/quest_uploade_img", uploade.array("image"), (req, res) => {
  //파일
  res.json(req.files.map((v) => v.path));
});

router.post("/question_wirteing_save", async (req, res, next) => {
  //게시글 저장
  try {
    const { mbrId, title, category, content, date } = req.body;
    let sql =
      "INSERT INTO tbl_quest(`mbr_id`, `qst_type_code`, `title`, `desc`, regDt) VALUES(?, ?, ?, ?, ?)";
    let params = [mbrId, category, title, content, date];

    conn.query(sql, params, async (err, rows) => {
      if (err) {
        throw new Error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post(
  "/quest_uploade_image_preview",
  uploade.array("image"),
  (req, res) => {
    //img
    res.json(req.files.map((v) => v.filename));
  }
);
router.post("/quest_delete_checked", (req, res, next) => {
  try {
    const param = req.body;
    const qst_idx = param.join(",");

    const sql = `DELETE FROM tbl_quest WHERE qst_idx IN (${qst_idx})`;
    conn.query(sql, (err, rows) => {
      if (err) {
        throw new Error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.error(e);
  }
});

//★★★★★★★★★★★★★업데이트★★★★★★★★★★★★★
router.get("/question_file_post", (req, res, next) => {
  try {
    let sql = "SELECT * FROM tbl_quest_file";
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
//update1 메인페이지
router.get("/update_main_list", (req, res, next) => {
  let sql =
    "SELECT MAIN_INDEX, UPT_MAIN_CODE, UPT_MAIN_NAME, REG_DATE, UPT_DATE FROM TBL_UPDATE_MAIN order by REG_DATE desc";
  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});
//update 검색
router.get("/update", (req, res, next) => {
  try {
    if (!req.query.upt_idx) {
      let uptGroup_list = req.query.upt_title_desc_code;

      let sql = `SELECT * FROM tbl_update WHERE upt_title_desc_code='${uptGroup_list}' order by regDt DESC`;
      conn.query(sql, (err, rows) => {
        err ? console.error(err) : res.json(rows);
      });
    } else {
      let uptGroup_list = req.query.upt_title_desc_code;
      let upt_idx = req.query.upt_idx;
      let sql = `SELECT * FROM tbl_update 
                 WHERE upt_title_desc_code='${uptGroup_list}' 
                    AND upt_idx=${upt_idx} order by regDt desc`;
      conn.query(sql, (err, rows) => {
        err ? console.error(err) : res.json(rows);
      });
    }
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;

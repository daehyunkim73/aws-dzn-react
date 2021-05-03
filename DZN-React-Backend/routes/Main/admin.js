const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");

//★★★★★★★★★★★★★공지사항★★★★★★★★★★★★★

//리스트

router.get("/notice_main_list", (req, res, next) => {
  let sql = `SELECT tn.*,DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat FROM tbl_notice tn`;
  console;
  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});

//리스트_상세페이지

router.get("/notice/content/:ntc_idx", (req, res, next) => {
  try {
    let ntc_idx = req.params.ntc_idx;
    let sql = `SELECT tn.*, DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat FROM tbl_notice tn where ntc_idx=${ntc_idx}`;
    conn.query(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        let up_sql = `UPDATE tbl_notice SET ntc_vw_cnt = ntc_vw_cnt + 1 where ntc_idx=${ntc_idx}`;
        console.log("up_sql", up_sql);
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

///// ★★★★★★★★★★★★★ 공지사항 관리 게시판 글 쓰기 ★★★★★★★★★★★★★ /////

router.post("/notice_wirteing_save", async (req, res, next) => {
  //게시글 저장
  try {
    let writeNotice = req.body;
    let notice_post = await `SELECT * FROM tbl_notice where=${writeNotice.ntc_idx}`;
    if (!notice_post) {
      res.status(404).send("게시글이 존재하지않습니다.");
    }
    let params = [
      writeNotice.show_gbn,
      writeNotice.notice_type,
      writeNotice.notice_title,
      writeNotice.notice_content,
      writeNotice.notice_date,
    ];
    console.log(params);
    let sql = await "INSERT INTO tbl_notice(`show_gbn`, `ntc_type`, `ntc_title`, `ntc_desc`, regDt) VALUES(?, ?, ?, ?, ?)";
    conn.query(sql, params, (err, rows) => {
      err ? console.error(err) : res.json(rows);
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//★★★★★★★★★★★★★권한관리★★★★★★★★★★★★★

router.get("/Service_product_list_auth", (req, res, next) => {
  //제작서비스 상품정보
  let sql = ` SELECT M.*, N.svc_icon_path_1 AS iconPath, N.pay_type
                FROM tbl_prdsvc_base M
                 LEFT OUTER JOIN tbl_prdsvc_sale_cfg N
                   ON M.pdsvc_idx = N.pdsvc_idx ORDER BY M.regDt DESC `;
  conn.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/Data_product_list_auth", (req, res, next) => {
  //제작데이터 상품정보
  let sql = ` SELECT * FROM tbl_prddata_base ORDER BY pdbase_idx DESC `;
  conn.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/menu_list_auth", (req, res, next) => {
  //매뉴 목록 정보
  let sql = ` SELECT * FROM tbl_menu_code ORDER BY menu_idx DESC `;
  conn.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/menu_authInfo", (req, res, next) => {
  //메뉴별 권한 정보 호출
  let menu_code = req.body.menu_code;
  let sql = `SELECT * FROM  tbl_menu_grant WHERE menu_code =${menu_code} ORDER BY menu_grant_idx DESC`;
  conn.query(sql, [menu_code], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/authInfoSave_dev", (req, res, next) => {
  //데이터상품 권한 정보 저장
  try {
    let cno = req.body.cno;
    let pdbase_idx = req.body.devClassify;
    let deleteArray = req.body.deletArray;
    let saveArray = req.body.saveArray;
    console.log("pdbase_idx", pdbase_idx);
    console.log("saveArray", saveArray);
    let regDt = new Date();
    console.log("deleteArray", deleteArray);
    if (deleteArray.length !== 0) {
      let sql_delete = `DELETE FROM tbl_data_grant WHERE pdbase_idx=? AND cno = ? AND mbr_id IN (
      ${deleteArray
        .map((data) => {
          return `'${data}'`;
        })
        .join(",")} 
      )`;
      let delete_params = [pdbase_idx, cno];
      conn.query(sql_delete, delete_params, (err, rows) => {
        if (err) {
          console.log(err);
        }
      });
    }
    Promise.all(
      saveArray.map((item) => {
        console.log("item", item);
        let sql_overCheck = `SELECT COUNT(*) AS c FROM tbl_data_grant Where pdbase_idx = ? AND cno = ? AND mbr_id = ?`;
        let check_param = [pdbase_idx, cno, item];
        if (saveArray.length !== 0) {
          conn.query(sql_overCheck, check_param, (err, rows) => {
            if (err) {
              console.log(err);
            } else if (rows[0].c === 0) {
              let sql_insert =
                "INSERT INTO tbl_data_grant(pdbase_idx,regDt,cno,mbr_id)VALUES(?,?,?,?)";
              let insert_params = [pdbase_idx, regDt, cno, item];
              conn.query(sql_insert, insert_params, (err, rows) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        }
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/data_product_authInfo", (req, res, next) => {
  //데이터상품별 권한 정보 호출
  let pdbase_idx = req.body.pdbase_idx;
  let sql = `SELECT * FROM  tbl_data_grant WHERE pdbase_idx =${pdbase_idx} ORDER BY data_grant_idx DESC`;
  conn.query(sql, [pdbase_idx], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/Service_product_authInfo", (req, res, next) => {
  //서비스상품별 권한 정보 호출
  let pdsvc_idx = req.body.pdsvc_idx;
  let sql = `SELECT * FROM tbl_svc_grant WHERE pdsvc_idx =${pdsvc_idx} ORDER BY svc_grant_idx DESC`;
  conn.query(sql, [pdsvc_idx], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/authInfoSave_svc", (req, res, next) => {
  //서비스상품 권한 정보 저장

  let cno = req.body.cno;
  let pdsvc_idx = req.body.svcClassify;
  let deleteArray = req.body.deletArray;
  let saveArray = req.body.saveArray;
  console.log("saveArray", saveArray);
  let regDt = new Date();
  console.log("deleteArray", deleteArray);
  if (deleteArray.length !== 0) {
    let sql_delete = `DELETE FROM tbl_svc_grant WHERE pdsvc_idx=? AND cno = ? AND mbr_id IN (
      ${deleteArray
        .map((data) => {
          return `'${data}'`;
        })
        .join(",")}      
      )`;
    let delete_params = [pdsvc_idx, cno];
    conn.query(sql_delete, delete_params, (err, rows) => {
      if (err) {
        console.log(err);
      }
    });
  }
  Promise.all(
    saveArray.map((item) => {
      console.log("item", item);
      let sql_overCheck = `SELECT COUNT(*) AS c FROM tbl_svc_grant Where pdsvc_idx = ? AND cno = ? AND mbr_id = ?`;
      let check_param = [pdsvc_idx, cno, item];
      if (saveArray.length !== 0) {
        conn.query(sql_overCheck, check_param, (err, rows) => {
          console.log("rows", rows);
          if (err) {
            console.log(err);
          } else if (rows[0].c === 0) {
            let sql_insert =
              "INSERT INTO tbl_svc_grant(pdsvc_idx,regDt,cno,mbr_id)VALUES(?,?,?,?)";
            let insert_params = [pdsvc_idx, regDt, cno, item];
            conn.query(sql_insert, insert_params, function (err, rows) {
              if (err) {
                console.log(err);
              } else {
                res.json(rows);
              }
            });
          }
        });
      }
    })
  );
});
router.post("/authInfoSave_menu", (req, res, next) => {
  //데이터상품 권한 정보 저장
  try {
    let cno = req.body.cno;
    let menu_code = req.body.menuClassify;
    let deleteArray = req.body.deletArray;
    let saveArray = req.body.saveArray;
    console.log("menu_code", menu_code);
    console.log("saveArray", saveArray);
    let regDt = new Date();
    console.log("deleteArray", deleteArray);
    if (deleteArray.length !== 0) {
      let sql_delete = `DELETE FROM tbl_menu_grant WHERE menu_code=? AND cno = ? AND mbr_id IN (
      ${deleteArray
        .map((data) => {
          return `'${data}'`;
        })
        .join(",")} 
      )`;
      let delete_params = [menu_code, cno];
      conn.query(sql_delete, delete_params, (err, rows) => {
        if (err) {
          console.log(err);
        }
      });
    }
    Promise.all(
      saveArray.map((item) => {
        console.log("item", item);
        let sql_overCheck = `SELECT COUNT(*) AS c FROM tbl_menu_grant Where menu_code = ? AND cno = ? AND mbr_id = ?`;
        let check_param = [menu_code, cno, item];
        if (saveArray.length !== 0) {
          conn.query(sql_overCheck, check_param, (err, rows) => {
            if (err) {
              console.log(err);
            } else if (rows[0].c === 0) {
              let sql_insert =
                "INSERT INTO tbl_menu_grant(menu_code,regDt,cno,mbr_id)VALUES(?,?,?,?)";
              let insert_params = [menu_code, regDt, cno, item];
              conn.query(sql_insert, insert_params, (err, rows) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        }
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/agree_cirtification", (req, res, next) => {
  let dzon_mbr_idx = req.body.userNum;
  let comp_idx = req.body.cno;
  let term_agree = 1;
  console.log("body", req.body);
  let sql =
    "INSERT INTO tbl_member(dzon_mbr_idx,comp_idx,term_agree)VALUES(?,?,?)";
  let insert_params = [dzon_mbr_idx, comp_idx, term_agree];
  conn.query(sql, insert_params, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/agree_cirtification_logic", (req, res, next) => {
  let dzon_mbr_idx = req.body.userNum;
  console.log("body", req.body);
  let sql = `SELECT * FROM  tbl_member WHERE dzon_mbr_idx =${dzon_mbr_idx}`;
  let select_params = [dzon_mbr_idx];
  conn.query(sql, select_params, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;

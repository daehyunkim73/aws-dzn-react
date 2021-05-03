const express = require("express");
const router = express.Router();
const db_config = require("../models/db");
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

router.get("/svc_use_api_managment", (req, res, next) => {
  try {
    const sql = `
    SELECT *, B.req_dt AS imsi_req_dt, A.stat AS svc_stat FROM 
    tbl_prdsvc_base 
    AS A 
    INNER JOIN 
    tbl_prdsvc_api_reqres AS B 
    ON A.pdsvc_idx = B.pdsvc_idx 
    order by svcapi_idx desc

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

router.post("/svc_use_api_update_res", async (req, res, next) => {
  try {
    const update_sql =
      `UPDATE tbl_prdsvc_api_reqres SET stat=?, res_dt=?, use_gbn="Y" WHERE svcapi_idx=?`;
    await Promise.all(
      req.body.api_info.map((api_infos) => {
        const params = [
          req.body.state_act_info,
          req.body.admin_arr_reg_dt,
          api_infos.svcapi_idx,
        ];
        conn.query(update_sql, params, (err, rows) => {
          if (err) {
            return console.error(err);
          }
        });
      })
    );
    await res.send(null);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post(
  "/svc_use_api_form_data_res",
  uploade.single("admin_image"),
  (req, res, next) => {
    try {
      res.json(req.file);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

router.post("/svc_use_api_compation_fl_res", (req, res, next) => {
  try {
    const update_sql =
      "UPDATE tbl_prdsvc_api_reqres SET stat=?, memo=?, addFile=? WHERE svcapi_idx=?";
    Promise.all(
      req.body.api_info.map((api_infos) => {
        const params = [
          req.body.api_compaion_stat,
          req.body.companion_text,
          req.body.fl_req_data,
          api_infos.svcapi_idx,
        ];
        conn.query(update_sql, params, (err, rows) => {
          if (err) {
            return console.error(err);
          }
        });
      })
    );
    res.send(null);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/judegeReturn", (req, res, next) => {
  let svc_apprvlreq_idx = req.body.idx;
  let sql = `SELECT* FROM tbl_svc_apprvl WHERE svc_apprvlreq_idx =?`;
  conn.query(sql, [svc_apprvlreq_idx], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});
router.post("/judegeReq", (req, res, next) => {
  let svc_apprvlreq_idx = req.body.idx;
  let sql = `SELECT* FROM tbl_svc_apprvl WHERE svc_apprvlreq_idx =?`;
  conn.query(sql, [svc_apprvlreq_idx], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});
router.post("/getInfraInfo", (req, res, next) => {
  // 인프라 승인관리
  try {
    const searchData = req.body.searchData;
    let where = ' where 0=0 ';
    let type = 'req_dt';
    if(searchData){
      type = searchData.searchDateType === '1' ? 'res_dt' : 'req_dt';
      const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
      const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
      const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;

      if(startDate !== undefined && startDate !== '') {
          where += ` and ${type} >= '${startDate}' and ${type} <= '${endDate}'`;
      }

      if(searchTerm !== undefined && searchTerm !== '') {
          where += ` and svc_title like '%${searchTerm}%'`;
      }
  }
    const sql = `
    SELECT *, a.stat AS svc_stat FROM tbl_prdsvc_base a INNER JOIN tbl_prdsvc_infra_reqres b ON a.pdsvc_idx = b.pdsvc_idx ${where} ORDER BY ${type} DESC
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

router.post("/judge_res", function (req, res, next) {
  //서비스상품 승인요청
  let filePath = req.body.filePath;
  let apprvlres_dt = new Date();
  let pdsvc_idx = req.body.pdsvc_idx;
  let JudegeRes = req.body.JudegeRes;
  let svc_stat = req.body.svc_stat;
  let stat = JudegeRes + 2;
  let base_stat = JudegeRes + 1;
  let memo = req.body.memo_req;
  let add_file_name = req.body.upload_file_name;
  let sql = `UPDATE tbl_svc_apprvl SET admin_addFile=?, apprvlres_dt=?, stat=?, admin_add_file_name=?, memo=? WHERE pdsvc_idx=? AND stat='0'`;
  let sql2 = `UPDATE tbl_prdsvc_base SET stat=? WHERE pdsvc_idx=?`;
  let sql3 = `UPDATE tbl_prdsvc_base SET judge_stat=? WHERE pdsvc_idx=?`;
  let params1 = [
    filePath,
    apprvlres_dt,
    JudegeRes,
    add_file_name,
    memo,
    pdsvc_idx,
  ];
  let params2 = [stat, pdsvc_idx];
  let params3 = [base_stat, pdsvc_idx];
  conn.query(sql, params1, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      if (svc_stat === 5 || svc_stat === 6) {
        conn.query(sql3, params3, function (err, result, fields) {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("상태변경 성공");
          }
        });
      } else {
        conn.query(sql2, params2, function (err, result, fields) {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("상태변경 성공");
          }
        });
      }
    }
  });
});
router.get("/product/control/service_by_id", (req, res, next) => {
  let serviceID = req.query.id;
  let sql = `SELECT * FROM tbl_prdsvc_base WHERE pdsvc_idx =${serviceID}`;
  conn.query(sql, [], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});

router.post("/infra_req_list_judged_ok", (req, res, next) => {
  //승인된 인프라 서비스 목록 정보
  let pdsvc_idx = req.body.pdsvc_idx;

  let sql = `SELECT * FROM tbl_prdsvc_infra_reqres WHERE pdsvc_idx =${pdsvc_idx} AND stat = 1 ORDER BY reqsvcinfra_idx DESC `;
  conn.query(sql, [pdsvc_idx], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});
router.post(
  //승인심사 첨부파일 form data 처리
  "/judge_file",
  uploade.single("upload_file"),
  (req, res) => {
    //파일
    res.json(req.file.path);
  }
);

router.post(
  "/infraFileAdd",
  uploade.single("InfraFileFormData"),
  (req, res) => {
    res.json(req.file.path);
  }
);

router.post("/uptInfraInfo", (req, res, next) => {
  // 인프라 승인 업데이트
  let resDt = new Date();

  try {
    const Upt_sql = `
      UPDATE tbl_prdsvc_infra_reqres SET stat=?,return_memo=?,add_file_name=?,add_file_path=?,res_dt=? WHERE pdsvc_idx=? AND reqsvcinfra_idx = ?
        `;

    const params = [
      req.body.stat,
      req.body.return_memo,
      req.body.add_file_name,
      req.body.add_file_path,
      resDt,
      req.body.pdsvc_idx,
      req.body.reqsvcinfra_idx,
    ];
    conn.query(Upt_sql, params, (err, rows) => {
      if (err) {
        return console.error(err);
      }
    });

    res.send();
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/use_api_list_using", (req, res, next) => {
  //서비스상품 사용API 정보
  let pdsvc_idx = req.body.pdsvc_idx;
  try {
    const sql = `SELECT * FROM tbl_prdsvc_api_reqres WHERE pdsvc_idx =${pdsvc_idx} AND use_gbn = 'Y' ORDER BY svcapi_idx DESC`;

    conn.query(sql, [pdsvc_idx], (err, rows) => {
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
router.get("/cate_list_using", (req, res, next) => {
  try {
    const sql = "SELECT * FROM tbl_wehago_cate";

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
router.post("/service_goods_management_judgetable", (req, res, next) => {
  //제작서비스 승인심사 테이블
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    const sql =
      "SELECT * FROM tbl_svc_apprvl WHERE pdsvc_idx = ? ORDER BY svc_apprvlreq_idx DESC";
    const params = [pdsvc_idx];
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

router.post("/service_goods_management_judgetable", (req, res, next) => {
  //제작서비스 승인심사 테이블
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    const sql =
      "SELECT * FROM tbl_svc_apprvl WHERE pdsvc_idx = ? ORDER BY svc_apprvlreq_idx DESC";
    const params = [pdsvc_idx];
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


router.post("/getSvcInfo", (req, res, next) => {
  // 서비스 승인관리
  try {
    const searchData = req.body.searchData;
    let where = ' where a.stat NOT IN (1) ';
    let type = 'apprvlreq_dt';
    if(searchData){
      type = searchData.searchDateType === '1' ? 'apprvlres_dt' : 'apprvlreq_dt';
      const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
      const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
      const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;

      if(startDate !== undefined && startDate !== '') {
          where += ` and ${type} >= '${startDate}' and ${type} <= '${endDate}'`;
      }

      if(searchTerm !== undefined && searchTerm !== '') {
          where += ` and svc_title like '%${searchTerm}%'`;
      }
  }
    const sql = `
    SELECT * FROM tbl_prdsvc_base a INNER JOIN tbl_svc_apprvl b  ON a.pdsvc_idx = b.pdsvc_idx ${where} ORDER BY ${type} DESC
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

router.post("/getSvcSaleInfo", (req, res, next) => {
  // 판매서비스 승인관리
  try {
    const searchData = req.body.searchData;
    let where = ' where b.stat NOT IN (1,2,3,4) ';
    let type = 'b.regDt';
    if(searchData){
      type = searchData.searchDateType === '1' ? 'b.uptDt' : 'b.regDt';
      const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
      const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
      const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;

      if(startDate !== undefined && startDate !== '') {
          where += ` and ${type} >= '${startDate}' and ${type} <= '${endDate}'`;
      }

      if(searchTerm !== undefined && searchTerm !== '') {
          where += ` and b.svc_title like '%${searchTerm}%'`;
      }
  }
    const sql = `
    SELECT a.*, b.svc_title, b.regDt, b.uptDt, b.stat FROM tbl_prdsvc_sale_cfg a 
    INNER JOIN tbl_prdsvc_base b
	  ON a.pdsvc_idx = b.pdsvc_idx ${where} ORDER BY ${type} DESC
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


//판매정보 카테고리
router.get("/getSvcCateInfo", (req, res, next) => {
  try {
    const sql = `   SELECT
                            sub_cate_name
                        FROM tbl_code
                        WHERE main_cate_code = 'svc_gbn_cate'
                        ORDER BY value1 ASC 
                    `;
    conn.query(sql, [], (err, rows) => {
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

// 서비스 상세 페이지 기본정보
router.post("/getBasicInfo", (req, res, next) => {
  // 기본 정보
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    const sql = `
      SELECT * FROM tbl_prdsvc_base WHERE pdsvc_idx = ${pdsvc_idx}
    `;
    const params = [pdsvc_idx];
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

// 서비스 상세 페이지 판매정보
router.post("/getSvcSaleDetailInfo", (req, res, next) => {
  // 판매 정보
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    const sql = `
      SELECT * FROM tbl_prdsvc_sale_cfg AS a
  INNER JOIN tbl_prdsvc_sale_cfg_sc AS b
      ON b.pdsvc_idx = a.pdsvc_idx
  WHERE a.pdsvc_idx = ${pdsvc_idx}
  `;
    const params = [pdsvc_idx];
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

// 판매정보
router.post("/svcSaleGbnSave", (req, res, next) => {
  let pdsvc_idx = req.body.pdsvc_idx;
  let show_gbn = req.body.show_gbn;
  let stat = req.body.stat;
  let stat_Uptsql = `UPDATE tbl_prdsvc_base SET stat=? WHERE pdsvc_idx=?`;
  let showGbn_Uptsql = `UPDATE tbl_prdsvc_sale_cfg SET show_gbn=? WHERE pdsvc_idx=?`;
  let stat_params = [show_gbn, pdsvc_idx];
  let showGbn_params = [stat, pdsvc_idx];
  conn.query(stat_Uptsql, showGbn_params, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      conn.query(showGbn_Uptsql, stat_params, (err, rows) => {
        if (err) {
          console.error(err);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

//판매정보 카테고리
router.get("/getSvcSaleGbnCate", (req, res, next) => {
  try {
    const sql = `   SELECT
                            code_idx,
                            main_cate_code,
                            main_cate_name,
                            sub_cate_code,
                            sub_cate_name,
                            value1,
                            value2,
                            use_gbn
                        FROM tbl_code
                        WHERE main_cate_code = 'svc_gbn_cate'
                        ORDER BY value1 ASC 
                    `;
    conn.query(sql, [], (err, rows) => {
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

router.post("/getSvcFeeInfo", (req, res, next) => {
  // 판매 정보 결제정보
  try {
    let pdsvc_idx = req.body.pdsvc_idx;

    const sql = `
      SELECT *
                          FROM tbl_prdsvc_fee
                          WHERE pdsvc_idx = ?
  `;

    const params = [pdsvc_idx];
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

router.post("/uptSvcSaleInfo", async (req, res, next) => {
  //서비스 상세정보 판매정보 안에 결제정보 값 수정
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    let resDt = new Date();

    const cfg_update_sql =
      "UPDATE tbl_prdsvc_sale_cfg SET pay_type=?, paid_payment_gbn=?, paid_payment_price=?, point_gbn=?, pay_notice=?, uptDt=?  WHERE pdsvc_idx=?";

    const fee_insert_sql = `INSERT INTO tbl_prdsvc_fee
      (
        pdsvc_idx,
        lic_user_limit,
        lic_mnthly_chrgeAmnt,
        regDt,
        uptDt
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const fee_del_sql = `
        DELETE FROM tbl_prdsvc_fee
        WHERE pdsvc_idx = ?
        `;

    const cfg_params = [
      req.body.pay_type,
      req.body.paid_payment_gbn,
      req.body.paid_payment_price,
      req.body.point_gbn,
      req.body.pay_notice,
      resDt,
      pdsvc_idx,
    ];
    conn.query(cfg_update_sql, cfg_params, (err, rows) => {
      if (err) {
        return console.error(err);
      }
    });

    conn.query(fee_del_sql, [pdsvc_idx], (err, rows) => {
      if (err) {
        console.log(err);
        conn.rollback();
      }
    });

    if (req.body.paid_payment_gbn === 1) {
      await Promise.all(
        req.body.lic_data_array.map((item) => {
          if (item.lic_user_limit !== "" && item.lic_mnthly_chrgeAmnt !== "") {
            let fee_params = [
              pdsvc_idx,
              item.lic_user_limit,
              item.lic_mnthly_chrgeAmnt,
              resDt,
              resDt,
            ];
            conn.query(fee_insert_sql, fee_params, (err, rows) => {
              if (err) {
                return console.error(err);
              }
            });
          }
        })
      );
    }
    res.send(null);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

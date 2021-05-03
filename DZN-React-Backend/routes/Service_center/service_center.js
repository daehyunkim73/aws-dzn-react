const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");

const uploade = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        console.log("img");
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

//서비스 추가 팝업 라우터
router.post("/service_product_add", function (req, res, next) {
  try {
    let svc_title = req.body.svc_title;
    let svc_url = req.body.svc_url;
    let svc_type = req.body.svc_type;
    let regDt = new Date();
    let stat = 1;
    let sql1 = `SELECT COUNT(*) AS c FROM tbl_prdsvc_base Where svc_title = ?`;
    let sql2 = `SELECT COUNT(*) AS c FROM tbl_prdsvc_base Where svc_url = ?`;
    let sql3 =
      "INSERT INTO tbl_prdsvc_base(svc_title,svc_url,svc_type,regDt,stat)VALUES(?,?,?,?,?)";
    let titile = [svc_title];
    let url = [svc_url];
    let params = [svc_title, svc_url, svc_type, regDt, stat];

    conn.query(sql1, titile, function (err, result, fields) {
      if (err) {
        console.log(err);
      } else if (result[0].c > 0) {
        res.send("1");
      } else {
        conn.query(sql2, url, function (err, result, fields) {
          if (err) {
            console.log(err);
          } else if (result[0].c > 0) {
            res.send("2");
          } else {
            conn.query(sql3, params, function (err, result, fields) {
              if (err) {
                console.log(err);
              } else {
                res.send("3");
              }
            });
          }
        });
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 서비스센터 대시보드 API 업데이트
router.get("/Uptapilist", (req, res, next) => {
  try {
    let sql = `SELECT * FROM datadevcenterdb.tbl_update ORDER BY upt_dt DESC`;
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.errer(e);
    next(e);
  }
});

// 서비스센터 대시보드 서피스 판매활동
router.get("/svcSaleList", (req, res, next) => {
  try {
    let sql = `SELECT a.*, b.svc_icon_path_1 FROM tbl_prdsvc_base a INNER JOIN tbl_prdsvc_sale_cfg b ON a.pdsvc_idx = b.pdsvc_idx WHERE a.stat=5 ORDER BY uptDt DESC`;
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.errer(e);
    next(e);
  }
});

//서비스 기본정보 중복확인 라우터: 제목
router.post("/product/control/checkOverlappingTitle", function (
  req,
  res,
  next
) {
  let svc_title = req.body.svc_title;
  let pdsvc_idx = req.body.pdsvc_idx;
  let sql1 = `SELECT COUNT(*) AS c FROM tbl_prdsvc_base Where pdsvc_idx <> ? and svc_title = ?`;
  let params = [pdsvc_idx, svc_title];

  conn.query(sql1, params, function (err, result, fields) {
    if (err) {
      console.log(err);
    } else if (result[0].c > 0) {
      console.log("this", result[0].c);
      res.send("1");
    } else {
      console.log("this", result[0].c);
      res.send("2");
    }
  });
});

//서비스 기본정보 중복확인 라우터: URL
router.post("/product/control/checkOverlappingURL", function (req, res, next) {
  let svc_url = req.body.svc_url;
  let pdsvc_idx = req.body.pdsvc_idx;
  let sql1 = `SELECT COUNT(*) AS c FROM tbl_prdsvc_base Where pdsvc_idx <> ? and svc_url = ?`;
  let params = [pdsvc_idx, svc_url];

  conn.query(sql1, params, function (err, result, fields) {
    if (err) {
      console.log(err);
    } else if (result[0].c > 0) {
      res.send("1");
    } else {
      res.send("2");
    }
  });
});

router.post("/service_product_delete", function (req, res) {
  //form태그를 통하여 post 방식으로 데이터를 전달 받는다.
  let pdsvc_idx = req.body.pullidx;
  let sql = "DELETE FROM tbl_prdsvc_base WHERE pdsvc_idx=?"; //DELETE sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
  conn.query(sql, [pdsvc_idx], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send();
    }
  });
});
router.post("/service_product_delete_saleImg", function (req, res) {
  //form태그를 통하여 post 방식으로 데이터를 전달 받는다.
  let pdsvc_idx = req.body.pullidx;
  let sql = "DELETE FROM tbl_prdsvc_sale_cfg_sc WHERE pdsvc_idx=?"; //DELETE sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
  conn.query(sql, [pdsvc_idx], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send();
    }
  });
});

router.post("/service_product_delete_saleInfo", function (req, res) {
  //form태그를 통하여 post 방식으로 데이터를 전달 받는다.
  let pdsvc_idx = req.body.pullidx;
  let sql = "DELETE FROM tbl_prdsvc_sale_cfg WHERE pdsvc_idx=?"; //DELETEs sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
  conn.query(sql, [pdsvc_idx], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send();
    }
  });
});
router.post("/service_product_delete_api", function (req, res) {
  //form태그를 통하여 post 방식으로 데이터를 전달 받는다.
  let pdsvc_idx = req.body.pullidx;
  let sql = "DELETE FROM tbl_prdsvc_api_reqres WHERE pdsvc_idx=?"; //DELETEs sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
  conn.query(sql, [pdsvc_idx], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send();
    }
  });
});

router.post("/product/control/edit_first", function (req, res, next) {
  let pdsvc_idx = req.body.pdsvc_idx; //url의 파라미터로 id 값을 얻을 수 있다.
  let svc_title = req.body.svc_title;
  let svc_url = req.body.svc_url;
  let svc_uri = req.body.svc_uri;
  let svc_id = req.body.svc_id;
  let svc_key = req.body.svc_key;
  let secret_key = req.body.secret_key;
  let svc_id_dt = req.body.svc_id_dt;
  let sql = `UPDATE tbl_prdsvc_base SET svc_title=?, svc_url=?, svc_uri=?, svc_id=?, svc_id_dt=?, svc_key=?, secret_key=? WHERE pdsvc_idx=?`;

  let params = [
    svc_title,
    svc_url,
    svc_uri,
    svc_id,
    svc_id_dt,
    svc_key,
    secret_key,
    pdsvc_idx,
  ];
  conn.query(sql, params, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("1");
    }
  });
});

router.post("/product/control/edit_second", function (req, res, next) {
  let pdsvc_idx = req.body.pdsvc_idx; //url의 파라미터로 id 값을 얻을 수 있다.
  let svc_title = req.body.svc_title;
  let svc_url = req.body.svc_url;
  let svc_uri = req.body.svc_uri;
  let uptDt = req.body.uptDt;
  let sql = `UPDATE tbl_prdsvc_base SET svc_title=?, svc_url=?, svc_uri=?, uptDt=? WHERE pdsvc_idx=?`;

  let params = [svc_title, svc_url, svc_uri, uptDt, pdsvc_idx];

  conn.query(sql, params, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("1");
    }
  });
});

router.get("/Service_product_list", (req, res, next) => {
  //제작서비스 상품정보
  let sql = ` SELECT M.*, N.svc_icon_path_1 AS iconPath, N.pay_type
              FROM tbl_prdsvc_base M
               LEFT OUTER JOIN tbl_prdsvc_sale_cfg N
                 ON M.pdsvc_idx = N.pdsvc_idx
              WHERE M.stat Not in (5,6) 
              ORDER BY M.regDt DESC `;
  conn.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/Service_product_list_sale", (req, res, next) => {
  //판매서비스 상품정보
  let sql = ` SELECT M.*, N.svc_icon_path_1 AS iconPath, N.pay_type
              FROM tbl_prdsvc_base M
               LEFT OUTER JOIN tbl_prdsvc_sale_cfg N
                 ON M.pdsvc_idx = N.pdsvc_idx
              WHERE M.stat Not in (1,2,3,4)
              ORDER BY M.regDt DESC `;
  conn.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
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
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});

router.post("/infra_req_list", (req, res, next) => {
  //승인요청한 인프라 서비스 목록 정보
  let pdsvc_idx = req.body.pdsvc_idx;

  let sql = `SELECT * FROM tbl_prdsvc_infra_reqres WHERE pdsvc_idx =${pdsvc_idx} AND stat <> 1 ORDER BY reqsvcinfra_idx DESC `;
  conn.query(sql, [pdsvc_idx], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
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

router.post("/judge_req", function (req, res, next) {
  //서비스상품 재승인요청
  let filePath = req.body.filePath;
  let apprvlreq_dt = new Date();
  let stat_gbn = req.body.stat_gbn;
  let pdsvc_idx = req.body.pdsvc_idx;
  let stat = 0;
  let stat_base = 2;
  let add_file_name = req.body.upload_file_name;
  let sql =
    "INSERT INTO tbl_svc_apprvl(addFile, apprvlreq_dt, stat_gbn, pdsvc_idx, stat, add_file_name)VALUES(?,?,?,?,?,?)";
  let sql2 = `UPDATE tbl_prdsvc_base SET stat=? WHERE pdsvc_idx=?`;
  let params1 = [
    filePath,
    apprvlreq_dt,
    stat_gbn,
    pdsvc_idx,
    stat,
    add_file_name,
  ];
  let params2 = [stat_base, pdsvc_idx];
  conn.query(sql, params1, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      conn.query(sql2, params2, function (err, result, fields) {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("상태변경 성공");
        }
      });
    }
  });
});
router.post("/rejudge_req", function (req, res, next) {
  //서비스상품 승인요청
  let filePath = req.body.filePath;
  let apprvlreq_dt = new Date();
  let stat_gbn = req.body.stat_gbn;
  let pdsvc_idx = req.body.pdsvc_idx;
  let stat = 0;
  let stat_base = 1;
  let memo_req = req.body.memo_req;
  let rereq_reason_p = req.body.rereq_reason_p;
  let rereq_reason_e = req.body.rereq_reason_e;
  let add_file_name = req.body.upload_file_name;
  console.log("sss", memo_req);
  let sql =
    "INSERT INTO tbl_svc_apprvl(addFile, apprvlreq_dt, stat_gbn, pdsvc_idx, stat, memo_req, rereq_reason_p, rereq_reason_e, add_file_name)VALUES(?,?,?,?,?,?,?,?,?)";
  let sql2 = `UPDATE tbl_prdsvc_base SET judge_stat=? WHERE pdsvc_idx=?`;
  let params1 = [
    filePath,
    apprvlreq_dt,
    stat_gbn,
    pdsvc_idx,
    stat,
    memo_req,
    rereq_reason_p,
    rereq_reason_e,
    add_file_name,
  ];
  let params2 = [stat_base, pdsvc_idx];
  conn.query(sql, params1, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      conn.query(sql2, params2, function (err, result, fields) {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("1234567489");
        }
      });
    }
  });
});

router.get("/", (req, res, next) => {
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/service_product_sales_calculate_info", (req, res, next) => {
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/service_calculate_list", (req, res, next) => {
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/service_sales_report_table_v2", (req, res, next) => {
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/getDataSaleInfo", (req, res, next) => {
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
//판매정보 카테고리
router.post("/getSvcGbnCate", (req, res, next) => {
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

router.post(
  "/saleInfo_iconImgUpload",
  uploade.single("ScImgFormData"),
  (req, res) => {
    //파일
    res.json(req.file.path);
  }
);

router.post(
  //승인심사 첨부파일 form data 처리
  "/judge_file",
  uploade.single("upload_file"),
  (req, res) => {
    //파일
    console.log("file", req.file);
    res.json(req.file.path);
  }
);

// 판매정보 값 insert
router.post("/saleInfo_regInsert", async (req, res, next) => {
  try {
    let svc_data = req.body;
    let pdsvc_idx = req.body.pdsvc_idx;

    let paid_payment_cate = 1;
    let regDt = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    let uptDt = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    let params = [
      pdsvc_idx,
      svc_data.show_gbn,
      svc_data.show_dt,
      svc_data.simple_desc,
      svc_data.svc_intro,
      svc_data.main_func,
      svc_data.svc_cate,
      svc_data.keyword,
      svc_data.svc_icon_1,
      svc_data.svc_icon_path_1,
      svc_data.pay_type,
      svc_data.paid_payment_gbn,
      paid_payment_cate,
      svc_data.paid_payment_price,
      svc_data.point_gbn,
      svc_data.pay_notice,
      regDt,
      uptDt,
    ];

    let svc_sale_id = null;

    let sql = `
                          INSERT INTO tbl_prdsvc_sale_cfg
                                      (
                                        pdsvc_idx,
                                      show_gbn,
                                      show_dt,
                                      simple_desc,
                                      svc_intro,
                                      main_func,
                                      svc_cate,
                                      keyword,
                                      svc_icon_1,
                                      svc_icon_path_1,
                                      pay_type,
                                      paid_payment_gbn,
                                      paid_payment_cate,
                                      paid_payment_price,
                                      point_gbn,
                                      pay_notice,
                                      regDt,
                                      uptDt)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    let svc_file_sql = `
    INSERT INTO tbl_prdsvc_sale_cfg_sc
      ( 
        pdsvc_idx,
        scrsht_title,
        scrsht_desc,
        scrsht_file,
        file_path
        ) VALUES(?, ?, ?, ?, ?)`;

    let sql_del = ` 
                                          DELETE FROM tbl_prdsvc_sale_cfg
                                          WHERE pdsvc_idx = ?
                                      `;

    let file_sql_del = `
        DELETE FROM tbl_prdsvc_sale_cfg_sc
        WHERE pdsvc_idx = ?
        `;

    let fee_del_sql = `
        DELETE FROM tbl_prdsvc_fee
        WHERE pdsvc_idx = ?
        `;

    let fee_ins_sql = `
      INSERT INTO tbl_prdsvc_fee
        (
          pdsvc_idx,
          lic_user_limit,
          lic_mnthly_chrgeAmnt,
          regDt,
          uptDt
        )
        VALUES (?, ?, ?, ?, ?)
      `;

    conn.query(sql_del, [pdsvc_idx], (err, rows) => {
      if (err) {
        console.log(err);
        conn.rollback();
      }
    });

    conn.query(file_sql_del, [pdsvc_idx], (err, rows) => {
      if (err) {
        console.log(err);
        conn.rollback();
      }
    });
    conn.query(fee_del_sql, [pdsvc_idx], (err, rows) => {
      if (err) {
        console.log(err);
        conn.rollback();
      }
    });

    conn.query(sql, params, async (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        svc_sale_id = pdsvc_idx;

        let UptDt_sql = `UPDATE tbl_prdsvc_base SET uptDt=? WHERE pdsvc_idx=?`;
        let UptDt_params = [uptDt, pdsvc_idx];
        conn.query(UptDt_sql, UptDt_params, function (err, rows, fields) {
          if (err) {
            console.log(err);
          }
        });

        if (svc_data.data) {
          if (Array.isArray(Object.values(svc_data.data))) {
            await Promise.all(
              Object.values(svc_data.data).map((image) => {
                let svc_params = [
                  svc_sale_id,
                  image.scrsht_title,
                  image.scrsht_desc,
                  image.scrsht_file,
                  image.file_path,
                ];
                conn.query(svc_file_sql, svc_params, (err, rows) => {
                  if (err) {
                    return console.error(err);
                  }
                });
              })
            );

            if (svc_data.paid_payment_gbn === 1) {
              await Promise.all(
                Object.values(svc_data.lic_data_array).map((item) => {
                  if (item.lic_personnel !== "" && item.lic_price !== "") {
                    let params2 = [
                      svc_sale_id,
                      item.lic_personnel,
                      item.lic_price,
                      regDt,
                      uptDt,
                    ];

                    conn.query(fee_ins_sql, params2, (err, rows) => {
                      if (err) {
                        return console.error(err);
                      } else {
                        console.log("result_rows", rows);
                      }
                    });
                  }
                })
              );
            }

            res.send(null);
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 판매정보 판매중일때 노출함 체크 시 상태값 변경 ( 제작중, 심사중 등등 )
router.post("/sales_gbn", function (req, res, next) {
  //서비스상품 승인요청
  let pdsvc_idx = req.body.pdsvc_idx;
  let stat = req.body.stat;
  let sql = `UPDATE tbl_prdsvc_base SET stat=? WHERE pdsvc_idx=?`;
  let params = [stat, pdsvc_idx];
  conn.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

// 판매정보 판매중일때 노출함 체크
router.post("/sales_gbn_save", function (req, res, next) {
  //서비스상품 승인요청
  let pdsvc_idx = req.body.pdsvc_idx;
  let show_gbn = req.body.show_gbn;
  let sql = `UPDATE tbl_prdsvc_sale_cfg SET show_gbn=? WHERE pdsvc_idx=?`;
  let params = [show_gbn, pdsvc_idx];
  conn.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

/* 인프라 */

router.get("/infra_apply_list", (req, res, next) => {
  try {
    const sql = "SELECT * FROM tbl_svc_infra";
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

router.post("/infra_apply_info", (req, res, next) => {
  //인프라 db 저장
  try {
    let date = new Date();
    let infra_stat = 0;
    const sql =
      "INSERT INTO tbl_prdsvc_infra_reqres(svcinfra_idx, pdsvc_idx, use_period, req_dt, stat) VALUES(?, ?, ?, ?, ?)";
    const params = [
      req.body.infra_infor_data_idx,
      req.body.pdsvc_idx,
      req.body.usePeriod,
      date,
      infra_stat,
    ];

    conn.query(sql, params, (err, rows) => {
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

router.get("/infra_service_yn_state", (req, res, next) => {
  try {
    res.send("s");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/* 승인심사 */

router.post(
  "/service_center_uploade",
  uploade.single("fileupload"),
  (req, res, next) => {
    try {
      console.log("성공");
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

router.post("/service_goods_management_judgetable", (req, res, next) => {
  //제작서비스 승인심사 테이블
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    const sql = "SELECT * FROM tbl_svc_apprvl WHERE pdsvc_idx = ?";
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

router.post("/service_goods_management_judgetable_sale", (req, res, next) => {
  //판매서비스 승인심사 테이블
  try {
    let pdsvc_idx = req.body.pdsvc_idx;
    const sql =
      "SELECT * FROM tbl_svc_apprvl WHERE pdsvc_idx = ? AND stat_gbn = 1 ORDER BY svc_apprvlreq_idx DESC ";
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
//api 신청

router.get("/cate_list", (req, res, next) => {
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

router.get("/use_api_list", (req, res, next) => {
  try {
    const sql = "SELECT * FROM tbl_prdsvc_api_reqres";

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

router.post("/service_use_api_delete", (req, res, next) => {
  try {
    Promise.all(
      req.body.delete_api_info.map((api_delete_info) => {
        const sql = "DELETE FROM tbl_prdsvc_api_reqres WHERE svcapi_idx=?";
        const params = [api_delete_info.svcapi_idx];

        conn.query(sql, params, (err, rows) => {
          if (err) {
            return console.error(err);
          } else {
            console.log("rows", rows);
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

router.post("/service_use_api_approved", async (req, res, next) => {
  try {
    let use_yn = null;

    if (req.body.use_api_yn === "사용중지") {
      use_yn = "N";
    } else {
      use_yn = "Y";
    }

    const sql = "UPDATE tbl_prdsvc_api_reqres SET use_gbn=? WHERE svcapi_idx=?";
    const params = [use_yn, req.body.use_api_id];

    conn.query(sql, params, (err, rows) => {
      if (err) {
        return console.error(err);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/update_use_api_approved", (req, res, next) => {
  try {
    const update_sql = `UPDATE tbl_prdsvc_api_reqres SET stat=0 WHERE svcapi_idx=${req.body.service_companion_id}`;

    conn.query(update_sql, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.send(null);
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/api_approved", (req, res, next) => {
  try {
    console.log("req", req.body);
    let big_data_body = req.body;
    let free_gbn_api = null; //유료, 무료인지 숫자 판별을 데이터 전달을 위한

    Promise.all(
      big_data_body.api_data_group.map((ctrl_api_data) => {
        ctrl_api_data.fare === "유료"
          ? (free_gbn_api = "1")
          : (free_gbn_api = "0");

        const sql =
          "INSERT INTO tbl_prdsvc_api_reqres(wehago_api_name, pdsvc_idx, main_cate_code, free_gbn, stat, req_dt) VALUES(?, ?, ?, ?, ?, ?)";
        const params = [
          ctrl_api_data.api,
          big_data_body.svc_idx,
          ctrl_api_data.id,
          free_gbn_api,
          0,
          big_data_body.regDt,
        ];
        conn.query(sql, params, (err, rows) => {
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

module.exports = router;

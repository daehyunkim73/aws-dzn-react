const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");

//메인 Notice

router.post("/account_save", (req, res, next) => {
  //승인된 인프라 서비스 목록 정보
  let accnt_data = req.body;

  let sql =
    "INSERT INTO tbl_accnt(`comp_idx`,`bank_name`, `accnt_num`, `accnt_ownr_name`, `biz_num`,`regDt`) VALUES(?, ?, ?, ?, ?, ?)";
  let params = [
    accnt_data.comp_idx,
    accnt_data.bank_name,
    accnt_data.accnt_num,
    accnt_data.accnt_ownr_name,
    accnt_data.biz_num,
    accnt_data.accnt_date,
  ];

  conn.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});

router.post("/account_upt", (req, res, next) => {
  //승인된 인프라 서비스 목록 정보
  let accnt_data = req.body;
  let sql = "UPDATE tbl_accnt SET bank_name=?, accnt_num=?, accnt_ownr_name=?, biz_num=?, uptDt=? WHERE comp_idx=?"
  let params = [
    accnt_data.bank_name,
    accnt_data.accnt_num,
    accnt_data.accnt_ownr_name,
    accnt_data.biz_num,
    accnt_data.accnt_date,
    accnt_data.comp_idx,
  ];

  conn.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});

router.post("/account_list", (req, res, next) => {
  let params = req.body.company_no;
  console.log(params);
  let sql = ` SELECT * FROM tbl_accnt WHERE comp_idx=?`;

  conn.query(sql, params, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;

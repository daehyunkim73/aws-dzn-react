const express = require("express");
const router = express.Router();
const db_config = require("../models/db");
const conn = db_config.init();

router.post("/getUserAccountList", (req, res, next) => {
  let portalId = req.body.portalId;
  let sql = `SELECT * FROM tbl_member AS a 
  INNER JOIN tbl_settlemnt_his AS b
    ON b.comp_idx = a.comp_idx
  WHERE a.mbr_id = ?`;
  conn.query(sql, [portalId], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});

router.post("/getCalculateList", (req, res, next) => {
  let compId = req.body.compId;
  let sql = `SELECT * FROM tbl_settlemnt_his 
  WHERE comp_idx  = ?`;
  conn.query(sql, [compId], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
  //serviceID를 이용해서 DB에서 serviceID와 같은 상품의 정보를 가져온다.
});


module.exports = router;

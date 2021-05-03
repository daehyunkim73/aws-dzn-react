const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");

//메인 Notice

router.get("/notice_main_list", (req, res, next) => {
  let sql = `SELECT tn.*,DATE_FORMAT(regDt, '%Y-%m-%d %H:%i:%s') AS regDtFormat FROM tbl_notice tn order by uptDt, regDt desc`;

  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});

//메인 Update
router.get("/update_main_list", (req, res, next) => {
  let sql = "SELECT * FROM tbl_update order by upt_dt, regDt desc";

  conn.query(sql, (err, rows) => {
    err ? console.error(err) : res.json(rows);
  });
});

// 알람 정보 가져오기
router.get("/get_alam_list", (req, res, next) => {
  try {
    const mbrId = req.query.id;

    // 알람 정보 가져오기 전 99개 넘을 경우 삭제
    const deleteSql = `
            DELETE FROM tbl_alam
            WHERE reg_date < (SELECT MIN(reg_date) 
            FROM (
                SELECT reg_date
                FROM tbl_alam 
                WHERE mbr_id = '${mbrId}'              
                ORDER BY reg_date DESC 
            LIMIT 99) a)
            AND mbr_id = '${mbrId}'
        `;
    conn.query(deleteSql);

    const sql = `
        SELECT alam_idx, 
            mbr_id, 
            alam_definition,
            alam_definition_code,
            is_view, 
            alam_content_code,
            alam_main_content, 
            alam_sub_content, 
            a.etc AS etc, 
            b.etc AS defEtc,
            reg_date 
        FROM tbl_alam AS a
        INNER JOIN tbl_alam_definition AS b
            ON a.definition_code = b.alam_definition_code AND
            a.content_code = b.alam_content_code
        WHERE mbr_id = '${mbrId}' 
        ORDER BY reg_date DESC`;

    conn.query(sql, (err, rows) => {
      if (err) throw new Error(err);
      else res.json(rows);
    });
  } catch (e) {
    console.error(e);
  }
});

router.post("/update_alam_view", (req, res, next) => {
  try {
    const { id, alam_idx } = req.body;
    let sql = `
            UPDATE tbl_alam SET is_view = 'Y' 
            WHERE mbr_id='${id}'
        `;

    if (alam_idx !== "") {
      sql = `${sql} AND alam_idx='${alam_idx}' `;
    }

    console.log(sql);
    conn.query(sql, (err, rows) => {
      if (err) throw new Error(err);
      else res.json(rows);
    });
  } catch (e) {
    console.error(e);
  }
});

router.post("/delete_alam_list", (req, res, next) => {
  try {
    const { id, alam_idx } = req.body;
    let sql = `
            DELETE FROM tbl_alam 
            WHERE mbr_id='${id}'
        `;
    if (alam_idx !== "") {
      sql = `${sql} AND alam_idx='${alam_idx}' `;
    }
    console.log(sql);

    conn.query(sql, (err, rows) => {
      if (err) throw new Error(err);
      else res.json(rows);
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;

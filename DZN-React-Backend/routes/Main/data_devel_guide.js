const express = require("express");
const router = express.Router();
const db_config = require("../../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");

// 0909

router.get("/guideSidebarList", (req, res, next) => {
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

router.get("/guideSubSidebarList", (req, res, next) => {
  try {
    const sql = `
    SELECT a.*,b.title AS list_title, b.content AS list_content FROM tbl_useguide_mast a INNER JOIN tbl_useguide_desc b ON a.useguide_mast_idx = b.useguide_mast_idx
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

router.get("/guideList", (req, res, next) => {
  try {
    const sql = `
      SELECT * FROM tbl_useguide_mast a INNER JOIN tbl_useguide_desc b ON a.useguide_mast_idx = b.useguide_mast_idx WHERE a.useguide_mast_idx = 1
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

module.exports = router;

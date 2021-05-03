const express = require("express");
const router = express.Router();
const db_config = require("../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
const mysql = require('mysql'); 
const moment = require("moment"); 
const crypto = require('crypto');


router.post("/get_certUsrList", (req, res, next) => {
          try {
                    const sql = `   
                              SELECT comp_no, mbr_no, mbr_id
                              FROM tbl_member
                              WHERE term_agree = '1' 
                    `;
                    const params = [];
                    conn.query(sql, params, (err, rows) => {
                              if (err) {
                                        console.error(err);
                              } else { 
                                        res.json(rows);                
                              }
                    });                      
          } catch(e) {
                    console.error(e);
                    next(e); 
          }          
});
  



router.post("/get_grantUsrList", (req, res, next) => {
    try {
              const sql = `   
                SELECT mbr_idx, comp_no, mbr_no, mbr_id, 
                        IFNULL(g.adm_grant_idx,'')adm_grant_idx, IFNULL(g.adm_grant_name,'')adm_grant_name, 
                        IFNULL(g.grant_desc,'')grant_desc, IFNULL(g.adm_grant_value,'')adm_grant_value
                FROM tbl_member m
                LEFT OUTER JOIN tbl_admin_grant g
                ON m.adm_grant_idx = g.adm_grant_idx
                WHERE term_agree = '1' 
              `;
              const params = [];
              conn.query(sql, params, (err, rows) => {
                        if (err) {
                                  console.error(err);
                        } else { 
                                  res.json(rows);                
                        }
              });                      
    } catch(e) {
              console.error(e);
              next(e); 
    }          
});


router.post("/get_grantUsrInfo", (req, res, next) => {
    let mbrIdx = req.body.datas2.mbrIdx;
    console.log('mbrIdx', mbrIdx);
    try {
              const sql = `   
                SELECT mbr_idx, comp_no, mbr_no, mbr_id, 
                        IFNULL(g.adm_grant_idx,'')adm_grant_idx, IFNULL(g.adm_grant_name,'')adm_grant_name, 
                        IFNULL(g.grant_desc,'')grant_desc, IFNULL(g.adm_grant_value,'')adm_grant_value
                FROM tbl_member m
                LEFT OUTER JOIN tbl_admin_grant g
                ON m.adm_grant_idx = g.adm_grant_idx
                WHERE term_agree = '1' 
                  and mbr_idx = ?
              `;
              const params = [mbrIdx];
              conn.query(sql, params, (err, rows) => {
                        if (err) {
                                  console.error(err);
                        } else { 
                                  res.json(rows);                
                        }
              });                      
    } catch(e) {
              console.error(e);
              next(e); 
    }          
});




router.post("/set_grantInfoUpdate", (req, res, next) => {
    const {
        mbrIdx,
        mbrNo,
        compNo,
        grantIdx
    }  = req.body.datas;

    try {
              const sql = `   
              UPDATE tbl_member
              SET adm_grant_idx = ?
              WHERE 1=1
                  and mbr_idx = ?
              `;
              const params = [grantIdx, mbrIdx];
              conn.query(sql, params, (err, rows) => {
                        if (err) {
                                  console.error(err);
                        } else { 
                                  res.json(rows);                
                        }
              });                      
    } catch(e) {
              console.error(e);
              next(e); 
    }          
});




router.post("/get_grantList", (req, res, next) => {
    try {
              const sql = `   
                SELECT  IFNULL(g.adm_grant_idx,'')adm_grant_idx, IFNULL(g.adm_grant_name,'')adm_grant_name, 
                        IFNULL(g.grant_desc,'')grant_desc, IFNULL(g.adm_grant_value,'')adm_grant_value
                FROM tbl_admin_grant g
              `;
              const params = [];
              conn.query(sql, params, (err, rows) => {
                        if (err) {
                                  console.error(err);
                        } else { 
                                  res.json(rows);                
                        }
              });                      
    } catch(e) {
              console.error(e);
              next(e); 
    }          
});




router.post("/get_data_svc_cnt", (req, res, next) => {
          try {
                    let mbrIdx = req.body.datas.mbrIdx; 
                    const sql = `   
                                        SELECT m.data_cnt, n.svc_cnt
                                        FROM(
                                                  SELECT COUNT(*) data_cnt, '1' gbn 
                                                  FROM tbl_prddata_base d
                                                  WHERE sales_stat = 5
                                                  AND mbr_no = ?
                                        ) m
                                                  CROSS JOIN (
                                                            SELECT COUNT(*) svc_cnt, '1' gbn
                                                            FROM tbl_prdsvc_base s
                                                            WHERE stat = 5
                                                            AND mbr_idx = ?
                                                  ) n
                                                  ON m.gbn = n.gbn
                                `;
                    const params = [mbrIdx, mbrIdx];
                    conn.query(sql, params, (err, rows) => {
                        if (err) {
                            console.error(err);
                        } else { 
                            res.json(rows);                
                        }
                    });                      
                } catch(e) {
                    console.error(e);
                    next(e);
                }          
});
  





function encrypt(data,key) {
    console.log('here');
    var cipher = crypto.createCipheriv('aes-256-ecb', key,''); //create aes-128 cipher 
    console.log('here2');
    var encrypted = cipher.update(data,'utf8', 'hex'); //output as hex
    return encrypted;
}



function padRightTo32(str) { // ensure block size of 32

    len=str.length;
    for(i=len; i%32>0; i++) {
        str=str +" ";
    }
    return str;
}



function encrypt(buffer){
    var iv = new Buffer.from('');   
    var algorithm = 'aes-256-ecb';
    var password = '556d830e98e749549ce7d9f5a445e7dd'; 
    var cipher = crypto.createCipheriv(algorithm,new Buffer.from(password),iv)
    var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
}



router.post("/get_aes_encrypto",   (req, res, next) => {
    var message = 'backoffice@@'+new Date().getTime();
    let result = encodeURIComponent(encrypt(new Buffer.from(message)).toString('base64'));
    //encodeURIComponent(string)
    console.log('encrypt(new Buffer(message)).toString(base64)', encodeURIComponent(encrypt(new Buffer.from(message)).toString('base64')));    
    res.json({ 'result': result});
});






module.exports = router;  
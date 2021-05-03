const express = require("express");
const router = express.Router();
const db_config = require("../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
const mysql = require('mysql');
const moment = require("moment");

router.post('/alarm_regist', (req, res, next) => {
    try{
        console.log(req.body);
        const {id, definitionCode, contentCode, etc} = req.body;        
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let paramList = [];
        let param = "";        
        
        // String 으로 보낼 때
        if(typeof(id) === "string"){
            param = `('${id}', '${definitionCode}', '${contentCode}', '${etc}', '${date}')`;
        // Array(Object) 로 보낼 때
        } else if(typeof(id) === "object") {
            id.map((data) => {                
                paramList = paramList.concat(`('${data}', '${definitionCode}', '${contentCode}', '${etc}', '${date}')`);
            });
            param = paramList.join(",");
        }
        
        const sql = `
            INSERT INTO tbl_alam(mbr_id, definition_code, content_code, etc, reg_date)
            VALUES ${param};
        `;
                
        conn.query(sql, (err, rows) => {
            if(err) throw new Error(err);
            else res.json(rows);
        })
    }catch(e){

    }
});

router.post("/getUsrGrantList", (req, res, next) => {
     try {
               let sql = `
                         SELECT
                                   adm_grant_idx,
                                   adm_grant_name,
                                   grant_desc,
                                   adm_grant_value
                         FROM tbl_admin_grant
               `;
               conn.query(sql, (err, rows) => {
                         if (err) {
                                   console.log(err);
                         } else {
                                   res.json(rows);
                         }
               });
     } catch (e) {
               console.error(e);
               next(e);
     }
});


router.post("/getUserAuthorityCode", (req, res, next) => {
     try {
               let sql = `
                         SELECT
                                   main_cate_code,
                                   main_cate_name,
                                   sub_cate_code,
                                   sub_cate_name
                         FROM tbl_code
                         WHERE main_cate_code = 'user_authority'
               `;
               conn.query(sql, (err, rows) => {
                         if (err) {
                                   console.log(err);
                         } else {
                                   res.json(rows);
                         }
               });
     } catch (e) {
               console.error(e);
               next(e);
     }
});


router.post('/getUsrAuthConfData', (req, res, next) => {
     try {
               let { adm_grant_idx } = req.body.datas; 
               const sql = `   
                         SELECT
                                   adm_grant_idx,
                                   adm_grant_name,
                                   grant_desc,
                                   adm_grant_value
                         FROM tbl_admin_grant
                         WHERE adm_grant_idx = ?
               `;
               const params = [adm_grant_idx];
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




router.post("/setUserGrant_Update", (req, res, next) => {    
     try{
               const {adm_grant_name, grant_desc, adm_grant_idx, usr_grantConf_Upt } = req.body.datas;
               const sql = `
                         UPDATE tbl_admin_grant 
                                   SET  adm_grant_name  = ?,
                                        grant_desc = ?,  
                                        adm_grant_value = ?
                         WHERE adm_grant_idx = ?
               `;
               const param = [adm_grant_name, grant_desc, usr_grantConf_Upt, adm_grant_idx];
               
               conn.query(sql, param, (err, rows) => {
                         if (err) {
                                   throw new Error(err);            
                         } else { 
                                   res.json({ 'code': '200', 'result': 'true', 'desc': 'success' });  
                         }
               })        
     }
     catch(e) {
               console.error(e);
               next(e);
     }
});




router.post('/getUsrAuthDesc', (req, res, next) => {
     try {
               let { adm_grant_idx } = req.body.datas; 
               const sql = `   
                         SELECT
                                   adm_grant_idx,
                                   adm_grant_name,
                                   grant_desc,
                                   adm_grant_value
                         FROM tbl_admin_grant
                         WHERE adm_grant_idx = ?
               `;
               const params = [adm_grant_idx];
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




router.post("/setUsrAuthDelete", (req, res, next) => {    
     try{
               const {adm_grant_idx } = req.body.datas;
               const sql = `
                         DELETE FROM tbl_admin_grant 
                         WHERE adm_grant_idx = ?
               `;
               const param = [adm_grant_idx];
               
               conn.query(sql, param, (err, rows) => {
                         if (err) {
                                   throw new Error(err);            
                         } else { 
                                   res.json({ 'code': '200', 'result': 'true', 'desc': 'success' });  
                         }
               })        
     }
     catch(e) {
               console.error(e);
               next(e);
     }
});





router.post("/setUserGrant_Insert", (req, res, next) => {    
     try{
               const {adm_grant_name, grant_desc, usr_grantConf_Upt } = req.body.datas;
               const sql = `
                         INSERT INTO tbl_admin_grant (adm_grant_name, grant_desc, adm_grant_value)
                         VALUES (?, ?, ?)
               `;
               const param = [adm_grant_name, grant_desc, usr_grantConf_Upt];
               
               conn.query(sql, param, (err, rows) => {
                         if (err) {
                                   throw new Error(err);            
                         } else { 
                                   res.json({ 'code': '200', 'result': 'true', 'desc': 'success' });  
                         }
               })        
     }
     catch(e) {
               console.error(e);
               next(e);
     }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const db_config = require("../models/db");
const conn = db_config.init();
const multer = require("multer");
const path = require("path");
const mysql = require('mysql');
const moment = require("moment");

// 파일 업로드 
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

// 데이터 센터 관리 > 데이터 승인 관리 
// 정보 가져오기
router.post('/dataApprvlManagment', (req, res, next) => {
    try {
        const searchData = req.body.searchData;
        let where = ' where 0=0 ';
        let type = 'apprvlreq_dt'
		
        if(searchData){
            type = searchData.searchDateType === '0' ? 'apprvlreq_dt' : 'apprvlres_dt';
            const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
            const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
            const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;

            if(startDate !== undefined && startDate !== '') {
                where += ` and ${type} >= '${startDate}' and ${type} <= '${endDate}'`;
            }

            if(searchTerm !== undefined && searchTerm !== '') {
                where += ` and data_title like '%${searchTerm}%'`;
            }
        }
        const sql =
            `
            SELECT a.*,
                b.mbr_name, 
                b.mbr_id, 
                c.comp_name, 
                d.apprvlreq_dt, 
                d.apprvlres_dt 
            FROM tbl_prddata_base AS a
            INNER JOIN tbl_member AS b
                ON a.mbr_id = b.mbr_id
            LEFT JOIN tbl_company AS c
		        ON b.comp_no = c.comp_no
            LEFT JOIN (
                SELECT MAX(apprvlreq_dt) AS apprvlreq_dt, 
                    MAX(apprvlres_dt) AS apprvlres_dt, 
                    pdbase_idx 
                FROM tbl_data_apprvl 
                GROUP BY pdbase_idx 
                ) AS d
                ON a.pdbase_idx = d.pdbase_idx
            ${where} ORDER BY ${type} DESC`;
        
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

// 데이터 승인관리 > 데이터 상세정보 가져오기
router.post('/getDefaultDataInfo', (req, res, next) => {
    try {
        const {pdbase_idx, dzon_data_idx} = req.body.datas;
        const sql =
            `
            SELECT a.*,
                b.mbr_name, 
                b.mbr_id, 
                c.comp_name 
            FROM tbl_prddata_base AS a
            INNER JOIN tbl_member AS b
                ON a.mbr_id = b.mbr_id
            LEFT JOIN tbl_company AS c
                ON b.comp_no = c.comp_no
            WHERE a.pdbase_idx=${pdbase_idx}                
            `
        
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

// 카테고리 조회
router.post('/getCateDataList', (req, res, next) => {
    try{
        const sql = `
            SELECT
                code_idx,
                main_cate_code,
                main_cate_name,
                sub_cate_code,
                sub_cate_name,
                value1,
                value2,
                use_gbn
            FROM tbl_code
            WHERE main_cate_code = 'data_gbn_cate'
            ORDER BY value1 ASC 
        `;

        conn.query(sql, (err, rows) => {
            if (err) {
                console.error(err);
            } else {                
                res.json(rows);
            }
        });
    }
    catch(e) {
        console.error(e);
        next(e);
    }
})

// 유형 조회
router.post('/getTypeDataList', (req, res, next) => {
    try{
        const sql = `
            SELECT
                code_idx,
                main_cate_code,
                main_cate_name,
                sub_cate_code,
                sub_cate_name,
                value1,
                value2,
                use_gbn
            FROM tbl_code
            WHERE main_cate_code = 'data_gbn_type'
            ORDER BY value1 ASC 
        `;

        conn.query(sql, (err, rows) => {
            if (err) {
                console.error(err);
            } else {                
                res.json(rows);
            }
        });
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});

// 배포주기 가져오기
router.post('/getDeployPeroid', (req, res, next) => {
    try {
        const sql = `   
            SELECT
                code_idx,
                main_cate_code,
                main_cate_name,
                sub_cate_code,
                sub_cate_name,
                value1,
                value2,
                use_gbn
            FROM tbl_code
            WHERE main_cate_code = 'deployPeroid'
            ORDER BY value1 ASC 
        `;
        conn.query(sql, [], (err, rows) => {
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


// 데이터센터 > 판매정보 가져오기
router.post('/getSalesDataInfo', (req, res, next) => {
    try {
        const {pdbase_idx} = req.body.datas;

        const sql = `   
            SELECT
                *
            FROM tbl_prddata_sale_cfg
            WHERE pdbase_idx = ${pdbase_idx}                
        `;
        conn.query(sql, [], (err, rows) => {
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

// 결제 금액 데이터
router.post('/getDataFeeInfo', (req, res, next) => {
    try {
        let pdbase_idx = req.body.datas.pdbase_idx; 
        const sql = `   
                        SELECT  pdfee_idx,
                                pdbase_idx,
                                dayMnth_fee_type,
                                beginCallNum,
                                endCallNum,
                                dtPrice,
                                useGbn,
                                show_gbn
                        FROM tbl_prddata_fee
                        WHERE pdbase_idx = ?
                    `;
        const params = [pdbase_idx];
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
  
  // 데이터 판매 상태 변경
router.post("/updateDataSaleInfo", (req, res, next) => {
    try{
        const {pdbase_idx, sales_stat, show_gbn} = req.body.datas;                 

        const sql_update1 = `UPDATE tbl_prddata_base SET sales_stat=${sales_stat}  WHERE pdbase_idx =${pdbase_idx} `;
        const sql_update2 = `UPDATE tbl_prddata_sale_cfg SET show_gbn='${show_gbn}'  WHERE pdbase_idx =${pdbase_idx} `;
           
        conn.query(sql_update1, [], (err, rows) => {
            if (err) {
                console.error(err);
            } else { 
               conn.query(sql_update2, [], (err2, rows2) => {
                    if (err2) {
                        console.error(err2);
                    } else { 
                        res.json(rows2);                        
                    }
                })    
            }
        })           
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});

// 결제정보 저장
router.post("/setPayInfoData", (req, res, next) => {
    try{
        const {pdbase_idx, payType, payNotice} = req.body.datas;


        const sql_update = `UPDATE tbl_prddata_sale_cfg 
                             SET pay_type=${payType}, pay_notice='${payNotice}'
                             WHERE pdbase_idx=${pdbase_idx} `;
           
        conn.query(sql_update, [], (err, rows) => {
            if (err) {
                console.error(err);
            } else { 
                res.json(rows);
            }
        })           
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});

// 결제정보 저장 - 데이터 삭제
router.post("/deletePayInfoDetailData", (req, res, next) => {
    try{
        const {pdbase_idx} = req.body.datas;

        const sql = `DELETE FROM tbl_prddata_fee
                             WHERE pdbase_idx=${pdbase_idx} `;        
           
        conn.query(sql, [], (err, rows) => {
            if (err) {
                console.error(err);
                conn.rollback();
            } else { 
                res.json(rows);                
            }
        })           
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});

// 결제정보 저장 - 데이터
router.post("/setPayInfoDetailData", (req, res, next) => {
    try{
        const {pdbase_idx, payInfoData, dayMnthFee} = req.body.datas;
        const regDt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        const sql = `INSERT INTO tbl_prddata_fee 
                             (
                                pdbase_idx,
                                dayMnth_fee_type,
                                beginCallNum,
                                endCallNum,
                                dtPrice,
                                useGbn,
                                show_gbn,
                                regDt,
                                uptDt
                             )
                             VALUES ( ?,?,0,?,?,'Y','Y',?,NULL ); `;
        let sql_multi = '';
        let params = [];
        
        payInfoData.map( data => {
            if(data.endCallNum !== '' && data.dtPrice !== ''){
                params = [pdbase_idx, dayMnthFee, data.endCallNum, data.dtPrice, regDt ];
                sql_multi += mysql.format(sql, params);
            }
        })                             
           
        conn.query(sql_multi, [],  (err, rows) => {
            if (err) {
                console.error(err);
                conn.rollback();
            } else {               
                res.json(rows);
            }
        })
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});

// 심사 데이터 가져오기
router.post("/getApprovedData", (req, res, next) => {        
    try{
        const {pdbaseIdx} = req.body.datas;        
        const sql = `SELECT A.*, B.mbr_name, C.sales_stat
                    FROM tbl_data_apprvl AS A                    
                    INNER JOIN tbl_member AS B
                        ON A.mbr_id=B.mbr_id
                    INNER JOIN tbl_prddata_base AS C
                        ON A.pdbase_idx = C.pdbase_idx
                    WHERE A.pdbase_idx=${pdbaseIdx}                        
                    ORDER BY apprvlreq_dt DESC`;                        
           
        conn.query(sql, [], (err, rows) => {
            if (err) {
                throw new Error(err);            
            } else { 
                res.json(rows);                
            }
        })           
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});


// 심사 중인 데이터 가져오기 (1건만 존재해야 함)
router.post("/getApprovedingData", (req, res, next) => {
    try{
        const {pdbase_idx} = req.body.datas;

        const sql = `SELECT * FROM tbl_data_apprvl
                    WHERE pdbase_idx = ${pdbase_idx}
                        AND apprvl_state = 2`;                        
           
        conn.query(sql, [], (err, rows) => {
            if (err) {
                throw new Error(err);            
            } else { 
                res.json(rows);                
            }
        })           
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});

//데이터 승인 이미지 등록
router.post('/setApprovedInfo_imgUpload', uploade.single('file_data'), (req, res, next) => {  //이미지         
    res.json(req.file);        
});

// 심사 중인 데이터 업데이트 (승인 or 반려)
router.post("/setApprovedingUpdate", (req, res, next) => {    
    try{
        const {dataPpprvlreqIdx, pdbaseIdx, adminMbrId, apprvlState, filePath, adminMemo } = req.body.datas;
        const nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        // 상태 정보 '승인 대기' 로 변경
        const sql_update = `UPDATE tbl_prddata_base SET stat=${apprvlState} WHERE pdbase_idx =${pdbaseIdx} `;
        conn.query(sql_update, [], (err, rows) => {
            if (err) {
                console.error(err);
                conn.rollback()
            } else {                
                const sql = `
                    UPDATE tbl_data_apprvl 
                    SET admin_mbr_id=?,
                        apprvl_state=?,
                        admin_addFile=?,
                        admin_memo=?,
                        apprvlres_dt=?
                    WHERE data_apprvlreq_idx=?
                    `;
                const param = [adminMbrId, apprvlState, filePath, adminMemo, nowDate, dataPpprvlreqIdx];
                
                conn.query(sql, param, (err, rows) => {
                    if (err) {
                        throw new Error(err);            
                    } else { 
                        res.json(rows);                
                    }
                })        
            }
        });
    }
    catch(e) {
        console.error(e);
        next(e);
    }
});


// 데이터 센터 관리 > 판매데이터 관리
// 정보 가져오기
router.post('/salesDataManagment', (req, res, next) => {
    try {        
        const searchData = req.body.searchData;
        let where = ' where sales_stat IN (5,6) ';
        let type = 'a.regDt'

        if(searchData){
            type = searchData.searchDateType === '0' ? 'a.regDt' : 'a.uptDt';
            const startDate = searchData.searchStartDate === '' ? '' : searchData.searchStartDate;
            const endDate = searchData.searchEndDate === '' ? '' : searchData.searchEndDate;
            const searchTerm = searchData.searchTerm === '' ? '' : searchData.searchTerm;

            if(startDate !== undefined && startDate !== '') {
                where += ` and ${type} >= '${startDate}' and ${type} <= '${endDate}'`;
            }

            if(searchTerm !== undefined && searchTerm !== '') {
                where += ` and (data_title LIKE '%${searchTerm}%' 
                           OR mbr_name LIKE '%${searchTerm}%' 
                           OR b.mbr_id LIKE '%${searchTerm}%')`;
            }
        }
        const sql =
            `
            SELECT a.*,
                e.show_gbn,
                b.mbr_name, 
                b.mbr_id,   
                c.comp_name,              
                f.dayMnth_fee_type,
                d.apprvlreq_dt, 
                d.apprvlres_dt
            FROM tbl_prddata_base AS a
            INNER JOIN tbl_member AS b
                ON a.mbr_id = b.mbr_id
            LEFT JOIN tbl_company AS c
		        ON b.comp_no = c.comp_no
            LEFT JOIN (
                SELECT MAX(apprvlreq_dt) AS apprvlreq_dt, 
                    MAX(apprvlres_dt) AS apprvlres_dt, 
                    pdbase_idx                    
                FROM tbl_data_apprvl 
                GROUP BY pdbase_idx 
                ) AS d
                ON a.pdbase_idx = d.pdbase_idx
            INNER JOIN tbl_prddata_sale_cfg AS e
                ON a.pdbase_idx = e.pdbase_idx
            LEFT JOIN (
                SELECT pdbase_idx,
                       dayMnth_fee_type 
                FROM tbl_prddata_fee
                GROUP BY pdbase_idx
                )AS f                
                ON a.pdbase_idx = f.pdbase_idx
            ${where} ORDER BY ${type} DESC`;        
        
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
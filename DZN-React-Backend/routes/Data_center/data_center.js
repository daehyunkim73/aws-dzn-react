const express = require('express');
const router = express.Router();
const db_config = require('../../models/db');
const conn = db_config.init();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const moment = require("moment");

router.get('/purchase_create_data_lists', (req, res, next) => {
    try {                
        const compNo = req.query.compNo;         
        const sql = ` SELECT pdbase_idx,                             
                            data_title,
                            data_cate,
                            data_Type,
                            stat,
                            valid,
                            regDt
                    FROM tbl_prddata_base 
                    WHERE mbr_id IN (
                        SELECT mbr_id FROM tbl_member WHERE comp_no = ${compNo}
                    )
                    AND (sales_stat = '0' OR sales_stat = '' OR sales_stat IS NULL) `;
        
        conn.query(sql, [], (err, rows) => {
            if (err) {
                throw new Error(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});


router.post('/get_dataDescInfo', (req, res, next) => {
    let pdbase_idx = req.body.pdbase_idx;         
    try {
        const sql = ` 
                    SELECT M.*, SALE.CNT SALE_CNT, JUDGE.CNT JUDGE_CNT
                    FROM 
                    (
                    SELECT pdbase_idx,                        
                        data_title,
                        accss_grant,
                        mbr_idx,
                        mangr_name,
                        mangr_tel,
                        mangr_email,
                        creatr_name,
                        creatr_tel,
                        creatr_email,
                        creatr_url,
                        regstr_name,
                        regstr_tel,
                        regstr_email,
                        registr_url,
                        data_desc,
                        data_Lang,
                        data_cate,
                        data_Type,
                        keywords,
                        landingPage,
                        license,
                        copyright,
                        endPointUrl,
                        endPointDesc,
                        endPointUrlChk,
                        deployPeroid,
                        deployPeroid_desc,
                        space_resolution,
                        time_resolution,
                        space_info,
                        time_info,
                        stat,
                        sales_stat,
                        valid,
                        buydt_idx,
                        saleBeginDt,
                        regDt,
                        uptDt,
                        'N' AS N
                    FROM tbl_prddata_base
                    WHERE pdbase_idx = ${pdbase_idx} 
                    ) AS M
                    LEFT OUTER JOIN (
                    SELECT  COUNT(*) CNT, 'N' N
                    FROM tbl_prddata_sale_cfg
                    WHERE pdbase_idx = ${pdbase_idx}  
                    ) AS SALE
                    ON M.N = SALE.N
                    LEFT OUTER JOIN (
                    SELECT  COUNT(*) CNT, 'N' N
                    FROM tbl_data_apprvl
                    WHERE pdbase_idx = ${pdbase_idx}  
                    ) AS JUDGE
                    ON M.N = JUDGE.N
                    `;
        conn.query(sql, [], (err, rows) => {
            if (err) {
                console.error(err);
            } else { 
                res.json(rows[0]);                
            }
        }); 
    }
     catch(e) {
        console.error(e);
        next(e);
    }
});


router.post('/getCreateDataList', (req, res, next) => {
    try {
        let {pdbase_idx, stat, sales_stat} = req.body;         

        const sql = `   SELECT  pdbase_idx,                                
                                data_title,
                                data_cate,
                                data_Type,                             
                                stat,
                                valid,
                                regDt
                        FROM tbl_prddata_base 
                        WHERE pdbase_idx <> ? 
                          AND (stat = ? OR sales_stat = ?)
                    `;
        const params = [pdbase_idx, stat, sales_stat];
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


router.get('/getDataGbnCate', (req, res, next) => {
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
                        WHERE main_cate_code = 'data_gbn_cate'
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



router.get('/getDeployPeroid', (req, res, next) => {
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

// 데이터 제작 -> 데이터 판매 로 변경
router.post("/updateDataSaleInfo", (req, res, next) => {
    try{
        const {pdbase_idx, sales_stat, show_gbn} = req.body;         

        const sql_update1 = `UPDATE tbl_prddata_base SET sales_stat=${sales_stat}  WHERE pdbase_idx =${pdbase_idx} `;
        const sql_update2 = `UPDATE tbl_prddata_sale_cfg SET show_gbn='${show_gbn}'  WHERE pdbase_idx =${pdbase_idx} `;
           
        conn.query(sql_update1, [], (err, rows) => {
            if (err) {
                throw new Error(err);
            } else { 
               conn.query(sql_update2, [], (err2, rows2) => {
                    if (err2) {
                        throw new Error(err2);
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
} )


router.post("/setDataCenterBasicInfo", async function (req, res, next) {
    try {        
        const {
            pdbase_idx, data_title, accss_grant, mbr_idx, mangr_name, mangr_tel, mangr_email,
            creatr_name, creatr_tel, creatr_email, creatr_url, regstr_name, regstr_tel, regstr_email,
            registr_url, data_desc, data_Lang, data_cate, data_Type, keywords, landingPage, license,
            copyright, endPointUrl, endPointDesc, endPointUrlChk, deployPeroid, deployPeroid_desc,
            space_resolution, time_resolution, space_info, time_info
        } = req.body;

        const valid = 'Y'
        const buydt_idx = 0;
        const saleBeginDt = req.body.saleBeginDt ? req.body.saleBeginDt : null ;
        const uptDt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');        

        const sql = ` 
                        UPDATE tbl_prddata_base   SET   data_title = ?,
                                                        accss_grant = ?,
                                                        mbr_idx = ?,
                                                        mangr_name = ?,
                                                        mangr_tel = ?,
                                                        mangr_email = ?,
                                                        creatr_name = ?,
                                                        creatr_tel = ?,
                                                        creatr_email = ?,
                                                        creatr_url = ?,
                                                        regstr_name = ?,
                                                        regstr_tel = ?,
                                                        regstr_email = ?,
                                                        registr_url = ?,
                                                        data_desc = ?,
                                                        data_Lang = ?,
                                                        data_cate = ?,
                                                        data_Type = ?,
                                                        keywords = ?,
                                                        landingPage = ?,
                                                        license = ?,
                                                        copyright = ?,
                                                        endPointUrl = ?,
                                                        endPointDesc = ?,
                                                        endPointUrlChk = ?,
                                                        deployPeroid = ?,
                                                        deployPeroid_desc = ?,
                                                        space_resolution = ?,
                                                        time_resolution = ?,
                                                        space_info = ?,
                                                        time_info = ?,                                                        
                                                        valid = ?,
                                                        buydt_idx = ?,
                                                        saleBeginDt = ?,                                                        
                                                        uptDt = ?
                        WHERE pdbase_idx = ${pdbase_idx}  `        
        
        const params = [            
            data_title,
            accss_grant,
            mbr_idx,
            mangr_name,
            mangr_tel,
            mangr_email,
            creatr_name,
            creatr_tel,
            creatr_email,
            creatr_url,
            regstr_name,
            regstr_tel,
            regstr_email,
            registr_url,
            data_desc,
            data_Lang,
            data_cate,
            data_Type,
            keywords,
            landingPage,
            license,
            copyright,
            endPointUrl,
            endPointDesc,
            endPointUrlChk,
            deployPeroid,
            deployPeroid_desc,
            space_resolution,
            time_resolution,
            space_info,
            time_info,            
            valid,
            buydt_idx,
            saleBeginDt,            
            uptDt
        ];    
        
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
  
  router.post('/getDataSaleInfo', (req, res, next) => {
    try {
        const pdbase_idx = req.body.pdbase_idx; 

        const sql = `   
                        SELECT	pdbase_idx,
                                show_gbn,
                                show_dt,
                                tel,
                                scrsht_title_1,
                                scrsht_desc_1,
                                scrsht_file_1,
                                file_path_1,
                                scrsht_title_2,
                                scrsht_desc_2,
                                scrsht_file_2,
                                file_path_2,
                                scrsht_title_3,
                                scrsht_desc_3,
                                scrsht_file_3,
                                file_path_3,
                                scrsht_title_4,
                                scrsht_desc_4,
                                scrsht_file_4,
                                file_path_4,
                                scrsht_title_5,
                                scrsht_desc_5,
                                scrsht_file_5,
                                file_path_5,
                                addFile,
                                filePath,
                                pay_type,
                                pay_notice,
                                view_cnt,
                                regDt,
                                uptDt
                        FROM tbl_prddata_sale_cfg
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


// 데이터 센터 > 구매제작 데이터의 승인 상태 불러오기
router.post('/getJudgeDataInfo', (req, res, next) => {
    try {
        const pdbase_idx = req.body.pdbase_idx;         

        /*
            data_title: 판매정보 타이틀
            cate_code: 카테고리 코드 
            cate_name: 카테고리명 (1: 부동산, 2: 교육, 3: R&D)  => API 호출 데이터 (현재 임시 데이터)
            type_code: 유형 코드
            type_name: 유형명 (D: 데이터, T: 통계, M: 모델, R: 리포트) => API 호출 데이터 (현재 임시 데이터)
            pay_type: 가격 유형
            tel: 전화번호
            dayMnth_fee_type: 일별 호출 횟수 제한 요금 타입
        */
        const sql = `   
                    SELECT PB.data_title AS data_title,
                        CC.sub_cate_code AS cate_code,
                        CC.sub_cate_name AS cate_name,
                        TC.sub_cate_code AS type_code,
                        TC.sub_cate_name AS type_name,
                        PSC.pay_type AS pay_type,
                        PSC.tel AS tel,
                        DA.addFile AS addFile,
                        (SELECT dayMnth_fee_type FROM tbl_prddata_fee AS pf WHERE pf.pdbase_idx = ${pdbase_idx} GROUP BY dayMnth_fee_type) AS dayMnth_fee_type
                    FROM tbl_prddata_base AS PB
                    LEFT OUTER JOIN tbl_data_apprvl AS DA
                        ON DA.pdbase_idx = PB.pdbase_idx	
                    INNER JOIN tbl_prddata_sale_cfg AS PSC
                        ON PSC.pdbase_idx = PB.pdbase_idx	
                    INNER JOIN tbl_code AS CC
                        ON CC.main_cate_code = 'data_gbn_cate'		
                        AND CC.sub_cate_code = PB.data_cate 
                    INNER JOIN tbl_code AS TC
                        ON TC.main_cate_code = 'data_gbn_type'	
                        AND TC.sub_cate_code = PB.data_type
                    WHERE PB.pdbase_idx = ${pdbase_idx}
                    ORDER BY DA.data_apprvlreq_idx DESC
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

// 데이터 센터 > 구매제작 데이터의 승인 상태 불러오기
router.post('/getJudgeResultInfo', (req, res, next) => {
    try {
        const pdbase_idx = req.body.pdbase_idx;
       
        const sql = `   
                    SELECT data_apprvlreq_idx, 
                           pdbase_idx, 
                           mbr_id, 
                           admin_mbr_id, 
                           apprvl_state, 
                           addFile,
                           admin_memo, 
                           apprvlreq_dt, 
                           apprvlres_dt 
                    FROM tbl_data_apprvl
                    WHERE pdbase_idx = ${pdbase_idx}
                    ORDER by 1 DESC
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


// 데이터 센터 > 구매제작 데이터의 승인 데이터 등록
router.post('/setDataJudgeInfo', (req, res, next) => {    
    try{
        const { pdbase_idx,
            mbr_idx,                
            addFile } = req.body;   
        
        // 상태 정보 '승인 대기' 로 변경
        const sql_update = `UPDATE tbl_prddata_base SET stat=2 WHERE pdbase_idx =${pdbase_idx} `;
        conn.query(sql_update, [], (err, rows) => {
            if (err) {
                conn.rollback()
                throw new Error(err);                
            } 
        }); 
             
        const sql = `
            INSERT INTO tbl_data_apprvl
            (
                pdbase_idx,
                mbr_idx,                
                apprvl_state,
                addFile,                
                apprvlreq_dt                
            )
            VALUES(?,?,?,?,?)
        `;

        // 구매완료-0, 제작중-1, 심사중-2, 승인-3, 심사반려-4
        const params = [pdbase_idx,
                        mbr_idx,                        
                        '2',
                        addFile,                        
                        moment(new Date()).format('YYYY-MM-DD HH:mm:ss')                        
                        ];

        conn.query(sql, params, (err, rows) => {
            if (err) {
                throw new Error(err);
            } else {             
                res.json(rows);                
            }
        });
    } catch(e) {
        console.error(e);
        next(e);
    }    
});
router.post('/setSalesDataJudgeInfo', (req, res, next) => {
    try{
        const { pdbase_idx, mbr_idx, addFile, price_gbn,
            data_gbn, etc_gbn, etc_memo, memo } = req.body;

        // 상태 정보 '승인 대기' 로 변경
        const sql_update = `UPDATE tbl_prddata_base SET stat=2 WHERE pdbase_idx =${pdbase_idx} `;
        conn.query(sql_update, [], (err, rows) => {
            if (err) {
                conn.rollback()


// 데이터 센터 > 판매 데이터의 승인 데이터 등록
                throw new Error(err);
            } 
        }); 
             
        const sql = `
            INSERT INTO tbl_data_apprvl
            (
                pdbase_idx,
                mbr_idx,                
                apprvl_state,
                addFile,
                price_gbn,
                data_gbn,
                etc_gbn,
                etc_memo,
                memo,                
                apprvlreq_dt
            )
            VALUES(?,?,?,?,?,?,?,?,?,?)
        `;

        // 구매완료-0, 제작중-1, 심사중-2, 승인-3, 심사반려-4
        const params =  [
                            pdbase_idx,
                            mbr_idx,                        
                            '2',
                            addFile,
                            price_gbn,
                            data_gbn,
                            etc_gbn,
                            etc_memo,
                            memo,                                                    
                            moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                        ];

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

const uploade = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
                done(null, 'uploade/image');
            } else {
                done(null, 'uploade/file');
            }
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { files: 5, fileSize: 20 * 2024 * 2024 },
});


router.post('/saleInfo_imgUpload', uploade.array("image", 5), (req, res) => {     
    res.json(req.files);
});

// 데이터 센터 > 구매제작 데이터의 승인 이미지 등록
router.post('/judgeInfo_imgUpload', uploade.single('file_data'), (req, res, next) => {  //이미지 
    res.json(req.file);        
});

router.post("/saleInfo_regUpt", async (req, res, next) => {    
    
    try {        
        let cnt = 0;
        const {pdbase_idx, show_gbn, show_dt, tel, pay_type, pay_notice, dayMnth_fee_type, feeInputData} = req.body;
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');        

        let scrsht_title_1 = '', scrsht_desc_1 = '', scrsht_file_1 = ''; file_path_1 = '';
        let scrsht_title_2 = '', scrsht_desc_2 = '', scrsht_file_2 = '', file_path_2 = '';
        let scrsht_title_3 = '', scrsht_desc_3 = '', scrsht_file_3 = '', file_path_3 = '';
        let scrsht_title_4 = '', scrsht_desc_4 = '', scrsht_file_4 = '', file_path_4 = '';
        let scrsht_title_5 = '', scrsht_desc_5 = '', scrsht_file_5 = '', file_path_5 = '';

        if(scrsht_title_1 !== '' || file_path_1 !== ''){
            scrsht_title_1 = req.body.data.scrsht_1.title;
            scrsht_desc_1 = req.body.data.scrsht_1.desc;
            scrsht_file_1 = req.body.data.scrsht_1.file;
            file_path_1 = req.body.data.scrsht_1.path;
        }
        if(scrsht_title_2 !== '' || file_path_2 !== ''){
            scrsht_title_2 = req.body.data.scrsht_2.title;
            scrsht_desc_2 = req.body.data.scrsht_2.desc;
            scrsht_file_2 = req.body.data.scrsht_2.file;
            file_path_2 = req.body.data.scrsht_2.path;
        }
        if(scrsht_title_3 !== '' || file_path_3 !== ''){
            scrsht_title_3 = req.body.data.scrsht_3.title;
            scrsht_desc_3 = req.body.data.scrsht_3.desc;
            scrsht_file_3 = req.body.data.scrsht_3.file;
            file_path_3 = req.body.data.scrsht_3.path;
        }
        if(scrsht_title_4 !== '' || file_path_4 !== ''){
            scrsht_title_4 = req.body.data.scrsht_4.title;
            scrsht_desc_4 = req.body.data.scrsht_4.desc;
            scrsht_file_4 = req.body.data.scrsht_4.file;
            file_path_4 = req.body.data.scrsht_4.path;
        }
        if(scrsht_title_5 !== '' || file_path_5 !== ''){
            scrsht_title_5 = req.body.data.scrsht_5.title;
            scrsht_desc_5 = req.body.data.scrsht_5.desc;
            scrsht_file_5 = req.body.data.scrsht_5.file;
            file_path_5 = req.body.data.scrsht_5.path;
        }
         
        let view_cnt = 0;    
        let sql_dup = `SELECT count(*) as cnt
                            FROM tbl_prddata_sale_cfg 
                            WHERE pdbase_idx = ${pdbase_idx}`;
        
        await new Promise((res, rej) => {
            conn.query(sql_dup, [], (err, rows) => {
                if (err) rej(err);                    
                else res(rows[0].cnt);        
            });
        }).then(res => {            
            cnt = res;
        }).catch(e => {
            throw new Error(e);
        })

        let sql = '';        
        if(cnt === 0) {
            // 등록
            sql = `
            INSERT INTO tbl_prddata_sale_cfg (
                pdbase_idx, show_gbn, show_dt, tel,
                scrsht_title_1, scrsht_desc_1, scrsht_file_1, file_path_1,
                scrsht_title_2, scrsht_desc_2, scrsht_file_2, file_path_2,
                scrsht_title_3, scrsht_desc_3, scrsht_file_3, file_path_3,
                scrsht_title_4, scrsht_desc_4, scrsht_file_4, file_path_4,
                scrsht_title_5, scrsht_desc_5, scrsht_file_5, file_path_5,
                pay_type, pay_notice, view_cnt, regDt
            )
            VALUES (${pdbase_idx},?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
            `;
        } else {
            // 수정
            sql = `
            UPDATE tbl_prddata_sale_cfg
            SET show_gbn = ?, show_dt = ?, tel = ?,
                scrsht_title_1 = ?, scrsht_desc_1 = ?, scrsht_file_1 = ?, file_path_1 = ?,
                scrsht_title_2 = ?, scrsht_desc_2 = ?, scrsht_file_2 = ?, file_path_2 = ?,
                scrsht_title_3 = ?, scrsht_desc_3 = ?, scrsht_file_3 = ?, file_path_3 = ?,
                scrsht_title_4 = ?, scrsht_desc_4 = ?, scrsht_file_4 = ?, file_path_4 = ?,
                scrsht_title_5 = ?, scrsht_desc_5 = ?, scrsht_file_5 = ?, file_path_5 = ?,                                                            
                pay_type = ?, pay_notice = ?, view_cnt = ?, uptDt = ?
            WHERE pdbase_idx = ${pdbase_idx}
            `;
        }
        
        // 파라미터 정보
        const params = [
            show_gbn, show_dt, tel,
            scrsht_title_1, scrsht_desc_1, scrsht_file_1, file_path_1,
            scrsht_title_2, scrsht_desc_2, scrsht_file_2, file_path_2,
            scrsht_title_3, scrsht_desc_3, scrsht_file_3, file_path_3,
            scrsht_title_4, scrsht_desc_4, scrsht_file_4, file_path_4,
            scrsht_title_5, scrsht_desc_5, scrsht_file_5, file_path_5,            
            pay_type, pay_notice, view_cnt, date
        ];
       
        conn.query(sql, params, (err, rows) => {
            if (err) {                
                conn.rollback()
                throw new Error(err);
            }else { 
                // 결제 정보 테이블 전체 삭제               
                const sql_del = `DELETE FROM tbl_prddata_fee WHERE pdbase_idx = ${pdbase_idx}`;
                conn.query(sql_del, [], (err, rows) => {
                    if (err) {                            
                        conn.rollback();
                        throw new Error(err);
                    } else {
                        if(feeInputData.length >= 1 && feeInputData[0].dtPrice !== ''){                                     
                            let sql_multi = '';                    
                                         
                            // 결제 정보 테이블 등록          
                            let sql_insert = `INSERT INTO tbl_prddata_fee 
                                                ( pdbase_idx, dayMnth_fee_type, beginCallNum,
                                                    endCallNum, dtPrice, useGbn, show_gbn, regDt, uptDt )
                                                VALUES `;
                                                
                            feeInputData.forEach( (item, idx) => {                                                                
                                if(item.endCallNum !== '' && item.dtPrice !== ''){
                                    if(idx === feeInputData.length-1 || feeInputData.length === 1){                                        
                                        sql_multi += `( ${pdbase_idx},'${dayMnth_fee_type}',0,${item.endCallNum},${item.dtPrice},'Y','Y','${date}',NULL);`;
                                    } else {                                        
                                        sql_multi += `( ${pdbase_idx},'${dayMnth_fee_type}',0,${item.endCallNum},${item.dtPrice},'Y','Y','${date}',NULL),`;
                                    }
                                }
                            })
        
                            sql_insert += sql_multi;
        
                            conn.query(sql_insert, [], (err, rows) => {
                                if (err) {                                    
                                    conn.rollback()
                                    throw new Error(err);
                                }else {
                                    res.json(rows);
                                }
                            });
                        }
                        else {                    
                            res.json(rows);
                        }
                    }
                });
            }            
        });
    }
    catch (e) {            
      conn.rollback()      
      return res.status(500).json(e)      
    } 
  });

  // 결제 금액 데이터
  router.post('/getDataFeeInfo', (req, res, next) => {
    try {
        let pdbase_idx = req.body.pdbase_idx; 
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




router.post('/getEndPointUrlDupChk', (req, res, next) => {
    try {
        let pdbase_idx = req.body.pdbase_idx; 
        let endPointUrl = req.body.endPointUrl; 

        const sql = `   
                        SELECT  COUNT(*) CNT
                        FROM tbl_prddata_base
                        WHERE pdbase_idx <> ?
                          AND endPointUrl = ?
                    `;
        const params = [pdbase_idx, endPointUrl];
        conn.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
            } else {                 
                if(Number(result[0].CNT) > 0){
                    res.send('true');
                }else{
                    res.send('false');
                }                
            }
        });                      
    } catch(e) {
        console.error(e);
        next(e);
    }
});


//심사중-2, 승인-3, 심사반려-4, 판매중-5, 판매정지-6
router.post('/getSaleDataList', (req, res, next) => {
    try {
        const compNo = req.body.compNo;        
        const sql = `
                     SELECT M.pdbase_idx,                            
                            M.data_title,
                            M.data_cate,
                            M.data_Type,
                            M.stat,
                            M.sales_stat,
                            M.valid,
                            IFNULL(M.viewCnt,0) viewCnt,
                            M.regDt,
                            M.uptDt,
                            IFNULL(N.pay_type,'') pay_type
                      FROM tbl_prddata_base M
                      LEFT JOIN tbl_prddata_sale_cfg N
                          ON M.pdbase_idx = N.pdbase_idx
                      WHERE M.mbr_id IN (SELECT mbr_id FROM tbl_member WHERE comp_no = ${compNo})
                        AND M.stat IN ('2','3','4')
                        AND M.sales_stat IN ('5','6')
                      ORDER BY M.regDt DESC 
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


// 데이터 삭제 쿼리
router.post('/deleteDataCenter', async (req, res, next) => {
    try{
        const {pdbaseIdx} = req.body; 

        const data_apprvl_sql = `DELETE FROM tbl_data_apprvl WHERE pdbase_idx = ${pdbaseIdx}`;
        const prddata_fee_sql = `DELETE FROM tbl_prddata_fee WHERE pdbase_idx = ${pdbaseIdx}`;
        const prddata_sale_cfg_sql = `DELETE FROM tbl_prddata_sale_cfg WHERE pdbase_idx = ${pdbaseIdx}`;
        const prddata_base_sql = `DELETE FROM tbl_prddata_base WHERE pdbase_idx = ${pdbaseIdx}`;
              
        conn.query(data_apprvl_sql, [], (err, rows) => {
            if (err) throw new Error(err);
            else {                
                if(rows.affectedRows >= 0 && rows.warningCount === 0){                    
                    conn.query(prddata_fee_sql, [], (err, rows) => {
                        if(err) throw new Error(err);
                        else {                            
                            if(rows.affectedRows >= 0 && rows.warningCount === 0){
                                conn.query(prddata_sale_cfg_sql, [], (err, rows) => {
                                    if(err) throw new Error(err);
                                    else {                                        
                                        if(rows.affectedRows >= 0 && rows.warningCount === 0){
                                            conn.query(prddata_base_sql, [], (err, rows) => {
                                                if(err) throw new Error(err);
                                                else {                                                    
                                                    res.json(rows);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        })        
    }catch(e) {
        console.error(e);
        next(e);
    }
});

// 데이터 센터 > 구매완료데이터의 구매제작데이터 등록
router.post('/setNwCreateDataApi', (req, res, next) => {
    try {
        //idx : 제작데이터 고유번호
        //cno : 회사번호
        //mbr_id : wise,wide..처리한 회원id
        //title : 데이터 제목
        //accss_grant : Public-공공데이터, Private-민간데이터(무료), Commerical-민간데이터(유료) 
        //data_Type : 데이터-D, 통계-T, 모델-M, 리포트-R
        const { idx: dzon_data_idx,
            cno: cno,
            mbr_id: mbr_id,
            title: data_title,
            data_Type: data_Type
        } = req.body;
        const sql = `
                    INSERT INTO tbl_prddata_base
                            (   data_title,
                                cno,
                                mbr_idx,
                                mbr_id,
                                data_Type,
                                stat,
                                valid,
                                regDt  )
                            VALUES (?,?,?,NULL,?,?,'1','Y',?)
                    `;
        const params = [            
            data_title,
            cno,
            mbr_id,
            data_Type,
            moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        ];
        conn.query(sql, params, (err, rows) => {
            if (err) {
                res.json({ "resultCode": 500, "resultDesc": err });
            } else {
                res.json({ "resultCode": 200, "resultDesc": "success" });
            }
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});


module.exports = router;
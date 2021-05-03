const express = require("express");
const app = express();
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const db_config = require("./models/db");
const conn = db_config.init();
const Main_Router = require("./routes/Main/main");
const Froum_Router = require("./routes/Main/forum");
const Support_Router = require("./routes/Main/support");
const Admin_Router = require("./routes/Main/admin");
const Setting_Router = require("./routes/Main/setting");
const Service_development_guide = require("./routes/Main/service_devel_guide");
const Data_development_guide = require("./routes/Main/data_devel_guide");
const Api_document = require("./routes/Main/api_document");
const Data_Big_Router = require("./routes/Data_center/data_center");
const Service_Big_Router = require("./routes/Service_center/service_center");
const helmet = require("helmet");
const http = require("http");
const https = require("https");
const fs = require("fs");
const moment = require('moment');
const { logger, error_logger } = require('./loger');

app.use(morgan(`log_${moment().format("YYYY-MM-DD")}`)); //요청에대한 로그가 남음
app.use("/uploade", express.static("uploade"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Front"));
app.use(helmet());
app.disable("x-powered-by"); //x-powerd-by 헤더속에는 사용중인 서버관련 소프트웨어 포함 삭제를 해야함
dotenv.config();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/developer/Main", Main_Router);
app.use("/developer/forum", Froum_Router);
app.use("/developer/support", Support_Router);
app.use("/developer/service_development_guide", Service_development_guide);
app.use("/developer/data_development_guide", Data_development_guide);
app.use("/developer/api", Api_document);
app.use("/developer/datacenter", Data_Big_Router);
app.use("/developer/svccenter", Service_Big_Router);
app.use("/developer/admin", Admin_Router);
app.use("/developer/setting", Setting_Router);

app.listen(process.env.DEV_SERVER_PORT, () => {
  logger.info('server 8081 start')
  console.log(`port ${process.env.DEV_SERVER_PORT} server start`);
});



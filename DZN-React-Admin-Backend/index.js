const express = require("express");
const app = express();

const morgan = require("morgan");
const helmet = require("helmet");

const db_config = require("./models/db");
const conn = db_config.init();

const Admin_setting_router = require("./routes/admin_Settings");
const Contents_managment_router = require("./routes/contents_management");
const Data_center_managment_router = require("./routes/data_center_management");
const Post_managment_router = require("./routes/post_management");
const Sales_managment_router = require("./routes/sales_management");
const Service_center_managment_router = require("./routes/service_center_management");
const user_managment_router = require("./routes/user_management");

const cors = require("cors");
const dotenv = require("dotenv");
app.use("/uploade", express.static("uploade"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

app.use(morgan("admin_log"));


app.use("/backoffice/user_management", Admin_setting_router);
app.use("/backoffice/admin_settings", Admin_setting_router);
app.use("/backoffice/contents_management", Contents_managment_router);
app.use("/backoffice/data_center_managment", Data_center_managment_router);
app.use("/backoffice/post_managment", Post_managment_router);
app.use("/backoffice/sales_managment", Sales_managment_router);
app.use(
  "/backoffice/service_center_managment",
  Service_center_managment_router
);
app.use("/backoffice/user_management", user_managment_router);

app.listen(process.env.SERVER_DEV_PORT, () => {
  console.log("server_start 7081");
});

const express = require("express");
const {port, PORT} = require("./config");
const app = express();
const appPort = port || PORT || 3000;
app.listen(appPort,()=>console.log(`App running on port ${appPort}`));
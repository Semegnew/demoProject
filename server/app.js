//step 1 :import dependencies
import express from "express";
import mysql from "mysql2";
import cors from "cors";
//step 2: express initialize
let app = express();
//step 3:middlewires
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//step 4:connction info for database
let connctioninfo = mysql.createConnection({
  user: "myDBuser",
  password: "121212121212",
  host: "localhost",
  database: "myDB",
});
// step 5:connect with database
connctioninfo.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db");
  }
});

//step 7: prepare routes and controllres
//create table:
app.get("/createTable", (req, res) => {
    let userinfo = `CREATE TABLE if not exists userInfo(
      user_id int auto_increment ,
      user_first_name text not null,
      user_last_name text not null,
      user_email varchar(255) not null,
      user_password varchar(255) not null,
      PRIMARY KEY(user_id)
      )`;

    connctioninfo.query(userinfo, (err, data, field) => {
      if (err) {
        console.log(err);
      } else {
        res.send("table is created");
      }
    });
 });

app.post("/register", (req, res) => {
  res.send("user added");
});

app.post("/uppload", (req, res) => {
  res.send("file is uploaded");
});

//wild card
app.get("*", (req, res) => {
  res.send("oops! page not found");
});

//step 6 listen server
app.listen(4800, () => {
  console.log("server is listening to ports 4800");
});

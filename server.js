const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sneakers",
});
//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("---My Sql Connected---");
});

const app = express();
//xet chi cho phep port 3000 su dung.
const accsec = () => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
};
//create new table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), des VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});
app.get("/createpoststable1", (req, res) => {
  let sql =
    "CREATE TABLE comments(id int AUTO_INCREMENT, cmt VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

//for insert
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//add a item

app.post("/insert/shoes", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const sizes = req.body.sizes;
  const sql =
    "INSERT INTO shoes ( title, description,price,sizes) VALUES(? ,?, ?, ?)";
  db.query(sql, [title, description], (err, result) => {
    console.log(result);
  });
});

// display all item
app.get("/get/shoes", (req, res) => {
  accsec;
  let sql = "SELECT * FROM shoes";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

//display a item
app.get("/get/shoes/:id", (req, res) => {
  let sql = `SELECT * FROM shoes WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result[0]);
  });
});
//delete a item
app.delete("/delete/shoes/:id", (req, res) => {
  const id = req.params.id;
  console.log("id day: " + id);
  const sql = "DELETE FROM shoes WHERE shoes.id = ?";
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
  });
});
//update a item

app.put("/update/shoes/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const sizes = req.body.sizes;

  console.log("id day: " + id);
  let sql = `UPDATE shoes SET title='${title}', description='${description}, price='${price}, sizes='${sizes} WHERE shoes.id=${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//delete a comment
app.delete("/delete/comment/:id", (req, res) => {
  const id = req.params.id;
  console.log("id delete day: " + id);
  const sql = `DELETE FROM comments WHERE comments.id =?`;
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
// add a comment
app.post("/add/comment/:id", (req, res) => {
  const id = req.params.id;
  console.log("id add commet: " + id);
  const commentNew = req.body.commentNew;
  console.log("commentNew: " + commentNew);
  const sql = `INSERT INTO comments( comment, id_shoes) VALUES (?,?)`;
  db.query(sql, [commentNew, id], (err, result) => {
    console.log(result);
    res.send(result);
  });
});
// display comment in a item
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = `SELECT * FROM comments INNER JOIN shoes ON comments.id_shoes = shoes.id WHERE comments.id_shoes = ${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//add cart

//delete a item in cart

//update 1 item in cart

// add user
app.post("/insert/user", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateOfBirth;
  const password = req.body.password;
  const username = req.body.username;

  const sql =
    "INSERT INTO shoes ( name, description, phone, email, address, gender, dateOfBirth, password, username) VALUES(? ,?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      description,
      phone,
      email,
      address,
      gender,
      dateOfBirth,
      password,
      username,
    ],
    (err, result) => {
      console.log(result);
    }
  );
});
//update user
app.put("/update/user/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateOfBirth;
  const password = req.body.password;
  const username = req.body.username;

  console.log("id day: " + id);
  let sql = `UPDATE users SET name = [value-2], description=${description},phone=${phone},email=${email},address=${address},gender=${gender},dateOfBirth=${dateOfBirth},password=${password},username=${username} WHERE users.id=${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
// delete user
app.delete("/delete/user/:id", (req, res) => {
  const id = req.params.id;
  console.log("id day: " + id);
  const sql = "DELETE FROM users WHERE users.id = ?";
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
  });
});
// call port 4000
app.listen("4000", () => {
  console.log("Sever start on port 4000");
});

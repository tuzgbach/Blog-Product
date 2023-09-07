import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "root123456",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello, hello bro");
});

app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/products", (req, res) => {
  const q =
    "INSERT INTO products(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  const q = " DELETE FROM products WHERE id = ? ";

  db.query(q, [productId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const q =
    "UPDATE products SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, productId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Đã kết nối tới backend");
});

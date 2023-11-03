require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");
const csv = require("csv-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const upload = multer({ dest: "uploads/" }); // Define the destination folder for file uploads
const corsConfig = {
  credentials: true,
  origin: true,
};
const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
const port = 7000;
const rootPath = process.cwd();
const uploadFilePath = "/uploads/";

// Create a MySQL connection
const db = mysql.createConnection({
  host: "62.72.28.52",
  user: "u274190647_Vogal",
  password: "Vogal@1234",
  database: "u274190647_productdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
    return;
  }
  console.log("Connected to the database");
});

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// Get all products
app.get("/products", (req, res) => {
  const query = `${
    req.query.status
      ? "SELECT * FROM product_table WHERE status = 1"
      : "SELECT * FROM product_table"
  }`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Create a new product
app.post("/products", (req, res) => {
  const {
    product_name,
    fabric,
    sleeve_length,
    pattern,
    net_quantity,
    color,
    size,
    country_of_origin,
    price,
    product_images,
  } = req.body;
  const query =
    "INSERT INTO product_table (product_name, fabric, sleeve_length, pattern, net_quantity, color, size, country_of_origin, price, product_images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      product_name,
      fabric,
      sleeve_length,
      pattern,
      net_quantity,
      color,
      size,
      country_of_origin,
      price,
      product_images,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res
          .status(201)
          .json({ message: "Product created", id: result.insertId });
      }
    }
  );
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }

  if (file.mimetype === "text/csv") {
    // Handle CSV file
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (row) => {
        // Process and insert data into the database from each CSV row
        const insertQuery =
          "INSERT INTO product_table (product_name, fabric, sleeve_length, pattern, net_quantity, color, size, country_of_origin, price, status, product_images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
          row.product_name,
          row.fabric,
          row.sleeve_length,
          row.pattern,
          row.net_quantity,
          row.color,
          row.size,
          row.country_of_origin,
          row.price,
          row.status,
          row.product_images,
        ];

        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error(err);
          }
        });
      })
      .on("end", async () => {
        // Respond with a success message
        const fileName = `${rootPath + uploadFilePath + req.file.filename}`;
        await fs.unlinkSync(fileName);
        res.status(200).json({
          message: "CSV file uploaded and data added to the database.",
        });
      });
  } else if (file.mimetype === "application/json") {
    // Handle JSON file
    const jsonContent = fs.readFileSync(file.path, "utf-8");
    const jsonData = JSON.parse(jsonContent);
    jsonData.forEach((item) => {
      const insertQuery =
        "INSERT INTO product_table (product_name, fabric, sleeve_length, pattern, net_quantity, color, size, country_of_origin, price, status, product_images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        item.product_name,
        item.fabric,
        item.sleeve_length,
        item.pattern,
        item.net_quantity,
        item.color,
        item.size,
        item.country_of_origin,
        item.price,
        item.status,
        item.product_images,
      ];

      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error(err);
        }
      });
    });
    const fileName = `${rootPath + uploadFilePath + req.file.filename}`;
    await fs.unlinkSync(fileName);
    res
      .status(200)
      .json({ message: "JSON file uploaded and data added to the database." });
  } else {
    res.status(400).json({ error: "Unsupported file type." });
  }
});

// Update product status
app.patch("/products/status/:productId", (req, res) => {
  const productId = req.params.productId;
  const { status } = req.body;

  const updateQuery =
    "UPDATE product_table SET status = ? WHERE product_id = ?";
  db.query(updateQuery, [status, productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Product status updated" });
    }
  });
});

// API endpoint to update product images
app.patch("/products/image/:productId", (req, res) => {
  const productId = req.params.productId;
  const { product_images } = req.body;
  const updateQuery =
    "UPDATE product_table SET product_images = ? WHERE product_id = ?";
  db.query(updateQuery, [product_images, productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating product images");
    } else {
      res.status(200).send("Product images updated successfully");
    }
  });
});

// Get products based on status
app.get("/products/:status", (req, res) => {
  const status = req.params.status;
  const query = "SELECT * FROM product_table WHERE status = ?";
  db.query(query, [status], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Verify admin password
app.post("/user/verify", (req, res) => {
  const { password } = req.body;
  const isPasswordMatch = password === process.env.PASSWORD;
  if (isPasswordMatch) {
    const payload = {
      password: password,
    };
    const token = jwt.sign(payload, "secret", { expiresIn: "24h" });
    return res.status(200).json({ token: token });
  }
  return res.status(500).json({ error: "Invalid Password" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

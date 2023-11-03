import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../style/shop.css";
import axios from "axios";
import TokenComponent from "../routes";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const userToken = sessionStorage.getItem("token");
  const axiosIntsance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    const response = await axiosIntsance.get("/products");
    setProducts(response.data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const base64Image = reader.result;
      const productId = id; // Replace with your actual product ID

      // Send the data to the server
      fetch(`http://195.35.45.152/products/image/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_images: base64Image }),
      }).then((response) => {
        if (response.status === 200) {
          fetchAllProduct();
          console.log("Product images updated successfully");
        } else {
          console.error("Error updating product images");
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImportFile = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://195.35.45.152/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        alert("File uploaded successfully.");
        setSelectedFile(null);
        const file = document.getElementById("fileInput");
        file.values = "";
        fetchAllProduct();
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleExportJSON = () => {
    const jsonDataString = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonDataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
  };

  function handleExportCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," + convertArrayToCSV(products);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  }

  function convertArrayToCSV(data) {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return [header, ...rows].join("\n");
  }

  const handlePublishToggle = (status, id) => {
    fetch(`http://195.35.45.152/products/status/${id}`, {
      method: "PATCH", // or 'PUT' depending on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        fetchAllProduct();
        // Handle the response data, e.g., confirmation message
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch Error:", error);
      });
  };

  return (
    <TokenComponent token={userToken}>
      <Container>
        <Row>
          <Col>
            <div>
              <div className="import-export-section">
                <div className="import-section">
                  <h3>Import Data</h3>
                  <div>
                    <Form.Control
                      type="file"
                      id="fileInput"
                      accept=".csv, .json"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <Button variant="success" onClick={handleImportFile}>
                      Import Data
                    </Button>
                  </div>
                </div>
                <div className="export-section">
                  <h3>Export Data</h3>
                  <Button
                    variant="primary"
                    onClick={handleExportJSON}
                    style={{ marginRight: "20px" }}
                  >
                    Export as JSON
                  </Button>
                  <Button variant="success" onClick={handleExportCSV}>
                    Export as CSV
                  </Button>
                </div>
              </div>
            </div>
            <Table striped bordered hover className="product-table">
              <thead>
                <tr>
                  <th className="text-center">Image</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Fabric</th>
                  <th className="text-center">Sleeve</th>
                  <th className="text-center">Pattern</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Color</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Size</th>
                  <th className="text-center">Country</th>
                  <th className="text-center">Image Upload</th>
                  <th className="text-center">Publish</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={product.product_images}
                        alt={product.name}
                        className="product-images"
                      />
                    </td>
                    <td className="text-center">{product.product_name}</td>
                    <td className="text-center">{product.fabric}</td>
                    <td className="text-center">{product.sleeve_length}</td>
                    <td className="text-center">{product.pattern}</td>
                    <td className="text-center">{product.net_quantity}</td>
                    <td className="text-center">{product.color}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">{product.size}</td>
                    <td className="text-center">{product.country_of_origin}</td>
                    <td className="text-center">
                      <Form.Control
                        type="file"
                        id={`image-${index}`}
                        onChange={(e) =>
                          handleImageChange(e, product.product_id)
                        }
                      />
                    </td>
                    <td className="text-center">
                      <Form className="publish-toggle">
                        <Form.Group
                          as={Col}
                          controlId={`publishToggle${index}`}
                        >
                          <Form.Check
                            type="switch"
                            id={`custom-switch${index}`}
                            label=""
                            checked={product.status ? true : false}
                            onChange={(e) =>
                              handlePublishToggle(
                                e.target.checked,
                                product.product_id
                              )
                            }
                          />
                        </Form.Group>
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </TokenComponent>
  );
};

export default Shop;

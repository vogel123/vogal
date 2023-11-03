import React, { useState } from "react";
import Logo from "../images/logo.png";
import "../style/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState(""); // State for the city input value
  const [isCityValid, setCityValid] = useState(true); // State to track city validation
  const token = sessionStorage.getItem("token");
  const axiosIntsance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.trim() === "") {
      setCityValid(false);
    } else {
      setCityValid(true);
      try {
        const response = await axiosIntsance.post(`/user/verify`, {
          password: password,
        });
        console.log("API Response:", response.data);
        sessionStorage.setItem("token", response.data.token);
        navigate("/shop");
        handleClose();
        setPassword("");
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };
  const userToken = sessionStorage.getItem("token");

  return (
    <div className="main_header">
      <header style={{ position: "relative" }}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="logo-col">
              <img src={Logo} />
            </div>
            <div className={open ? "nav-col nav-open" : "nav-col"}>
              <div className="navbar-col">
                <span
                  onClick={() => setOpen(false)}
                  className="d-xl-none d-block ms-auto text-center"
                  style={{ width: "32px" }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ fontSize: "30px" }}
                  />
                </span>
                <ul className="d-xl-flex flex-wrap align-items-center nav-link-list justify-content-center">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  {userToken && (
                    <li>
                      <NavLink to="/shop">Shop</NavLink>
                    </li>
                  )}

                  <li>
                    <NavLink to="/feature">Features</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Deal Zone</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Pages</NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog">Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Buy Now</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-col">
              <div className="profile-col-wrap d-flex justify-content-end align-items-center">
                <span className="d-flex align-items-center justify-content-center cart-icon header-icon">
                  <svg
                    className="at-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128.6,129.7c-35.7,0-64.7-29-64.7-64.7c0-35.7,29.1-64.7,64.7-64.7s64.7,29,64.7,64.7C193.3,100.6,164.3,129.7,128.6,129.7 z M128.6,20.7c-24.4,0-44.4,19.8-44.4,44.4c0,24.4,19.9,44.4,44.4,44.4S173,89.4,173,65C173,40.5,153.1,20.7,128.6,20.7z"></path>
                    <path className="st0" d="M20.7,243.7"></path>
                    <path d="M18.8,255.9c-5.6,0-10.2-4.6-10.2-10.2V220c0-3.9,0.6-23.9,11.9-43.1c9.1-15.5,27.4-33.9,63.3-33.9h88.8h0.2 c0.8,0,18.9,1,37.3,10.2c25.4,12.7,38.9,34.6,38.9,63.3l-0.1,29.4c0,5.6-4.6,10.2-10.2,10.2l0,0c-5.6,0-10.2-4.6-10.2-10.2l0.1-29.4 c0-48.4-52.2-52.8-56.6-53.1H83.8c-54.2,0-54.8,54.4-54.8,56.8v25.7C29,251.3,24.4,255.9,18.8,255.9z"></path>
                  </svg>
                </span>
                <span className="d-flex position-relative align-items-center justify-content-center cart-icon header-icon">
                  <svg
                    className="at-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                  >
                    <path d="M251,51.9c-4.7-5.4-11.8-8.2-21.3-8.2H49.5L44.7,0.7H10.1C4.5,0.7,0,5.2,0,10.8s4.5,10.1,10.1,10.1h16.5l15.2,135.3 c1.1,11.2,9.8,32.2,34.5,32.2h127.9l0.1,0c9.1-0.2,27.2-6.9,31-30.4l20.3-89.1l0.1-0.8C256.1,66.6,256.9,58.7,251,51.9z M215.6,153.8l-0.1,0.7c-1.8,11.8-9.2,13.4-11.6,13.7H76.4c-5.4,0-9-1.9-11.6-6.1c-2.3-3.8-2.8-7.9-2.8-7.9L51.8,64h177.9 c4.2,0,5.8,1,6,1.2c0,0,0,0.1,0.1,0.2L215.6,153.8z"></path>
                    <path d="M83.4,198.2c-15.8,0-28.6,12.8-28.6,28.6c0,15.8,12.8,28.6,28.6,28.6s28.6-12.8,28.6-28.6C112,211,99.2,198.2,83.4,198.2z M83.4,237.1c-5.7,0-10.4-4.7-10.4-10.4s4.7-10.4,10.4-10.4c5.7,0,10.4,4.7,10.4,10.4S89.1,237.1,83.4,237.1z"></path>
                    <path d="M183,198.2c-15.8,0-28.6,12.8-28.6,28.6c0,15.8,12.8,28.6,28.6,28.6s28.6-12.8,28.6-28.6C211.5,211,198.7,198.2,183,198.2z M183,237.1c-5.7,0-10.4-4.7-10.4-10.4s4.7-10.4,10.4-10.4s10.4,4.7,10.4,10.4S188.7,237.1,183,237.1z"></path>
                  </svg>
                  <span className="product-count">0</span>
                </span>
                <span
                  className="d-xl-none d-block"
                  onClick={() => setOpen(true)}
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    className="ms-3"
                    style={{ fontSize: "20px" }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {!token && (
          <>
            <Button
              onClick={handleShow}
              style={{
                position: "absolute",
                top: "0px",
                background: "transparent",
                border: "0px",
              }}
            ></Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom03">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Password"
                        required
                        isInvalid={!isCityValid}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setCityValid(true); // Reset the validation when the input changes
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Modal.Footer className="p-0 border-0">
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit">Submit</Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;

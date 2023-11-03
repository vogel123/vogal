import React, { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Slider from "react-slick";
import product2 from "../images/product-2.jpg";
import product3 from "../images/product-3.jpg";
import "../style/product.css";
import product from "../images/product.jpg";
import safeCheckout from "../images/safe-checkout.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState("XS");
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const axiosIntsance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    const response = await axiosIntsance.get(`/products?status=true`);
    setProducts(response.data);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
  };

  const productSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  let slider1, slider2;

  const sizes = ["XS", "S", "M"];

  return (
    <main className="main-main">
      {/* <Header /> */}
      {state && Object.keys(state).length ? (
        <>
          <section className="main-product">
            <div className="container">
              <div className="row">
                <div className="col-md-6 product-view-slider">
                  <Slider
                    asNavFor={nav2}
                    ref={(slider) => (slider1 = slider)}
                    {...settings}
                  >
                    <div>
                      <div className="product-view">
                        <img src={state.product_images} />
                      </div>
                    </div>
                    {/* <div>
                  <div className="product-view">
                    <img src={product2} />
                  </div>
                </div>
                <div>
                  <div className="product-view">
                    <img src={product3} />
                  </div>
                </div> */}
                  </Slider>
                </div>
                <div className="col-md-6 mt-md-0 mt-4">
                  <div className="product-info-col">
                    <h2 className="title product-title">
                      {state.product_name}
                    </h2>
                    <div className="d-flex ratting-star mt-1">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalf} />
                      <span style={{ fontSize: "14px" }}>4.5 Reviews</span>
                    </div>
                    <h5 className="main-product-price my-3">
                      Rs. {state.price}
                    </h5>
                    <p style={{ fontSize: "14px" }}>
                      {state.net_quantity > 0
                        ? "In stock - Ready to ship"
                        : "Out stock"}
                    </p>
                    <p style={{ fontSize: "14px" }} className="fw-bold mb-1">
                      Color : {state.color}
                    </p>
                    <div className="product-color-list">
                      {/* <Slider
                    asNavFor={nav1}
                    ref={(slider) => (slider2 = slider)}
                    slidesToShow={1}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    <img src={state.product_images} alt="img" />
                    <img src={product2} />
                    <img src={product3} />
                  </Slider> */}
                    </div>
                    <p
                      style={{ fontSize: "14px" }}
                      className="fw-bold mb-1 mt-4"
                    >
                      Size : {size}
                    </p>
                    <ul className="d-flex product-size-list">
                      {sizes.map((item) => (
                        <li
                          onClick={() => setSize(item)}
                          className={`d-flex align-items-center justify-content-center ${
                            size === item && "active"
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="d-lg-flex justify-content-between mt-lg-5 mt-4 align-items-center">
                      <div className="d-flex product-cont mb-lg-0 mb-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (count > 0) {
                              setCount(count - 1);
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setCount(count + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="d-flex counter-side-text">
                        <a className="wishlist d-flex align-items-center">
                          <svg
                            className="at-icon wishicon added"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <path
                              className="add"
                              d="M127.8,241.9L37,160.5c-2.3-2-34.9-31.2-36.3-68.8c-0.7-19.6,7-37.5,23-53.5C37.9,24,54,17.1,71.6,17.5 c24.6,0.6,45.7,15.8,56.3,25.1c10.6-9.3,31.5-24.5,56.1-25.1c17.7-0.5,33.8,6.5,47.9,20.6c16.2,16.2,24.1,34.5,23.3,54.2 c-1.5,37.4-33.9,66.1-36.3,68.2L127.8,241.9z M70.1,37.5c-11.7,0-22.2,4.8-32.2,14.8c-12,12-17.6,24.6-17.1,38.5 c1,29.4,29.2,54.4,29.5,54.6l0.1,0.1l77.5,69.5l78-69.7c0.3-0.2,28.3-24.7,29.4-53.9c0.5-13.9-5.4-27.1-17.4-39.2v0 c-10.2-10.2-21.1-15.1-33.2-14.8c-26.2,0.6-49,25.5-49.3,25.7l-7.4,8.2l-7.4-8.2C120.3,63,97.3,38.1,71,37.5 C70.7,37.5,70.4,37.5,70.1,37.5z"
                            ></path>
                            <path
                              className="added"
                              d="M127.8,241.9L37,160.5c-2.3-2-34.9-31.2-36.3-68.8c-0.7-19.6,7-37.5,23-53.5C37.9,24,54,17.1,71.6,17.5 c24.6,0.6,45.7,15.8,56.3,25.1c10.6-9.3,31.5-24.5,56.1-25.1c17.7-0.5,33.8,6.5,47.9,20.6c16.2,16.2,24.1,34.5,23.3,54.2 c-1.5,37.4-33.9,66.1-36.3,68.2L127.8,241.9z"
                            ></path>
                          </svg>
                          <span className="msg">Available in Wishlist</span>
                        </a>
                        <a className="ask-ques d-flex align-items-center ms-2">
                          <svg
                            className="at-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm7.67-24h-16c-6.627 0-12-5.373-12-12v-.381c0-70.343 77.44-63.619 77.44-107.408 0-20.016-17.761-40.211-57.44-40.211-29.144 0-44.265 9.649-59.211 28.692-3.908 4.98-11.054 5.995-16.248 2.376l-13.134-9.15c-5.625-3.919-6.86-11.771-2.645-17.177C185.658 133.514 210.842 116 255.67 116c52.32 0 97.44 29.751 97.44 80.211 0 67.414-77.44 63.849-77.44 107.408V304c0 6.627-5.373 12-12 12zM256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8z"></path>
                          </svg>
                          <span>Ask A Question</span>
                        </a>
                      </div>
                    </div>
                    <button type="button" className="d-block mt-3 add-cart-btn">
                      ADD TO CART
                    </button>
                    <div className="freeShipMsg d-flex align-items-center mt-3">
                      <svg
                        className="at-icon mr5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M382.2,118.3h-66V81.6c0-7-5.5-12.7-12.3-12.7H12.3C5.5,68.8,0,74.5,0,81.6v301.6c0,7,5.5,12.7,12.3,12.7h41.2 c5.7,27.5,29.3,47.3,56.7,47.3c27.3,0,50.9-19.8,56.7-47.3H345c5.7,27.5,29.3,47.3,56.7,47.3c27.3,0,50.9-19.8,56.7-47.3h41.2 c6.8,0,12.3-5.7,12.3-12.7V252.6C512,178.6,453.8,118.3,382.2,118.3z M406,241c-16.1,0-29.2-13.6-29.2-30.2v-66.9h5.4 c53.3,0,98.9,42.5,104.6,97.2H406z M406,266.5h81.3v103.9h-28.8c-5.7-27.5-29.3-47.3-56.7-47.3c-27.3,0-50.9,19.8-56.7,47.3h-28.9 V143.8h36v66.9C352.1,241.5,376.3,266.5,406,266.5z M435.1,383.2c0,19-15,34.5-33.4,34.5s-33.4-15.5-33.4-34.5s15-34.5,33.4-34.5 S435.1,364.1,435.1,383.2z M291.5,313.8v56.7H167c-5.7-27.5-29.3-47.3-56.7-47.3c-27.3,0-50.9,19.8-56.7,47.3H24.6v-56.7H291.5z M110.2,348.6c18.4,0,33.4,15.5,33.4,34.5s-15,34.5-33.4,34.5s-33.4-15.5-33.4-34.5S91.8,348.6,110.2,348.6z M291.5,94.3v194H24.6 v-194H291.5z"></path>
                      </svg>
                      <span className="ps-2">
                        Spent <b> Rs. 16,900.00 </b> more to get free shipping
                      </span>
                    </div>
                    <div className="shipBar my-3">
                      <span className="db anim"></span>
                    </div>
                    <div className="freeShipMsg d-flex align-items-center">
                      <svg
                        className="at-icon mr10"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"></path>
                      </svg>
                      <span className="ps-2">
                        Estimated delivery between{" "}
                        <b> 23 October - 30 October </b>{" "}
                      </span>
                    </div>
                    <span className="border-bottom d-block my-3"></span>
                    <div>
                      <img src={safeCheckout} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-5">
            <div className="container">
              {/* <div className='product-description'>
                        <ul className='d-flex pro-info-list'>
                            <li className='active'>Product Description</li>
                            <li>Shipping & Returns</li>
                            <li>Product Reviews</li>
                            <li>General Tab</li>
                        </ul>
                        <div className='main-info pt-4 mt-2'>
                            <p>An ideal pick for a party eve, this playsuit is designed with a sequin embellished surface and a spaghetti neck. With a chic hue, this one makes for a perfect pick this fall.</p>
                            <p>Beautifully tailored with premium fabric. So get your basics right and you are good to go.</p>
                            <h4 className='title mt-4 mb-3 pt-1'>Features</h4>
                            <ul className='main-info-list'>
                                <li>High-neck style</li>
                                <li>Drop shoulders</li>
                                <li>Flared cuffs</li>
                                <li>Asymmetrical hem</li>
                                <li>70% cotton, 30% polyester.</li>
                                <li>Easy to wear and versatile as Casual.</li>
                            </ul>
                            <h4 className='title mt-4 mb-3 pt-1'>Features</h4>
                            <ul className='main-info-list mb-3'>
                                <li>High-neck style</li>
                                <li>Drop shoulders</li>
                                <li>Flared cuffs</li>
                                <li>Asymmetrical hem</li>
                                <li>70% cotton, 30% polyester.</li>
                                <li>Easy to wear and versatile as Casual.</li>
                            </ul>
                        </div>
                    </div> */}

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Product Description</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      An ideal pick for a party eve, this playsuit is designed
                      with a sequin embellished surface and a spaghetti neck.
                      With a chic hue, this one makes for a perfect pick this
                      fall.
                    </p>
                    <p>
                      Beautifully tailored with premium fabric. So get your
                      basics right and you are good to go.
                    </p>
                    <h4 className="title mt-4 mb-3 pt-1">Features</h4>
                    <ul className="main-info-list">
                      <li>High-neck style</li>
                      <li>Drop shoulders</li>
                      <li>Flared cuffs</li>
                      <li>Asymmetrical hem</li>
                      <li>70% cotton, 30% polyester.</li>
                      <li>Easy to wear and versatile as Casual.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Shipping & Returns</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      An ideal pick for a party eve, this playsuit is designed
                      with a sequin embellished surface and a spaghetti neck.
                      With a chic hue, this one makes for a perfect pick this
                      fall.
                    </p>
                    <p>
                      Beautifully tailored with premium fabric. So get your
                      basics right and you are good to go.
                    </p>
                    <h4 className="title mt-4 mb-3 pt-1">Features</h4>
                    <ul className="main-info-list">
                      <li>High-neck style</li>
                      <li>Drop shoulders</li>
                      <li>Flared cuffs</li>
                      <li>Asymmetrical hem</li>
                      <li>70% cotton, 30% polyester.</li>
                      <li>Easy to wear and versatile as Casual.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Product Reviews</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      An ideal pick for a party eve, this playsuit is designed
                      with a sequin embellished surface and a spaghetti neck.
                      With a chic hue, this one makes for a perfect pick this
                      fall.
                    </p>
                    <p>
                      Beautifully tailored with premium fabric. So get your
                      basics right and you are good to go.
                    </p>
                    <h4 className="title mt-4 mb-3 pt-1">Features</h4>
                    <ul className="main-info-list">
                      <li>High-neck style</li>
                      <li>Drop shoulders</li>
                      <li>Flared cuffs</li>
                      <li>Asymmetrical hem</li>
                      <li>70% cotton, 30% polyester.</li>
                      <li>Easy to wear and versatile as Casual.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>General Tab</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      An ideal pick for a party eve, this playsuit is designed
                      with a sequin embellished surface and a spaghetti neck.
                      With a chic hue, this one makes for a perfect pick this
                      fall.
                    </p>
                    <p>
                      Beautifully tailored with premium fabric. So get your
                      basics right and you are good to go.
                    </p>
                    <h4 className="title mt-4 mb-3 pt-1">Features</h4>
                    <ul className="main-info-list">
                      <li>High-neck style</li>
                      <li>Drop shoulders</li>
                      <li>Flared cuffs</li>
                      <li>Asymmetrical hem</li>
                      <li>70% cotton, 30% polyester.</li>
                      <li>Easy to wear and versatile as Casual.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </section>{" "}
        </>
      ) : (
        <h3 className="title section-title text-center mb-5 mt-5">
          No product details found
        </h3>
      )}

      <section className="section-space pt-0">
        <div className="container">
          <h3 className="title section-title text-center mb-5">
            Recommended Products
          </h3>
          <div className="product-slider">
            <Slider {...productSlider}>
              {products.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="product-col text-center">
                    <div className="product-image">
                      <img src={item.product_images} alt="img" />
                      <ul className="bottom-bar d-flex align-items-center justify-content-center">
                        <li>
                          <svg
                            className="at-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <path d="M251,51.9c-4.7-5.4-11.8-8.2-21.3-8.2H49.5L44.7,0.7H10.1C4.5,0.7,0,5.2,0,10.8s4.5,10.1,10.1,10.1h16.5l15.2,135.3 c1.1,11.2,9.8,32.2,34.5,32.2h127.9l0.1,0c9.1-0.2,27.2-6.9,31-30.4l20.3-89.1l0.1-0.8C256.1,66.6,256.9,58.7,251,51.9z M215.6,153.8l-0.1,0.7c-1.8,11.8-9.2,13.4-11.6,13.7H76.4c-5.4,0-9-1.9-11.6-6.1c-2.3-3.8-2.8-7.9-2.8-7.9L51.8,64h177.9 c4.2,0,5.8,1,6,1.2c0,0,0,0.1,0.1,0.2L215.6,153.8z"></path>
                            <path d="M83.4,198.2c-15.8,0-28.6,12.8-28.6,28.6c0,15.8,12.8,28.6,28.6,28.6s28.6-12.8,28.6-28.6C112,211,99.2,198.2,83.4,198.2z M83.4,237.1c-5.7,0-10.4-4.7-10.4-10.4s4.7-10.4,10.4-10.4c5.7,0,10.4,4.7,10.4,10.4S89.1,237.1,83.4,237.1z"></path>
                            <path d="M183,198.2c-15.8,0-28.6,12.8-28.6,28.6c0,15.8,12.8,28.6,28.6,28.6s28.6-12.8,28.6-28.6C211.5,211,198.7,198.2,183,198.2z M183,237.1c-5.7,0-10.4-4.7-10.4-10.4s4.7-10.4,10.4-10.4s10.4,4.7,10.4,10.4S188.7,237.1,183,237.1z"></path>
                          </svg>
                        </li>
                        <li>
                          <svg
                            className="at-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <path d="M252.9,234.1l-53.4-53.4c-3.1-3.1-7.5-4.3-11.5-3.4c16.3-18.7,26.2-43.2,26.2-69.9c0-58.9-47.9-106.8-106.8-106.8 S0.6,48.5,0.6,107.3s47.9,106.8,106.8,106.8c27.1,0,51.9-10.2,70.8-26.9c-0.8,4,0.4,8.3,3.5,11.4L235,252c2.5,2.5,5.7,3.7,8.9,3.7 c3.2,0,6.5-1.2,8.9-3.7C257.8,247.1,257.8,239.1,252.9,234.1z M107.3,193.9c-47.7,0-86.6-38.8-86.6-86.6s38.8-86.6,86.6-86.6 s86.6,38.8,86.6,86.6S155.1,193.9,107.3,193.9z"></path>
                          </svg>
                        </li>
                      </ul>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{item.product_name}</h5>
                      <p className="product-price">Rs. {item.price}</p>
                      <div className="d-flex justify-content-center ratting-star">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalf} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </main>
  );
};

export default Product;

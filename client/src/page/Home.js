import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Slider from "react-slick";
import slide1 from "../images/slide_1.jpg";
import slide2 from "../images/slide_2.jpg";
import product from "../images/product.jpg";
import product2 from "../images/product-2.jpg";
import product3 from "../images/product-3.jpg";
import brand from "../images/sub-logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

import "../style/home.css";
import Footer from "../component/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const axiosIntsance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  const brandSlider = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    const response = await axiosIntsance.get(`/products?status=true`);
    setProducts(response.data);
  };

  return (
    <main className="main-main">
      {/* <Header /> */}
      <section className="hero-banner">
        <Slider {...settings}>
          <div>
            <div className="banner-img">
              <img src={slide1} />
            </div>
          </div>
          <div>
            <div className="banner-img">
              <img src={slide2} />
            </div>
          </div>
        </Slider>
      </section>
      <section className="section-space">
        <div className="container">
          <h3 className="title section-title text-center">New Arrivals</h3>
          <p className="text-center">We have your occasion covered</p>
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-xl-3 mb-3 col-md-4 col-6">
                <div
                  className="product-col text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/product", { state: product })}
                >
                  <div className="product-image">
                    <img src={product.product_images} alt="product" />
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
                    <h5 className="product-name">{product.product_name}</h5>
                    <p className="product-price">Rs. {product.price}</p>
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
          </div>
        </div>
      </section>

      <section className="section-space explore-section">
        <div className="container">
          <h3 className="title section-title text-center mb-5">
            There's More to Explore
          </h3>
          <div className="row">
            <div className="col-md-4 col-6">
              <div className="zoom-product big-product position-relative">
                <img src={product3} alt="img" />
                <button type="button">Shoes</button>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="zoom-product big-product position-relative">
                <img src={product3} />
                <button type="button">Shoes</button>
              </div>
            </div>
            <div className="col-md-4 col-12 last-col">
              <div className="zoom-product small-product mb-md-3 position-relative">
                <img src={product3} alt="img" />
                <button type="button">Shoes</button>
              </div>
              <div className="zoom-product small-product position-relative">
                <img src={product3} alt="img" />
                <button type="button">Shoes</button>
              </div>
            </div>
          </div>
          <div className="brand-slider pt-5">
            <Slider {...brandSlider}>
              {Array(8)
                .fill(null)
                .map((_, index) => (
                  <div className="px-2 brand-logo" key={index}>
                    <img src={brand} alt="img" />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <h3 className="title section-title text-center mb-5">Top Seller</h3>
          <div className="product-slider">
            <Slider {...productSlider}>
              {products.map((product, index) => (
                <div key={index} className="px-2">
                  <div className="product-col text-center">
                    <div className="product-image">
                      <img src={product.product_images} alt="product" />
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
                      <h5 className="product-name">{product.product_name}</h5>
                      <p className="product-price">Rs. {product.price}</p>
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

export default Home;

import "./bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/page/Home";
import Product from "./page/Product";
import Shop from "./page/Shop";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/feature" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import banner from "../assets/ecommerce.jpg";
import shop from "../assets/shopping.png";
import style from "../styles/Home.module.css";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <div className={style.banner}>
        <div className={style.bannerContent}>
          <h1>Welcome To Hashibira</h1>
          <h3>Your One-Stop Online Shopping Destination!</h3>
          <h5>
            Discover the latest in fashion, electronics, home essentials, and
            more.
          </h5>
          <h2>✨ Exclusive offers | 🚚 Free Shipping on Orders Above ₹999 </h2>
          <h2>
            🛒 Exclusive Festive Sale – Up to 70% OFF! | 🔄 7-Day Easy Returns
          </h2>
          <Link to="/Products">
            {" "}
            <button>
              <p>Shop Now</p>
              <BsArrowUpRightSquare />
            </button>
          </Link>
        </div>
        <img src={shop} alt="" />
      </div>
    </div>
  );
};

export default Home;

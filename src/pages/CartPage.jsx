import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/CartPage.module.css";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../store/cartSlice";
import { FaStar } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPage = () => {
  const [imageLoaded, setImageLoaded] = useState({});
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart);

  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (total, ele) => total + ele.price * ele.quantity,
    0
  );

   // Scroll to top when CartPage loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={style.mainCartPage}>
      {cartProducts.length !== 0 ? (
        <div className={style.insideCards}>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartProducts.map((ele) => (
                <tr key={ele.id}>
                  <td>
                    <div className={style.imgContainer}>
                      {!imageLoaded[ele.id] && (
                        <Skeleton
                          height={150}
                          width={150}
                          style={{
                            borderRadius: "8px",
                            marginRight: "15px",
                          }}
                        />
                      )}
                      <img
                        src={ele.images[0]}
                        alt={ele.title}
                        className={style.image}
                        style={{
                          display: imageLoaded[ele.id] ? "block" : "none",
                        }}
                        onLoad={() =>
                          setImageLoaded((prev) => ({
                            ...prev,
                            [ele.id]: true,
                          }))
                        }
                      />

                      <div className={style.partRight}>
                        <h3>{ele.title}</h3>
                        <div className={style.ratingButton}>
                          <h3>{ele.rating}</h3>
                          <FaStar />
                        </div>
                        <h5 className={style.discount}>
                          Discount : {ele.discountPercentage} %
                        </h5>
                      </div>
                    </div>
                  </td>

                  <td>${ele.price}</td>

                  <td>
                    <div className={style.countings}>
                      <button
                        className={style.btn}
                        onClick={() => dispatch(decrementQuantity(ele.id))}
                      >
                        -
                      </button>
                      <span className={style.countValue}>{ele.quantity}</span>
                      <button
                        className={style.btn}
                        onClick={() => dispatch(incrementQuantity(ele.id))}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td>${Math.ceil(ele.price * ele.quantity)}</td>

                  <td>
                    <div
                      onClick={() => dispatch(removeItem(ele.id))}
                      className={style.remButton}
                    >
                      Remove
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={style.finalPrice}>
            <p>
              Final Price: <b>${Math.ceil(totalPrice)}</b>
            </p>
            <div className={style.btnContainer}>
              <button className={style.checkout}>Checkout</button>
              <button
                className={style.clearBtn}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.errorMessage}>
          🛒 No Items in Cart <br /> Please Add Something
        </div>
      )}
    </div>
  );
};

export default CartPage;

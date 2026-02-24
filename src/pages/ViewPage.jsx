import React, { useState, useEffect } from "react";
import style from "../styles/ViewPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { FaStar } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addViewItem } from "../store/viewSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewPage = () => {
  const viewProducts = useSelector((state) => state.view);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  useEffect(() => {
    // scroll to top when ViewPage mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
    const stored = localStorage.getItem("viewProduct");
    if (stored && viewProducts.length === 0) {
      const parsed = JSON.parse(stored);
      dispatch(addViewItem(parsed)); // Restore Redux state
    }
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [viewProducts, viewProducts.length]);

  function addItemToCart(ele) {
    const alreadyInCart = cartItems.some((item) => item.id === ele.id);

    if (alreadyInCart) {
      toast.warn("Already in cart");
    } else {
      dispatch(addItem(ele));
      toast.success("Item added to cart");
    }
  }

  return (
    <div className={style.ViewPageConatiner}>
      {loading ? (
        <div className={style.mainViewContent}>
          <div className={style.insideView}>
            <div className={style.imgPart}>
              <Skeleton height={500} width={500} />
            </div>
            <div className={style.ContentContainer}>
              <Skeleton width={500} height={60} />
              <Skeleton width={250} height={45} />
              <Skeleton width={200} height={45} />
              <Skeleton count={4} height={20} width={600} />
              <Skeleton width={200} height={35} />
              <Skeleton width={200} height={45} />
              <Skeleton width={200} height={25} />
              <div className={style.buttonParts}>
                <Skeleton width={200} height={40} />
                <Skeleton width={200} height={40} />
              </div>
            </div>
          </div>
          <div className={style.remainingContent}>
            <Skeleton width={250} height={25} />
            <Skeleton width={300} height={20} />
            <Skeleton width={100} height={20} />
          </div>
          <div className={style.otherDetails}>
            <Skeleton width={180} height={25} />
            <Skeleton count={3} height={50} style={{ marginBottom: "10px" }} />
          </div>
        </div>
      ) : (
        viewProducts.map((ele, i) => {
          return (
            <div className={style.mainViewContent} key={ele.id}>
              <div className={style.insideView}>
                <div className={style.imgPart}>
                  {!imageLoaded[ele.id] && (
                    <Skeleton
                      height={500}
                      width={500}
                      style={{
                        borderRadius: "5px",
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
                </div>

                <div className={style.ContentContainer}>
                  <h3 className={style.title}>{ele.title}</h3>
                  <h2 className={style.price}>Price : ${ele.price}</h2>
                  <div className={style.rating}>
                    {" "}
                    <h3>Rating : {ele.rating}</h3>{" "}
                    <FaStar className={style.star} />
                  </div>
                  <h5 className={style.description}>{ele.description}</h5>
                  <h5 className={style.discount}>
                    Discount : {ele.discountPercentage} %
                  </h5>
                  <h5 className={style.info}>
                    Shipping Information : {ele.shippingInformation}{" "}
                  </h5>
                  <h5 className={style.status}>
                    Availability : {ele.availabilityStatus}{" "}
                  </h5>
                  <div className={style.buttonParts}>
                    <div className={style.buy}>Buy Now</div>
                    <div
                      className={style.cart}
                      onClick={() => addItemToCart(ele)}
                    >
                      Add To Cart
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.remainingContent}>
                <h3 className={style.brand}>
                  Brand : {ele.brand},
                  <span className={style.catagory}>
                    Category ({ele.category})
                  </span>
                </h3>
                <h5 className={style.warrenty}>
                  Warrenty : {ele.warrantyInformation}{" "}
                  <span className={style.policy}>({ele.returnPolicy})</span>
                </h5>
                <h5 className={style.stock}>In Stock : {ele.stock}</h5>
              </div>

              <div className={style.otherDetails}>
                <h2 className={style.titleReview}>Reviews & Ratings</h2>
                <div className={style.reviews}>
                  {ele.reviews.map((e) => {
                    return (
                      <div className={style.reviewPart} key={e.rating}>
                        <div className={style.reviewRating}>
                          <div className={style.reviewRatingInner}>
                            {" "}
                            <h3>{ele.rating}</h3>{" "}
                            <FaStar className={style.star} />
                          </div>
                          <div>{e.date}</div>
                        </div>
                        <div className={style.reviewComment}>{e.comment}</div>
                        <div className={style.reviewName}>
                          <div>{e.reviewerName} </div>
                          <div>{e.reviewerEmail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
      <ToastContainer
        position="top-center"
        autoClose={1200}
        toastStyle={{
          width: "220px",
          textAlign: "center",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default ViewPage;

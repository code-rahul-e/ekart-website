import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addViewItem } from "../store/viewSlice";
import style from "../styles/Products.module.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Card() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useSelector((state) => state.search.query);
  const [imageLoaded, setImageLoaded] = useState({});

  useEffect(() => {
    async function fetchApi() {
      try {
        let url = await fetch("https://dummyjson.com/products?limit=200");
        let response = await url.json();
        setData(response.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  }, []);

  // redux dispatch
  let dispatch2 = useDispatch();

  function addViewItemToPage(ele) {
    dispatch2(addViewItem(ele));
    // Save to localStorage
    localStorage.setItem("viewProduct", JSON.stringify(ele));
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Step 1 — Filter from all data (not currentItems)
  let filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Step 2 — Paginate filtered results
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Step 3 — Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={style.mainCardContainer}>
      <div className={style.cardContainer}>
        {loading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className={style.card}>
              <Skeleton height={190} />
              <div className={style.cardContent}>
                <Skeleton
                  width={230}
                  height={20}
                  style={{ margin: "6px 0px" }}
                />
                <Skeleton
                  width={100}
                  height={20}
                  style={{ margin: "8px 0px" }}
                />
                <Skeleton width={140} height={20} />
              </div>
            </div>
          ))
        ) : currentItems.length > 0 ? (
          currentItems.map((ele) => (
            <div
              key={ele.id}
              className={style.card}
              onClick={() => addViewItemToPage(ele)}
            >
              <Link to="/ViewPage" className={style.linkCard}>
                <div className={style.imgContainer}>
                  {!imageLoaded[ele.id] && (
                    <Skeleton
                      height={160}
                      width={240}
                      style={{
                        borderRadius: "5px",
                        margin: "20px 0",
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
                <div className={style.cardContent}>
                  <h4>
                    {ele.title.length > 20
                      ? ele.title.slice(0, 20) + "..."
                      : ele.title}
                  </h4>
                  <h3>Price: ${ele.price}</h3>
                  <h5>{ele.warrantyInformation}</h5>
                  <div className={style.ratingButton}>
                    {" "}
                    <h3>{ele.rating}</h3> <FaStar />
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className={style.notFound}>
            <h3>No Products Found</h3>
          </div>
        )}
      </div>
      <div style={{ marginTop: "50px" }} className={style.paginationButtons}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={style.prev}
        >
          Prev
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={style.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Card;

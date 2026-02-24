import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "../styles/Header.module.css";
import { setSearchQuery } from "../store/searchSlice";
import { IoCartSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.query);
  let cartProducts = useSelector((state) => {
    return state.cart;
  });

  return (
    <div>
      <nav className={style.nav}>
        <h1 className={style.logo}>
          <NavLink to="/">
            <div className={style.logoName}>
              <p>
                <span>HASHI</span>BIRA
              </p>
            </div>
          </NavLink>
        </h1>

        <div className={style.navRight}>
          <div className={style.searchContent}>
            <input
              type="text"
              placeholder="Search something"
              value={search}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className={style.searchBar}
            />
            <div className={style.searchOuter}>
              <IoSearch className={style.searchLogo} />
            </div>
          </div>
          <ul className={style.navLinks}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Products"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : undefined
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : undefined
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/CartPage"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : undefined
                }
              >
                <div className={style.cartButton}>
                  Cart Items
                  {cartProducts.length > 0 ? (
                    <div className={style.cartCount}>
                      <span>{cartProducts.length}</span>
                    </div>
                  ) : (
                    <IoCartSharp className={style.cartIcon} />
                  )}
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

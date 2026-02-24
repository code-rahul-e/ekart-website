import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { CgMail } from "react-icons/cg";

import style from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div>
        <footer>
            <div className={style.footerTop}>
                <ul>
                    <li className={style.Heading}>ABOUT</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>Careears</li>
                    <li>Stories</li>
                    <li>Information</li>
                </ul>
                <ul>
                    <li className={style.Heading}>HELP</li>
                    <li>Payments</li>
                    <li>Shipping</li>
                    <li>cancellation & Returns</li>
                    <li>FAQ</li>
                </ul>
                <ul>
                    <li className={style.Heading}>CONSUMER POLICY</li>
                    <li>Terme of Use</li>
                    <li>Security</li>
                    <li>Privacy</li>
                    <li>Sitemap</li>
                    <li>EPR Compliance</li>
                </ul>
                <ul>
                    <li className={style.Heading}>GROUP COMPANIES</li>
                    <li>Flipkart</li>
                    <li>Amazon</li>
                    <li>Myntra</li>
                    <li>shopsy</li>
                </ul>
                <ul>
                    <li className={style.Heading}>ADDRESS</li>
                    <p>XYZ india Private Limited,<br /> XYZ Apartment, XYZ Nagar, <br />Chennai PIN-7988878</p>
                </ul>
            </div>
            <div className={style.footerBottom}>
                <div className={style.copyright}>
                    <p>©2024-2025 Copyright.com</p>
                </div>
                <div className={style.socialLinks}>
                    <CiFacebook className={style.sIcon}/>
                    <AiOutlineYoutube className={style.sIcon}/>
                    <CgMail className={style.sIcon}/>
                    <FaXTwitter className={style.sIconT}/>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer